"""Extract and localize the supplied MCP PDF into Learn article data files.

This is intentionally specific to the editorial PDF used for Chapter 41.  It
keeps the source wording, removes only repeating print headers/page numbers,
preserves tables and code, and translates prose through Google Translate's
public web endpoint with a local cache so interrupted runs can resume.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import time
import unicodedata
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PDF = (
    ROOT.parent
    / "ARTIGOS"
    / "thebiglearn"
    / "Articles"
    / "What_Is_Model_Context_Protocol_MCP_Complete_Guide.pdf"
)
CACHE_PATH = ROOT / "tmp" / "pdfs" / "mcp-source" / "translations.json"


@dataclass
class Line:
    page: int
    top: float
    bottom: float
    x0: float
    text: str
    size: float
    font: str


def grouped_lines(page: Any, page_number: int) -> list[Line]:
    words = page.extract_words(
        x_tolerance=2,
        y_tolerance=3,
        keep_blank_chars=False,
        extra_attrs=["fontname", "size"],
    )
    groups: list[list[dict[str, Any]]] = []
    for word in sorted(words, key=lambda value: (value["top"], value["x0"])):
        if not groups or abs(groups[-1][0]["top"] - word["top"]) > 1.7:
            groups.append([word])
        else:
            groups[-1].append(word)
    result: list[Line] = []
    for group in groups:
        group.sort(key=lambda value: value["x0"])
        text = " ".join(value["text"] for value in group).strip()
        if not text:
            continue
        result.append(
            Line(
                page=page_number,
                top=min(float(value["top"]) for value in group),
                bottom=max(float(value["bottom"]) for value in group),
                x0=min(float(value["x0"]) for value in group),
                text=text,
                size=max(float(value["size"]) for value in group),
                font=str(group[0].get("fontname", "")),
            )
        )
    return result


def inspect_pdf(pdf_path: Path, page_number: int) -> None:
    with pdfplumber.open(pdf_path) as document:
        page = document.pages[page_number - 1]
        for line in grouped_lines(page, page_number):
            print(
                f"{line.top:6.1f} size={line.size:4.1f} "
                f"x={line.x0:5.1f} font={line.font:24.24s} :: {line.text}"
            )
        print("\nTABLES")
        for index, table in enumerate(page.find_tables()):
            print(index, table.bbox)
            print(json.dumps(table.extract(), ensure_ascii=False, indent=2))


def clean_cell(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value.replace("\n", " ")).strip()


def is_repeating_print_line(line: Line, page_height: float) -> bool:
    if line.top < 55 and line.text == "THE BIG LEARN | MODEL CONTEXT PROTOCOL":
        return True
    if line.top > page_height - 45 and re.fullmatch(r"\d+", line.text):
        return True
    return False


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    ascii_value = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value).strip("-").lower()
    return ascii_value[:120]


def extract_blocks(pdf_path: Path) -> list[dict[str, Any]]:
    """Extract semantic blocks while preserving every editorial text fragment."""

    blocks: list[dict[str, Any]] = []
    paragraph_parts: list[str] = []
    list_items: list[str] = []
    list_ordered = False
    current_page = 0
    previous_bottom = 0.0
    code_base_x = 64.9

    def flush_paragraph() -> None:
        nonlocal paragraph_parts
        if paragraph_parts:
            blocks.append(
                {"kind": "paragraph", "text": re.sub(r"\s+", " ", " ".join(paragraph_parts)).strip()}
            )
            paragraph_parts = []

    def flush_list() -> None:
        nonlocal list_items
        if list_items:
            blocks.append({"kind": "list", "ordered": list_ordered, "items": list_items})
            list_items = []

    with pdfplumber.open(pdf_path) as document:
        # Page 1 is the visual cover. The complete textual content begins on page 2.
        for page_index, page in enumerate(document.pages[1:], start=2):
            lines = [
                line
                for line in grouped_lines(page, page_index)
                if not is_repeating_print_line(line, float(page.height))
            ]
            tables = page.find_tables()
            table_entries = [
                {
                    "top": float(table.bbox[1]),
                    "bottom": float(table.bbox[3]),
                    "rows": [[clean_cell(cell) for cell in row] for row in table.extract()],
                }
                for table in tables
            ]
            table_entries = [
                entry
                for entry in table_entries
                if entry["rows"]
                and any(any(cell for cell in row) for row in entry["rows"])
                and max(len(row) for row in entry["rows"]) > 1
            ]

            stream: list[tuple[float, str, Any]] = []
            for line in lines:
                in_table = any(
                    entry["top"] - 1 <= line.top <= entry["bottom"] + 1
                    for entry in table_entries
                )
                if not in_table:
                    stream.append((line.top, "line", line))
            for entry in table_entries:
                stream.append((entry["top"], "table", entry))
            stream.sort(key=lambda item: item[0])

            for _, entry_type, value in stream:
                if entry_type == "table":
                    flush_paragraph()
                    flush_list()
                    rows = value["rows"]
                    headers = rows[0]
                    data_rows = rows[1:]
                    # Some tables repeat their header after a page break.
                    data_rows = [row for row in data_rows if row != headers]
                    blocks.append(
                        {
                            "kind": "table",
                            "caption": "",
                            "headers": headers,
                            "rows": data_rows,
                        }
                    )
                    previous_bottom = float(value["bottom"])
                    current_page = page_index
                    continue

                line: Line = value
                text = line.text.strip()
                gap = line.top - previous_bottom if current_page == page_index else 99.0
                current_page = page_index

                # Main section headings use a larger bold face. A heading can wrap
                # onto the next line; defer the wrapped fragment to the next pass.
                if line.size >= 18:
                    flush_paragraph()
                    flush_list()
                    if (
                        blocks
                        and blocks[-1]["kind"] == "heading"
                        and not re.match(r"^\d+\.", text)
                        and gap < 12
                    ):
                        blocks[-1]["text"] += " " + text
                        blocks[-1]["id"] = slugify(blocks[-1]["text"])
                    else:
                        blocks.append(
                            {
                                "kind": "heading",
                                "level": 2,
                                "text": text,
                                "id": slugify(text),
                            }
                        )
                    previous_bottom = line.bottom
                    continue

                # Bullets and numbered lifecycle steps.
                bullet_match = re.match(r"^[•]\s*(.+)$", text)
                number_match = re.match(r"^(\d+)\.\s+(.+)$", text)
                if bullet_match or (number_match and line.x0 >= 55):
                    flush_paragraph()
                    ordered = bool(number_match)
                    item_text = (number_match.group(2) if number_match else bullet_match.group(1)).strip()
                    if list_items and ordered != list_ordered:
                        flush_list()
                    list_ordered = ordered
                    list_items.append(item_text)
                    previous_bottom = line.bottom
                    continue

                # Continuation lines within a list are indented relative to body.
                if list_items and (line.x0 >= 70 or gap < 4):
                    list_items[-1] += " " + text
                    previous_bottom = line.bottom
                    continue
                flush_list()

                # Python and JSON examples use a monospaced font. Preserve their
                # horizontal indentation and visible blank lines.
                if "Mono" in line.font or "Courier" in line.font:
                    flush_paragraph()
                    indent = " " * max(0, round((line.x0 - code_base_x) / 4.2))
                    code_line = indent + text
                    if blocks and blocks[-1]["kind"] == "code":
                        if gap >= 7:
                            blocks[-1]["text"] += "\n"
                        blocks[-1]["text"] += "\n" + code_line
                    else:
                        blocks.append({"kind": "code", "text": code_line})
                    previous_bottom = line.bottom
                    continue

                # Bold small headings, callout labels, and subsection labels.
                is_bold = "Bold" in line.font or "Semibold" in line.font
                if (
                    (is_bold and line.size >= 9.5 and gap >= 6)
                    or (text.isupper() and len(text) < 90)
                ):
                    flush_paragraph()
                    blocks.append({"kind": "subhead", "text": text})
                    previous_bottom = line.bottom
                    continue

                # A visible vertical gap denotes a new paragraph.
                if paragraph_parts and gap >= 6:
                    flush_paragraph()
                paragraph_parts.append(text)
                previous_bottom = line.bottom

        flush_paragraph()
        flush_list()

    # Captions positioned immediately before a table should remain captions,
    # without also being rendered as a duplicate standalone subhead.
    normalized: list[dict[str, Any]] = []
    in_glossary = False
    for block in blocks:
        if block["kind"] == "heading":
            if block["text"] == "Glossary":
                in_glossary = True
            elif block["text"] != "References":
                in_glossary = False
        if (
            block["kind"] == "table"
            and normalized
            and normalized[-1]["kind"] == "subhead"
        ):
            block["caption"] = normalized.pop()["text"]
        # Join tables broken only by a physical page boundary.
        if (
            block["kind"] == "table"
            and normalized
            and normalized[-1]["kind"] == "table"
            and normalized[-1]["headers"] == block["headers"]
        ):
            target = normalized[-1]
            for row in block["rows"]:
                if row and not row[0] and target["rows"]:
                    previous = target["rows"][-1]
                    for column, cell in enumerate(row):
                        if cell:
                            previous[column] = (previous[column] + " " + cell).strip()
                else:
                    target["rows"].append(row)
            continue
        # Join wrapped glossary definitions and reference entries that the PDF
        # moved onto a second physical line.
        if (
            block["kind"] == "paragraph"
            and normalized
            and normalized[-1]["kind"] == "subhead"
            and (
                normalized[-1]["text"].startswith("[")
                or (in_glossary and ":" in normalized[-1]["text"])
            )
            and not re.search(r"[.!?)]$", normalized[-1]["text"])
        ):
            normalized[-1]["text"] += " " + block["text"]
            continue
        normalized.append(block)

    return normalized


class Translator:
    def __init__(self, cache_path: Path) -> None:
        self.cache_path = cache_path
        self.cache_path.parent.mkdir(parents=True, exist_ok=True)
        if cache_path.exists():
            self.cache: dict[str, str] = json.loads(cache_path.read_text(encoding="utf-8"))
        else:
            self.cache = {}

    def save(self) -> None:
        self.cache_path.write_text(
            json.dumps(self.cache, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    def translate(self, text: str, language: str) -> str:
        if language == "en" or not text.strip():
            return text
        key = f"{language}\0{text}"
        if key in self.cache:
            return postprocess_translation(self.cache[key], language)

        params = urllib.parse.urlencode(
            {
                "client": "gtx",
                "sl": "en",
                "tl": language,
                "dt": "t",
                "q": text,
            }
        )
        request = urllib.request.Request(
            "https://translate.googleapis.com/translate_a/single?" + params,
            headers={"User-Agent": "Mozilla/5.0"},
        )
        for attempt in range(6):
            try:
                with urllib.request.urlopen(request, timeout=30) as response:
                    payload = json.loads(response.read().decode("utf-8"))
                translated = "".join(part[0] for part in payload[0] if part and part[0])
                translated = html.unescape(translated)
                self.cache[key] = translated
                if len(self.cache) % 25 == 0:
                    self.save()
                time.sleep(0.04)
                return postprocess_translation(translated, language)
            except Exception:
                if attempt == 5:
                    raise
                time.sleep(1.5 * (attempt + 1))
        raise RuntimeError("unreachable")


def postprocess_translation(text: str, language: str) -> str:
    """Keep protocol names and a few security terms technically accurate."""

    if language == "pt":
        replacements = {
            "Protocolo de Contexto do Modelo": "Model Context Protocol",
            "protocolo de contexto do modelo": "Model Context Protocol",
            "Protocolo de contexto de modelo": "Model Context Protocol",
            "protocolo de contexto de modelo": "Model Context Protocol",
            "Antrópico": "Anthropic",
            "antrópico": "Anthropic",
            "injeção imediata": "injeção de prompt",
            "fluxos de trabalho imediatos": "fluxos de trabalho de prompt",
            "A GRANDE APRENDIZAGEM": "THE BIG LEARN",
        }
    elif language == "es":
        replacements = {
            "Protocolo de Contexto del Modelo": "Model Context Protocol",
            "Protocolo de contexto del modelo": "Model Context Protocol",
            "protocolo de contexto del modelo": "Model Context Protocol",
            "Protocolo de contexto de modelo": "Model Context Protocol",
            "protocolo de contexto de modelo": "Model Context Protocol",
            "Antrópico": "Anthropic",
            "antrópico": "Anthropic",
            "inyección inmediata": "inyección de prompts",
            "flujos de trabajo rápidos": "flujos de trabajo de prompts",
            "EL GRAN APRENDIZAJE": "THE BIG LEARN",
        }
    else:
        replacements = {}
    for source, target in replacements.items():
        text = text.replace(source, target)
    text = re.sub(r"\bPCM\b", "MCP", text)
    return text


def localize_blocks(
    blocks: list[dict[str, Any]], language: str, translator: Translator
) -> list[dict[str, Any]]:
    localized: list[dict[str, Any]] = []
    for block in blocks:
        result = json.loads(json.dumps(block, ensure_ascii=False))
        if result["kind"] in {"paragraph", "subhead", "heading"}:
            result["text"] = translator.translate(result["text"], language)
            if result["kind"] == "heading":
                result["id"] = slugify(result["text"])
        elif result["kind"] == "list":
            result["items"] = [
                translator.translate(item, language) for item in result["items"]
            ]
        elif result["kind"] == "table":
            result["headers"] = [
                translator.translate(cell, language) for cell in result["headers"]
            ]
            result["rows"] = [
                [translator.translate(cell, language) for cell in row]
                for row in result["rows"]
            ]
            if result.get("caption"):
                result["caption"] = translator.translate(result["caption"], language)
        # Code stays byte-for-byte equivalent to the source example.
        localized.append(result)
    translator.save()
    return localized


def ts_literal(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def write_data_file(directory: Path, constant: str, blocks: list[dict[str, Any]]) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    target = directory / "mcp-content.data.ts"
    target.write_text(
        "import { ChapterBlock } from '../fundamentos-internet-redes-apis/"
        "fundamentos-content.data';\n\n"
        "// Conteúdo integral do PDF fornecido; foram removidos apenas cabeçalhos, "
        "rodapés e quebras físicas de página.\n"
        f"export const {constant}: ChapterBlock[] = {ts_literal(blocks)};\n",
        encoding="utf-8",
    )


def generate(pdf_path: Path) -> None:
    blocks = extract_blocks(pdf_path)
    translator = Translator(CACHE_PATH)
    destinations = {
        "en": (
            ROOT / "src" / "app" / "learn" / "model-context-protocol-mcp-en",
            "MCP_EN_BLOCKS",
        ),
        "pt": (
            ROOT / "src" / "app" / "learn" / "protocolo-contexto-modelo-mcp-pt",
            "MCP_PT_BLOCKS",
        ),
        "es": (
            ROOT / "src" / "app" / "learn" / "protocolo-contexto-modelo-mcp-es",
            "MCP_ES_BLOCKS",
        ),
    }
    for language, (directory, constant) in destinations.items():
        print(f"Localizing {language}...")
        localized = localize_blocks(blocks, language, translator)
        write_data_file(directory, constant, localized)
    print(f"Extracted {len(blocks)} blocks.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["inspect", "generate"])
    parser.add_argument("--pdf", type=Path, default=DEFAULT_PDF)
    parser.add_argument("--page", type=int, default=2)
    args = parser.parse_args()
    if args.mode == "inspect":
        inspect_pdf(args.pdf, args.page)
    else:
        generate(args.pdf)


if __name__ == "__main__":
    main()
