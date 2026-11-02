from pathlib import Path
import subprocess,json
P=Path(__file__).resolve().parents[1];baseline='263a23d'
def git(*args):return subprocess.check_output(['git',*args],cwd=P,text=True).strip()
files=git('ls-tree','-r','--name-only',baseline,'public/media','src').splitlines();changed=[];media=0;same=0
for f in files:
 old=git('rev-parse',baseline+':'+f);new=git('hash-object',f)
 if f.startswith('public/media/'):
  assert old==new,f+' original media changed';media+=1
 elif old!=new:changed.append(f)
 else:same+=1
assert set(changed)=={'src/main.tsx','src/studio/SignatureFilm.tsx','src/studio/SpatialStory.tsx'}
r={'baseline':baseline,'originalMediaByteIdentical':media,'trackedSourceUnchanged':same,'authorizedChanges':changed}
(P/'docs/quality/preservation.json').write_text(json.dumps(r,indent=2));print('PASS',r)
