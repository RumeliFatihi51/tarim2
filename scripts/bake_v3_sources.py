"""Pack textures and bake the exact film camera paths into the delivered .blend sources.
Run after rendering, or independently to reopen a portable, scrubbable 24 fps timeline.
"""
from pathlib import Path
import bpy,math
from mathutils import Vector
P=Path(__file__).resolve().parents[1]
for name in ['orbit','field']:
 file=P/f'src/assets/production/{name}-v3.blend'
 bpy.ops.wm.open_mainfile(filepath=str(file))
 scene=bpy.context.scene; cam=scene.camera
 root=bpy.data.objects.get('Observation satellite / original concept')
 scene.render.fps=24;scene.frame_start=1;scene.frame_end=160
 for f in range(1,162,4):
  t=(f-1)/160
  if name=='orbit':
   cam.location=(4.5+.55*math.sin(t*math.tau),-9.7+.4*math.cos(t*math.tau),5.2+.22*math.sin(t*math.tau)); aim=Vector((0,-.2,.25))
   root.rotation_euler.z=math.radians(-18)+.055*math.sin(t*math.tau);root.keyframe_insert(data_path='rotation_euler',frame=f)
  else:
   cam.location=(.5+.6*math.sin(t*math.tau),-4.5+.45*math.cos(t*math.tau),10.8+.8*math.cos(t*math.tau));aim=Vector((0,0,0))
  cam.rotation_euler=(aim-Vector(cam.location)).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert(data_path='location',frame=f);cam.keyframe_insert(data_path='rotation_euler',frame=f)
 for o in [cam,root] if name=='orbit' else [cam]:
  if o and o.animation_data and o.animation_data.action:
   for curve in o.animation_data.action.fcurves:
    for key in curve.keyframe_points:key.interpolation='BEZIER';key.handle_left_type='AUTO_CLAMPED';key.handle_right_type='AUTO_CLAMPED'
 scene.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(file))
 print('Packed portable animation source',name,flush=True)
