"""Encode actual Cycles frames. Keep original renders / editable packed .blend sources.
Interpolation smooths the short cyclic camera path; this does not generate new geometry.
"""
from pathlib import Path
from PIL import Image,ImageFilter
import subprocess,json,hashlib
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/revision1';O=P/'public/media/revision1';records=[]
def valid(p):
 try:
  r=subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(p)],stderr=subprocess.DEVNULL);return abs(float(r)-6)<.06
 except (subprocess.CalledProcessError,ValueError):return False
for scene in ['leaf','parcel']:
 for portrait in [False,True]:
  stem=scene+('-portrait' if portrait else '-wide');folder=S/(stem+'-clean');(folder/'0025.png').unlink(missing_ok=True);(folder/'0026.png').unlink(missing_ok=True);frames=sorted(folder.glob('*.png'));assert len(frames)==24,(stem,len(frames))
  name=scene+('-mobile' if portrait else '');poster=scene+'-poster'+('-mobile' if portrait else '')
  im=Image.open(frames[0]).convert('RGB');im.save(O/(poster+'.webp'),quality=91,method=6)
  # Repeat frame 1 at t=6s, then trim to 6s so last->first also interpolates smoothly.
  import shutil
  shutil.copyfile(frames[0],folder/'0025.png');shutil.copyfile(frames[1],folder/'0026.png')
  common=['ffmpeg','-y','-loglevel','error','-threads','2','-framerate','4','-i',str(folder/'%04d.png'),'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2,hqdn3d=1.4:1.4:3:3,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:vsbmc=1','-t','6','-an','-pix_fmt','yuv420p']
  if not valid(O/(name+'.mp4')):subprocess.run(common+['-c:v','libx264','-preset','slow','-crf','19','-movflags','+faststart',str(O/(name+'.mp4'))],check=True)
  if not valid(O/(name+'.webm')):subprocess.run(common+['-c:v','libvpx-vp9','-b:v','0','-crf','28','-row-mt','1',str(O/(name+'.webm'))],check=True)
  (folder/'0025.png').unlink();(folder/'0026.png').unlink()
for f in sorted(O.iterdir()):records.append({'file':str(f.relative_to(P)),'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
(P/'docs/revision1/media-manifest.json').write_text(json.dumps(records,indent=2));print('Encoded',len(records),'assets')
