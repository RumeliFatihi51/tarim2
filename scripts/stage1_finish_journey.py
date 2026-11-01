"""Denoise real independent camera renders, encode compatible 12s films and retain phase boards.
72 Cycles source frames per composition at 6fps, interpolated to 288 delivery frames/24fps.
"""
from pathlib import Path
import os,sys,time,subprocess,shutil,json
from PIL import Image,ImageDraw
sys.path.insert(0,str(Path(__file__).resolve().parent))
import finish_v3
finish_v3.oidn=os.environ.get('OIDN_BIN','oidnDenoise')
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1';O=P/'public/media/stage1';Q=P/'qa/stage1/journey-renders';Q.mkdir(parents=True,exist_ok=True)
points=[[0,.05,.1],[.1,.2,.3],[.3,.4,.5],[.5,.6,.7],[.7,.8,.9],[.9,.95,1]];names=['origin','descent','land','observation','leaf','final-render']
for mobile in ([False] if "--wide-only" in sys.argv else [True] if "--portrait-only" in sys.argv else [False,True]):
 variant='portrait' if mobile else 'wide';folder=S/f'journey-{variant}-frames';clean=S/f'journey-{variant}-clean';clean.mkdir(exist_ok=True)
 for i in range(1,73):
  src=folder/f'frame_{i:04d}.png';dst=clean/src.name;start=time.monotonic()
  while not dst.exists():
   try:finish_v3.denoise(src,dst)
   except (OSError,ValueError,SyntaxError):
    if time.monotonic()-start>600:raise RuntimeError(f'Render unavailable after ten minutes: {src}')
    time.sleep(2)
  print('Clean stage1',variant,i,flush=True)
 for i in [73,74]:shutil.copyfile(clean/'frame_0072.png',clean/f'frame_{i:04d}.png')
 for ext,opts in [('mp4',['-c:v','libx264','-crf','21','-preset','slow','-movflags','+faststart']),('webm',['-c:v','libvpx-vp9','-b:v','0','-crf','30','-row-mt','1'])]:
  subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','6','-i',str(clean/'frame_%04d.png'),'-vf','hqdn3d=0.7:0.7:1:1,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:vsbmc=1','-frames:v','288','-g','12',*opts,'-threads','2','-pix_fmt','yuv420p',str(O/('journey'+('-mobile' if mobile else '')+'.'+ext))],check=True)
 for i,label in zip([1,15,29,44,58,72],names):Image.open(clean/f'frame_{i:04d}.png').save(O/('journey-'+label+('-mobile' if mobile else '')+'.webp'),quality=91,method=6)
 # Independent real render frames: 6 phases x start/mid/end. Phase boundaries overlap deliberately.
 records=[];tilew,tileh=(400,250) if not mobile else (225,300);board=Image.new('RGB',(tilew*3,(tileh+24)*6),'#eee');draw=ImageDraw.Draw(board)
 for phase,values in enumerate(points):
  for j,p in enumerate(values):
   index=1+round(p*71);im=Image.open(clean/f'frame_{index:04d}.png').convert('RGB');filename=f'{variant}-phase-{phase+1}-{["start","mid","end"][j]}.webp';im.save(Q/filename,quality=90,method=6);im.thumbnail((tilew,tileh));x=j*tilew;y=phase*(tileh+24);board.paste(im,(x,y+24));draw.text((x+6,y+5),f'{phase+1} / {["start","mid","end"][j]} / frame {index}',fill='#222');records.append({'phase':phase+1,'position':['start','mid','end'][j],'sourceFrame':index,'file':filename})
 board.save(Q/f'{variant}-18-frames.jpg',quality=91);(Q/f'{variant}-frames.json').write_text(json.dumps(records,indent=2));print('Encoded stage1',variant,flush=True)
