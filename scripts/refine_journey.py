"""Second quality pass: no floating tile, scale-aware soil, smooth botany and macro DOF."""
import bpy,math
from pathlib import Path
P=Path(__file__).resolve().parents[1]
bpy.ops.wm.open_mainfile(filepath=str(P/'src/assets/production/journey.blend'))
s=bpy.context.scene;cam=s.camera
land=bpy.data.objects['Continuous agricultural terrain'];land.scale=(3.125,3.125,1)
mat=land.data.materials[0];nt=mat.node_tree;principled=nt.nodes['Principled BSDF'];image=next(n for n in nt.nodes if n.type=='TEX_IMAGE');noise=nt.nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=42;noise.inputs['Detail'].default_value=4;ramp=nt.nodes.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].color=(.055,.036,.018,1);ramp.color_ramp.elements[1].color=(.24,.18,.075,1);nt.links.new(noise.outputs['Fac'],ramp.inputs[0]);mix=nt.nodes.new('ShaderNodeMixRGB');nt.links.new(image.outputs['Color'],mix.inputs[1]);nt.links.new(ramp.outputs[0],mix.inputs[2]);nt.links.new(mix.outputs[0],principled.inputs['Base Color']);bump=nt.nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.25;bump.inputs['Distance'].default_value=.06;nt.links.new(noise.outputs['Fac'],bump.inputs['Height']);nt.links.new(bump.outputs[0],principled.inputs['Normal'])
for f,v in [(1,0),(44,0),(51,1),(62,1),(69,0),(72,0)]:mix.inputs[0].default_value=v;mix.inputs[0].keyframe_insert(data_path='default_value',frame=f)
for obj in bpy.data.objects:
 if obj.type=='MESH' and ('wheat' in obj.name.lower() or 'crop' in obj.name.lower()):
  for poly in obj.data.polygons:poly.use_smooth=True
  for f,hidden in [(1,True),(49,True),(50,False),(62,False),(63,True),(72,True)]:obj.hide_render=hidden;obj.keyframe_insert(data_path='hide_render',frame=f)
for f,hidden in [(1,True),(18,True),(19,False),(72,False)]:land.hide_render=hidden;land.keyframe_insert(data_path='hide_render',frame=f)
# A dark origin evolves into atmospheric daylight. Original camera remains one continuous track.
background=s.world.node_tree.nodes['Background']
for f,color in [(1,(.008,.016,.032,1)),(15,(.018,.035,.07,1)),(24,(.55,.68,.8,1)),(72,(.55,.68,.8,1))]:background.inputs[0].default_value=color;background.inputs[0].keyframe_insert(data_path='default_value',frame=f)
cam.data.dof.use_dof=True
for f,stop,dist in [(1,64,18000),(44,64,40),(52,4,2.5),(60,4,2.5),(67,64,40),(72,64,40)]:cam.data.dof.aperture_fstop=stop;cam.data.dof.focus_distance=dist;cam.data.dof.keyframe_insert(data_path='aperture_fstop',frame=f);cam.data.dof.keyframe_insert(data_path='focus_distance',frame=f)
s.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(P/'src/assets/production/journey-refined.blend'))
out=P/'src/assets/production/journey2-frames';out.mkdir(exist_ok=True)
for f in range(1,73):
 s.frame_set(f);s.render.filepath=str(out/f'frame_{f:04d}.png');bpy.ops.render.render(write_still=True)
