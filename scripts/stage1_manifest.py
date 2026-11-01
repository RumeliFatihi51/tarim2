from pathlib import Path
import json,subprocess,hashlib
from PIL import Image
P=Path(__file__).resolve().parents[1];O=P/'public/media/stage1';records=[]
for f in sorted(O.iterdir()):
 if not f.is_file():continue
 r={'file':str(f.relative_to(P)),'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()}
 if f.suffix=='.webp':
  with Image.open(f) as im:r['width'],r['height']=im.size
 elif f.suffix in ['.mp4','.webm']:
  r['probe']=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=codec_name,width,height,avg_frame_rate:format=duration,size','-of','json',str(f)]))
 records.append(r)
(P/'qa/stage1/media-manifest.json').write_text(json.dumps(records,indent=2));print(len(records),'actual files;',sum(r['bytes'] for r in records),'bytes')
