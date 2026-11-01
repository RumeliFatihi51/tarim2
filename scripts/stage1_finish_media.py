from pathlib import Path
import subprocess,shutil,sys
from PIL import Image
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1';O=P/'public/media/stage1'
for name in (sys.argv[1:] or ['home-dawn','parcel-context','spectrum-optics']):
 for mobile in [False,True]:
  folder=S/(name+('-portrait' if mobile else '-wide')+'-frames')
  for i,j in [(1,33),(2,34)]:shutil.copyfile(folder/f'frame_{i:04d}.png',folder/f'frame_{j:04d}.png')
  im=Image.open(folder/'frame_0001.png');im.save(O/(name+('-poster-mobile' if mobile else '-poster')+'.webp'),quality=82 if mobile and name=='home-dawn' else 90,method=6)
  for ext,codec in [('mp4',['-c:v','libx264','-preset','slow','-crf','21','-movflags','+faststart']),('webm',['-c:v','libvpx-vp9','-b:v','0','-crf','30','-row-mt','1'])]:
   subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','12','-i',str(folder/'frame_%04d.png'),'-vf','minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc','-frames:v','64',*codec,'-threads','2','-pix_fmt','yuv420p',str(O/(name+('-mobile' if mobile else '')+'.'+ext))],check=True)
  print('Finished',name,mobile,flush=True)
