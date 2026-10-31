// One-time content extraction, retained as provenance. Content is edited in src/content/interface.ts.
import ts from 'typescript';
import {readFileSync,writeFileSync} from 'node:fs';
const files=['src/components/ui.tsx','src/layout/Layout.tsx','src/sections/Cinematics.tsx','src/pages/Home.tsx','src/pages/Platform.tsx','src/pages/Technology.tsx','src/pages/Filiz.tsx','src/pages/Editorial.tsx'];
const strings={};
for(const file of files){let s=readFileSync(file,'utf8');const ast=ts.createSourceFile(file,s,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const edits=[];let i=0;const prefix=file.split('/').at(-1).split('.')[0].toLowerCase();
function key(text){const id=prefix+'_'+String(++i).padStart(3,'0');strings[id]=text;return id;}
function walk(n){if(ts.isJsxText(n)&&n.text.trim()){const t=n.text.replace(/\s+/g,' ').trim();edits.push({start:n.getStart(ast),end:n.end,text:`{uiTexts.${key(t)}}`});}else if(ts.isJsxAttribute(n)&&['alt','aria-label'].includes(n.name.getText(ast))&&n.initializer&&ts.isStringLiteral(n.initializer)&&n.initializer.text){edits.push({start:n.initializer.getStart(ast),end:n.initializer.end,text:`{uiTexts.${key(n.initializer.text)}}`});}ts.forEachChild(n,walk)}walk(ast);
if(edits.length){for(const e of edits.sort((a,b)=>b.start-a.start))s=s.slice(0,e.start)+e.text+s.slice(e.end);s=`import {uiTexts} from '../content/interface';\n`+s;writeFileSync(file,s)}}
writeFileSync('src/content/interface.ts',`/** Editable Turkish interface and editorial copy. Keys are stable per component. */\nexport const uiTexts = ${JSON.stringify(strings,null,2)} as const;\n`);
console.log('Extracted',Object.keys(strings).length,'interface strings');
