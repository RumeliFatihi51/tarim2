from pathlib import Path
import sys,subprocess,time
from PIL import Image,ImageOps
sys.path.insert(0,str(Path(__file__).resolve().parent))
import finish_v3
import os
finish_v3.oidn=os.environ.get('OIDN_BIN','oidnDenoise')
p=Path(__file__).resolve().parents[1];clean=p/'src/assets/production/journey2-clean';clean.mkdir(exist_ok=True)
for i in range(1,73):
 src=p/f'src/assets/production/journey2-frames/frame_{i:04d}.png';dst=clean/f'frame_{i:04d}.png'
 while not dst.exists():
  try:finish_v3.denoise(src,dst)
  except (OSError,ValueError,FileNotFoundError):time.sleep(2)
 print('Clean',i,flush=True)
import shutil
for j in [73,74]:shutil.copyfile(clean/'frame_0072.png',clean/f'frame_{j:04d}.png')
for mobile in [False,True]:
 vf='minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:vsbmc=1' + (',crop=ih*0.75:ih,scale=540:720' if mobile else '')
 for ext,opts in [('mp4',['-c:v','libx264','-crf','21','-preset','fast','-movflags','+faststart']),('webm',['-c:v','libvpx-vp9','-b:v','0','-crf','31','-row-mt','1'])]:
  subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','6','-i',str(clean/'frame_%04d.png'),'-vf',vf,'-frames:v','288','-g','12',*opts,'-threads','2','-pix_fmt','yuv420p',str(p/'public/media'/('journey'+('-mobile' if mobile else '')+'.'+ext))],check=True)
for i,label in [(1,'origin'),(15,'descent'),(29,'land'),(43,'observation'),(57,'leaf'),(72,'reveal')]:
 im=Image.open(clean/f'frame_{i:04d}.png');im.save(p/f'public/media/journey-{label}.webp',quality=89)
print('FINISHED',flush=True)
