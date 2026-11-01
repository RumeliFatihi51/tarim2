"""Keep the leaf in front of the lens during the retreat; pan to the horizon only at landscape scale."""
import bpy,math,sys,os
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1';sys.path.insert(0,str(P/'scripts'))
from stage1_camera_track import write_track
import finish_v3
finish_v3.oidn=os.environ.get('OIDN_BIN','oidnDenoise')
for mobile in [False,True]:
 variant='portrait' if mobile else 'wide';bpy.ops.wm.open_mainfile(filepath=str(S/f'journey-{variant}.blend'));sc=bpy.context.scene;cam=sc.camera;plant=bpy.data.objects['Stage1 authored wheat']
 start=Vector((-.10,-.42,1.06) if mobile else (-.18,-.35,1.04));target0=Vector((-.075,-.059,.958));end=Vector((18,-150,70) if mobile else (40,-130,65));target1=Vector((0,80,8) if mobile else (-30,80,6));a=start-target0;b=end-target1
 for f in range(59,73):
  t=(f-58)/14;u=t*t*(3-2*t);v=max(0,min(1,(t-.55)/.45));pan=v*v*(3-2*v);target=target0.lerp(target1,pan);direction=a.normalized().lerp(b.normalized(),u).normalized();distance=math.exp(math.log(a.length)*(1-u)+math.log(b.length)*u);cam.location=target+direction*distance;cam.rotation_euler=(-direction).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert(data_path='location',frame=f);cam.keyframe_insert(data_path='rotation_euler',frame=f);cam.data.dof.focus_distance=distance;cam.data.dof.keyframe_insert(data_path='focus_distance',frame=f)
 for f in range(59,63):
  sc.frame_set(f);bpy.context.view_layer.update();point=plant.matrix_world@plant.data.vertices[1791].co;direction=cam.matrix_world.to_quaternion()@Vector((0,0,-1));cam.data.dof.focus_distance=max(.03,(point-cam.matrix_world.translation).dot(direction));cam.data.dof.keyframe_insert(data_path='focus_distance',frame=f)
 for ob in [cam,cam.data]:
  for fc in ob.animation_data.action.fcurves:
   for key in fc.keyframe_points:key.interpolation='BEZIER';key.handle_left_type='AUTO_CLAMPED';key.handle_right_type='AUTO_CLAMPED'
 sc.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(S/f'journey-{variant}.blend'))
 if not mobile:write_track(sc,P/'src/content/journey-camera.json')
 for f in range(59,70):
  sc.frame_set(f);raw=S/f'journey-{variant}-frames'/f'frame_{f:04d}.png';sc.render.filepath=str(raw);bpy.ops.render.render(write_still=True);finish_v3.denoise(raw,S/f'journey-{variant}-clean'/raw.name)
 print('Exit refined',variant,flush=True)
