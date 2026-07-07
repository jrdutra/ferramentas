import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const aliasDir = join(projectRoot, 'dist', 'ferramentas', 'server');
const aliasFile = join(aliasDir, 'server.mjs');

await mkdir(aliasDir, { recursive: true });
await writeFile(aliasFile, "import '../../server/server.mjs';\n", 'utf8');

console.log('Created Azure startup compatibility alias at dist/ferramentas/server/server.mjs');
