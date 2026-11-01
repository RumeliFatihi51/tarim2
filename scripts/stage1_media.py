"""Actual 2.5D photographic-concept composites. Not claimed as full terrain simulation.
Separate portrait camera staging; existing layout and interaction architecture unchanged.
"""
import bpy,math,sys
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1'
for name,focus in [('home-dawn',.70),('parcel-context',.58),('spectrum-optics',.79)]:
 if '--home-portrait' in sys.argv and name!='home-dawn':continue
 if '--skip-home' in sys.argv and name=='home-dawn':continue
 bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
 sc=bpy.context.scene;sc.render.engine='CYCLES';sc.cycles.samples=1;sc.cycles.use_denoising=False;sc.cycles.max_bounces=1;sc.render.threads_mode='FIXED';sc.render.threads=2;sc.render.image_settings.file_format='PNG';sc.render.fps=12;sc.view_settings.view_transform='Standard';sc.view_settings.look='None'
 image=bpy.data.images.load(str(S/(name+'.png')));ratio=image.size[0]/image.size[1]
 bpy.ops.mesh.primitive_plane_add(size=2);plane=bpy.context.object;plane.name='Original conceptual photographic plate';plane.scale=(8,8/ratio,1);plane.rotation_euler=(math.pi/2,0,0)
 mat=bpy.data.materials.new(name+' / original color-managed composite');mat.use_nodes=True;nodes=mat.node_tree.nodes;nodes.clear();out=nodes.new('ShaderNodeOutputMaterial');emit=nodes.new('ShaderNodeEmission');tex=nodes.new('ShaderNodeTexImage');tex.image=image;mat.node_tree.links.new(tex.outputs['Color'],emit.inputs[0]);mat.node_tree.links.new(emit.outputs[0],out.inputs[0]);plane.data.materials.append(mat)
 camdata=bpy.data.cameras.new('Stage-specific composition camera');cam=bpy.data.objects.new('Stage-specific composition camera',camdata);bpy.context.collection.objects.link(cam);sc.camera=cam;camdata.type='ORTHO';camdata.clip_end=100
 for mobile in [False,True]:
  if '--home-portrait' in sys.argv and not mobile:continue
  width,height=(720,960) if mobile else (1280,720);sc.render.resolution_x=width;sc.render.resolution_y=height;sc.render.resolution_percentage=100;camdata.ortho_scale=8.4 if mobile else 15.6;cx=(focus-.5)*16 if mobile else 0
  if mobile and (S/(name+'-portrait.png')).exists():
   image2=bpy.data.images.load(str(S/(name+'-portrait.png')));tex.image=image2;plane.scale=(3.4,3.4/(image2.size[0]/image2.size[1]),1);cx=0
  cam.animation_data_clear();camdata.animation_data_clear()
  folder=S/(name+('-portrait' if mobile else '-wide')+'-frames');folder.mkdir(exist_ok=True)
  for f in range(1,33):
   t=(f-1)/32;a=t*math.tau
   if name=='home-dawn':dx,dz,zoom=.055*math.sin(a),.025*math.cos(a),0
   elif name=='parcel-context':dx,dz,zoom=.11*math.sin(a),.012*math.sin(a*2),.004*math.cos(a)
   else:dx,dz,zoom=.012*math.sin(a*2),.065*math.sin(a),.002*math.cos(a)
   camdata.ortho_scale=(8.4 if mobile else 15.6)*(1+zoom);camdata.keyframe_insert(data_path='ortho_scale',frame=f)
   cam.location=(cx+dx,-12,dz);cam.rotation_euler=(Vector((cx,0,0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert(data_path='location',frame=f);cam.keyframe_insert(data_path='rotation_euler',frame=f)
  sc.frame_start=1;sc.frame_end=32;sc.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(S/(name+('-portrait' if mobile else '-wide')+'.blend')))
  for f in range(1,33):sc.frame_set(f);sc.render.filepath=str(folder/f'frame_{f:04d}.png');bpy.ops.render.render(write_still=True)
  print('COMPOSITE FINISHED',name,mobile,flush=True)
