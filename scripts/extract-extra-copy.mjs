import ts from 'typescript';import {readFileSync,writeFileSync} from 'node:fs';
const files=['src/components/ui.tsx','src/layout/Layout.tsx','src/sections/Cinematics.tsx','src/pages/Home.tsx','src/pages/Platform.tsx','src/pages/Technology.tsx','src/pages/Filiz.tsx','src/pages/Editorial.tsx'];
const lists={},attrs={};
const serial=n=>ts.isStringLiteral(n)?n.text:ts.isArrayLiteralExpression(n)?n.elements.map(serial):undefined;
const allstatic=n=>ts.isStringLiteral(n)||(ts.isArrayLiteralExpression(n)&&n.elements.length&&n.elements.every(allstatic));
for(const file of files){let s=readFileSync(file,'utf8');const ast=ts.createSourceFile(file,s,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const edits=[];let i=0;const prefix=file.split('/').at(-1).split('.')[0].toLowerCase();
function walk(n){if(ts.isArrayLiteralExpression(n)&&allstatic(n)){const k=prefix+'_'+String(++i).padStart(3,'0');lists[k]=serial(n);edits.push({start:n.getStart(ast),end:n.end,text:`uiLists.${k}`});return;}
if(ts.isJsxAttribute(n)&&['label','cta','eyebrow','body','title'].includes(n.name.getText(ast))&&n.initializer&&ts.isStringLiteral(n.initializer)){const k=prefix+'_'+String(++i).padStart(3,'0');attrs[k]=n.initializer.text;edits.push({start:n.initializer.getStart(ast),end:n.initializer.end,text:`{uiLabels.${k}}`})}ts.forEachChild(n,walk)}walk(ast);
if(edits.length){for(const e of edits.sort((a,b)=>b.start-a.start))s=s.slice(0,e.start)+e.text+s.slice(e.end);s=`import {uiLists,uiLabels} from '../content/section-copy';\n`+s;writeFileSync(file,s)}}
writeFileSync('src/content/section-copy.ts',`/** Editable section labels and parallel content lists. */\nexport const uiLists=${JSON.stringify(lists,null,2)} as const;\nexport const uiLabels=${JSON.stringify(attrs,null,2)} as const;\n`);
