from pathlib import Path
import json,hashlib,subprocess
P=Path(__file__).resolve().parents[1]
records=json.loads((P/'docs/revision1/protected.json').read_text())
for f,h in records.items():assert hashlib.sha256((P/f).read_bytes()).hexdigest()==h,f+' changed'
# Original media is retained, byte-for-byte, including media not currently selected.
files=subprocess.check_output(['git','ls-tree','-r','--name-only','105b3df','public/media'],cwd=P,text=True).splitlines()
for f in files:
 old=subprocess.check_output(['git','rev-parse','105b3df:'+f],cwd=P,text=True).strip()
 new=subprocess.check_output(['git','hash-object',f],cwd=P,text=True).strip();assert old==new,f+' changed'
print('PASS:',len(records),'protected source/scene files and',len(files),'original media unchanged')
