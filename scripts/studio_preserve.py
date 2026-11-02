"""Verify this release adds to the last approved site without removing old content."""
from pathlib import Path
import subprocess,json
P=Path(__file__).resolve().parents[1];baseline='a5f90f2'
def git(*args):return subprocess.check_output(['git',*args],cwd=P,text=True).strip()
files=git('ls-tree','-r','--name-only',baseline,'public/media','src').splitlines();changed=[];media=0;same=0
for f in files:
 old=git('rev-parse',baseline+':'+f);new=git('hash-object',f)
 if f.startswith('public/media/'):
  assert old==new,f+' media changed';media+=1
 elif old!=new:
  changed.append(f);patch=git('diff','--unified=0',baseline,'--',f)
  assert not any(l.startswith('-') and not l.startswith('---') for l in patch.splitlines()),f+' existing source removed'
 else:same+=1
expected={'src/main.tsx','src/pages/Home.tsx','src/pages/Filiz.tsx','src/pages/Technology.tsx','src/pages/Editorial.tsx'};assert set(changed)==expected
r={'baseline':baseline,'mediaByteIdentical':media,'trackedSourceUnchanged':same,'sourceChangedOnlyByInsertion':changed}
(P/'docs/studio/preservation.json').write_text(json.dumps(r,indent=2));print('PASS',r)
