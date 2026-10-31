import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';
import {metadata} from '../src/content/site';
const base=process.env.BASE_PATH||'/';const files:string[]=[];
function walk(dir:string){for(const name of readdirSync(dir)){const f=join(dir,name);if(statSync(f).isDirectory())walk(f);else files.push(f)}}walk('dist');
const htmlFiles=files.filter(f=>f.endsWith('.html'));assert.equal(htmlFiles.length,11,'All seven main pages, three auxiliary pages, and 404 are generated');
const titles=new Set<string>();let checked=0;
for(const f of htmlFiles){const s=readFileSync(f,'utf8');assert.equal((s.match(/<h1[\s>]/g)||[]).length,1,`${f}: exactly one H1`);assert(s.includes('<main'),'SSR main exists');assert(s.includes('lang="tr"'),'Turkish document language');const title=s.match(/<title>(.*?)<\/title>/)?.[1];assert(title&&!titles.has(title),'Unique title: '+f);titles.add(title);
assert(s.includes('name="description"'),'description');assert(s.includes('og:image'),'Open Graph');assert(!s.includes('<!--app-->'),'Prerender complete');
for(const match of s.matchAll(/(?:href|src)="([^"]+)"/g)){const link=match[1].replaceAll('&amp;','&');if(!link||link.startsWith('#')||/^(https?:|mailto:|data:)/.test(link))continue;assert(link.startsWith(base),`${f}: base-safe URL ${link}`);const relative=link.slice(base.length).split('#')[0].split('?')[0];const resolved=join('dist',relative.endsWith('/')?relative+'index.html':relative||'index.html');assert(existsSync(resolved),`${f}: broken local link ${link}`);checked++;}
assert(!/href="[^\"]*\/(dashboard|app|login|demo|register)(\/|")/.test(s),'No application routes');assert(!/<(input|textarea|form)\b/.test(s),'No fake form/chat interface');assert(!/example\.com|agromax\.app/.test(s),'No fabricated external address');
}
const media=files.filter(f=>/\.(webp|glb|jpg)$/.test(f));for(const f of media){const bytes=statSync(f).size;assert(bytes<1_500_000,`Asset budget exceeded: ${f}`)}
assert(Object.keys(metadata).length===11);
console.log(`PASS: ${htmlFiles.length} statically rendered pages, ${checked} local references, unique metadata, valid media budget and locked product-site scope.`);
