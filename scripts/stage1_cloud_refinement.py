"""Hold small distant cloud clusters out of frame; reveal volumes during actual atmospheric entry.
Updates the packed source and only five affected source frames in each existing camera variant.
"""
import bpy,sys,os
from pathlib import Path
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1';sys.path.insert(0,str(P/'scripts'))
import finish_v3
finish_v3.oidn=os.environ.get('OIDN_BIN','oidnDenoise')
for variant in ['wide','portrait']:
 bpy.ops.wm.open_mainfile(filepath=str(S/f'journey-{variant}.blend'));sc=bpy.context.scene
 for ob in bpy.data.objects:
  if ob.name.startswith('Stage1 atmospheric volume'):
   ob.animation_data_clear()
   for f,h in [(1,True),(18,True),(19,False),(28,False),(29,True),(72,True)]:ob.hide_render=h;ob.keyframe_insert(data_path='hide_render',frame=f)
 sc.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(S/f'journey-{variant}.blend'))
 for f in range(14,19):
  sc.frame_set(f);raw=S/f'journey-{variant}-frames'/f'frame_{f:04d}.png';sc.render.filepath=str(raw);bpy.ops.render.render(write_still=True);finish_v3.denoise(raw,S/f'journey-{variant}-clean'/raw.name)
 print('Cloud timing refined',variant,flush=True)
