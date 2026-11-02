"""Adapt a CC BY 3.0 real wheat/wind shot, without synthetic camera movement.
Usage python scripts/produce_wind.py /path/to/source.webm
Original: https://commons.wikimedia.org/wiki/File:ASMR_field_of_wheat_-_nature.webm
"""
from pathlib import Path
import subprocess,sys,json,hashlib
P=Path(__file__).resolve().parents[1]; source=Path(sys.argv[1]);out=P/'public/media/observation';out.mkdir(exist_ok=True)
for mobile in [False,True]:
 stem=out/('wind-mobile' if mobile else 'wind')
 vf=('crop=ih*.72:ih,' if mobile else '')+('scale=576:800' if mobile else 'scale=1280:720')+',fps=24,eq=saturation=.82:contrast=1.02'
 for ext,opts in [('mp4',['-c:v','libx264','-crf','24','-preset','slow','-movflags','+faststart']),('webm',['-c:v','libvpx-vp9','-crf','34','-b:v','0','-cpu-used','3','-row-mt','1'])]:
  subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-ss','2','-i',str(source),'-t','12','-an','-vf',vf,*opts,'-threads','2','-pix_fmt','yuv420p',str(stem)+'.'+ext],check=True)
 poster=out/('wind-poster-mobile.webp' if mobile else 'wind-poster.webp')
 subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-ss','1','-i',str(stem)+'.mp4','-frames:v','1','-quality','92',str(poster)],check=True)
 print('ENCODED',stem,flush=True)
(P/'src/assets/production/field-observation/wind-source.json').write_text(json.dumps({'url':'https://upload.wikimedia.org/wikipedia/commons/a/af/ASMR_field_of_wheat_-_nature.webm','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'author':'Coup 53','license':'CC BY 3.0','sourceStart':2,'duration':12,'changes':'silent crop, resize, frame rate and restrained colour correction'},indent=2))
