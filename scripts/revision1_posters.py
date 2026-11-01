"""Higher-resolution Cycles stills for reduced-motion / first-paint posters."""
from pathlib import Path
import subprocess,os
from PIL import Image
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/revision1';env=dict(os.environ,PYTHONPATH='/workspace/qa-tools/oidn')
for scene in ['leaf','parcel']:
 for view in ['wide','portrait']:
  stem=scene+'-'+view;folder=S/(stem+'-poster-frames');folder.mkdir(exist_ok=True)
  expr=f"import bpy;s=bpy.context.scene;s.cycles.samples=32;s.render.resolution_percentage=100;s.frame_set(1);s.render.filepath={str(folder/'0001.png')!r};bpy.ops.render.render(write_still=True)"
  subprocess.run(['blender','-b',str(S/(stem+'.blend')),'-t','4','--python-expr',expr],check=True,stdout=subprocess.DEVNULL)
  subprocess.run(['python','scripts/revision1_denoise.py',str(folder)],env=env,check=True)
  im=Image.open(S/(stem+'-poster-clean/0001.png'));im.save(P/'public/media/revision1'/(scene+'-poster'+('-mobile' if view=='portrait' else '')+'.webp'),quality=92,method=6)
  print('POSTER',stem,im.size,flush=True)
