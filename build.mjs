// Minifies src/*.js and src/*.css into the project root (the files the HTML pages load)
// and stamps each asset URL in the HTML with a content hash so browsers never serve stale copies.
import { build } from 'esbuild';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const sources = readdirSync('src').filter(name => /\.(js|css)$/.test(name));
await build({
  entryPoints: sources.map(name => `src/${name}`),
  outdir: '.',
  minify: true,
  legalComments: 'none',
  allowOverwrite: true,
  logLevel: 'warning'
});

const hashes = Object.fromEntries(sources.map(name => [
  name,
  createHash('sha1').update(readFileSync(`src/${name}`)).digest('hex').slice(0, 8)
]));

for (const page of readdirSync('.').filter(name => name.endsWith('.html'))) {
  let html = readFileSync(page, 'utf8');
  for (const [name, hash] of Object.entries(hashes)) {
    const escaped = name.replace(/\./g, '\\.');
    html = html.replace(new RegExp(`(${escaped})(\\?v=[A-Za-z0-9]+)?(["'])`, 'g'), `$1?v=${hash}$3`);
  }
  writeFileSync(page, html);
}
console.log(`Built ${sources.length} files from src/`);
