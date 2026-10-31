"""Verify real media bytes, codecs, durations and delivered Blender sources."""
from pathlib import Path
import json,subprocess,hashlib
from PIL import Image
root=Path(__file__).resolve().parents[1];result={'films':[],'blender':[],'sources':[]}
for name in ['orbit','field']:
 for mobile in [False,True]:
  for ext in ['mp4','webm']:
   f=root/'public/media'/(name+('-mobile' if mobile else '')+'.'+ext)
   assert f.exists() and f.stat().st_size>1000,f
   p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(f)]))
   v=next(s for s in p['streams'] if s['codec_type']=='video')
   assert v['codec_name']==('h264' if ext=='mp4' else 'vp9')
   assert float(p['format']['duration'])>5
   assert v['avg_frame_rate']=='24/1'
   assert f.stat().st_size<8_000_000
   if mobile:assert (v['width'],v['height'])==(576,720)
   result['films'].append({'file':str(f.relative_to(root)),'bytes':f.stat().st_size,'codec':v['codec_name'],'duration':p['format']['duration'],'width':v['width'],'height':v['height'],'fps':v['avg_frame_rate'],'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
 file=root/f'src/assets/production/{name}-v3.blend'; assert file.read_bytes().startswith(b'BLENDER');result['blender'].append({'file':str(file.relative_to(root)),'bytes':file.stat().st_size,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
for f in (root/'src/assets/production').glob('*-original.png'):
 result['sources'].append({'file':str(f.relative_to(root)),'size':Image.open(f).size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
result['videoBytes']=sum(f['bytes'] for f in result['films'])
(root/'qa/v3/assets.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
