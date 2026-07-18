import { ChapterBlock, ChapterTableBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export function findGlossaryTable(blocks: readonly ChapterBlock[]): ChapterTableBlock | undefined {
  const glossaryIds = new Set(['glossario', 'glossary', 'glosario']);
  const headingIndex = blocks.findIndex((block) =>
    block.kind === 'heading' && glossaryIds.has(block.id?.toLocaleLowerCase() ?? '')
  );

  if (headingIndex < 0) {
    return undefined;
  }

  return blocks.slice(headingIndex + 1).find(
    (block): block is ChapterTableBlock => block.kind === 'table'
  );
}

export function extractGlossary(blocks: readonly ChapterBlock[]): readonly GlossaryEntry[] {
  const table = findGlossaryTable(blocks);

  return (table?.rows ?? [])
    .filter((row) => row.length >= 2 && row[0].trim() && row[1].trim())
    .map(([term, definition]) => ({
      term: term.trim(),
      definition: definition.trim()
    }));
}
