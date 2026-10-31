"""Denoise actual Blender frame sequences with Intel OIDN, encode web/mobile films."""
from pathlib import Path
import time,subprocess,io,os
import numpy as np
from PIL import Image,ImageOps
root=Path.cwd();oidn=os.environ.get('OIDN_BIN','oidnDenoise')
def pfm_write(path,a):
 with open(path,'wb') as f:f.write(f'PF\n{a.shape[1]} {a.shape[0]}\n-1.0\n'.encode());np.flipud(a).astype('<f4').tofile(f)
def pfm_read(path):
 with open(path,'rb') as f:
  kind=f.readline();w,h=map(int,f.readline().split());scale=float(f.readline());a=np.frombuffer(f.read(),dtype='<f4' if scale<0 else '>f4').reshape(h,w,3);return np.flipud(a)
def finish(name,srcname):
 source=root/'src/assets/production'/f'{srcname}-frames';clean=root/'src/assets/production'/f'{srcname}-clean';clean.mkdir(parents=True,exist_ok=True)
 for i in range(1,49):
  src=source/f'frame_{i:04}.png';dst=clean/f'frame_{i:04}.png'
  if dst.exists():continue
  while True:
   try:
    im=Image.open(src).convert('RGB');im.load();break
   except (FileNotFoundError,OSError,SyntaxError,ValueError):time.sleep(3)
  a=np.asarray(im).astype(np.float32)/255;tmp=clean/'input.pfm';out=clean/'output.pfm';pfm_write(tmp,a)
  subprocess.run([oidn,'--ldr',str(tmp),'--srgb','-o',str(out),'--threads','2','-q','h'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  result=Image.fromarray((np.clip(pfm_read(out),0,1)*255+.5).astype('uint8'));result.save(dst)
  if i==1:
   result.save(root/'public/media'/f'{name}-poster.webp',quality=92,method=6);ImageOps.fit(result,(780,900)).save(root/'public/media'/f'{name}-poster-mobile.webp',quality=89,method=6)
  print(name,i,'/48 denoised',flush=True)
 for mobile in [False,True]:
  stem=root/'public/media'/(name+('-mobile' if mobile else ''))
  vf='hqdn3d=1:1:2:2,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:vsbmc=1'
  if mobile:vf+=',crop=ih*0.8:ih,scale=640:800'
  for ext,opts in [('mp4',['-c:v','libx264','-preset','slow','-crf','21','-movflags','+faststart']),('webm',['-c:v','libvpx-vp9','-b:v','0','-crf','31','-row-mt','1'])]:
   target=str(stem)+'.'+ext
   if Path(target).exists() and subprocess.run(['ffprobe','-v','error','-show_entries','format=duration',target],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL).returncode==0:
    continue
   subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-framerate','8','-i',str(clean/'frame_%04d.png'),'-vf',vf,'-an',*opts,'-pix_fmt','yuv420p',str(stem)+'.'+ext],check=True)
 print(name,'encoded desktop/mobile MP4 and WebM',flush=True)
finish('loom','loom');finish('filiz-motion','filiz')
