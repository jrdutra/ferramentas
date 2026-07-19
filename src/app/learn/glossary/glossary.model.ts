import { ChapterBlock, ChapterTableBlock } from '../fundamentos-internet-redes-apis/fundamentos-content.data';
import { TECHNICAL_TERMS_ES, TECHNICAL_TERMS_PT } from './technical-terms.data';

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export type GlossaryLanguage = 'pt' | 'es';

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

/**
 * Glossary used by the Portuguese and Spanish articles.
 *
 * It combines the terms defined in the article's own glossary table with the
 * shared list of acronyms and English technical terms, so every one of those
 * words can display a popover with its meaning. Terms declared by the article
 * always take precedence over the shared definitions.
 */
export function buildGlossary(
  blocks: readonly ChapterBlock[],
  language: GlossaryLanguage
): readonly GlossaryEntry[] {
  const articleGlossary = extractGlossary(blocks);
  const declared = new Set(articleGlossary.map((entry) => entry.term.toLocaleLowerCase()));
  const sharedTerms = language === 'pt' ? TECHNICAL_TERMS_PT : TECHNICAL_TERMS_ES;

  return [
    ...articleGlossary,
    ...sharedTerms.filter((entry) => !declared.has(entry.term.toLocaleLowerCase()))
  ];
}
