"""Evidence for the brief's design contract; not a test of aesthetic taste."""
from pathlib import Path
import subprocess,hashlib,json
P=Path(__file__).resolve().parents[1];revision='579bbe9236640d820eaab9165bbf341f74e1abc2'
files=['src/styles/orbital.css','src/styles/story.css','src/layout/Layout.tsx','src/content/site.ts','src/content/orbital.ts','src/content/section-copy.ts','src/config/site.ts','src/components/ui.tsx','public/favicon.svg','public/fonts/instrument-sans.woff2','public/fonts/InstrumentSans-OFL.txt','src/App.tsx','vercel.json','package.json','package-lock.json']
result={'baseline':revision,'lockedFiles':[],'oldMediaPreserved':[]}
for filename in files:
 old=subprocess.check_output(['git','show',revision+':'+filename],cwd=P);current=(P/filename).read_bytes();assert old==current,filename+' changed despite preservation contract';result['lockedFiles'].append({'file':filename,'sha256':hashlib.sha256(current).hexdigest(),'unchanged':True})
old=subprocess.check_output(['git','show',revision+':src/components/Journey.tsx'],cwd=P).decode();new=(P/'src/components/Journey.tsx').read_text()
def phases(s):return s.split('export const journeyPhases = [',1)[1].split('export function WorldOpening',1)[0]
assert phases(old)==phases(new);result['journeySixPhaseCopyUnchanged']=True
for filename in subprocess.check_output(['git','ls-tree','-r','--name-only',revision,'public/media'],cwd=P).decode().splitlines():
 old=subprocess.check_output(['git','show',revision+':'+filename],cwd=P);assert old==(P/filename).read_bytes(),filename+' was removed/overwritten';result['oldMediaPreserved'].append(filename)
(P/'qa/stage1/preservation.json').write_text(json.dumps(result,indent=2));print('PASS',len(files),'locked files byte-identical;',len(result['oldMediaPreserved']),'old media retained; six phase texts unchanged')
