"""AgroMax: continuous world-scale-to-crop camera, original crop geometry and light.
Blender 4.3 CPU Cycles. 72 true rendered frames; no optical-flow interpolation.
"""
import bpy,math,sys
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parents[1]
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
s=bpy.context.scene;s.render.engine='CYCLES';s.cycles.samples=8;s.cycles.use_denoising=False;s.cycles.max_bounces=3;s.render.threads_mode='FIXED';s.render.threads=2;s.render.resolution_x=960;s.render.resolution_y=600;s.render.resolution_percentage=100;s.render.image_settings.file_format='PNG';s.render.fps=6;s.frame_start=1;s.frame_end=72
s.view_settings.view_transform='AgX';s.view_settings.look='AgX - Medium High Contrast'
w=bpy.data.worlds.new('Warm daylight');w.use_nodes=True;w.node_tree.nodes['Background'].inputs[0].default_value=(.55,.68,.8,1);w.node_tree.nodes['Background'].inputs[1].default_value=.35;s.world=w

def mat(name,color,rough=.8):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;return m
soil=mat('Cultivated land',(.3,.37,.13));nodes=soil.node_tree.nodes;t=nodes.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(P/'src/assets/production/agriculture-v3-original.png'));soil.node_tree.links.new(t.outputs['Color'],nodes['Principled BSDF'].inputs['Base Color'])
bpy.ops.mesh.primitive_grid_add(x_subdivisions=100,y_subdivisions=100,size=640);land=bpy.context.object;land.name='Continuous agricultural terrain';land.data.materials.append(soil)
for v in land.data.vertices:v.co.z=5*math.sin(v.co.x/90)*math.sin(v.co.y/100)
for poly in land.data.polygons:poly.use_smooth=True
leafmat=mat('Living chlorophyll / longitudinal veins',(.16,.29,.033),.52);n=leafmat.node_tree.nodes;wave=n.new('ShaderNodeTexWave');wave.bands_direction='X';wave.inputs['Scale'].default_value=65;bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.16;bump.inputs['Distance'].default_value=.012;leafmat.node_tree.links.new(wave.outputs['Color'],bump.inputs['Height']);leafmat.node_tree.links.new(bump.outputs['Normal'],n['Principled BSDF'].inputs['Normal'])
stemmat=mat('Wheat stem',(.33,.39,.08));grainmat=mat('Developing grain',(.57,.5,.18),.62)
# One authored botanical asset, distributed as linked instances in an agricultural row pattern.
parts=[]
bpy.ops.mesh.primitive_cone_add(vertices=12,radius1=.014,radius2=.007,depth=1.5,location=(0,0,.75));o=bpy.context.object;o.data.materials.append(stemmat);parts.append(o)
for k in range(5):
 verts=[];faces=[];a=k*2.4;z=.15+k*.22
 for j in range(17):
  u=j/16;length=.9;width=.08*math.sin(math.pi*u)**.7
  for side in [-1,1]:
   x=u*length;y=side*width;h=z+.44*math.sin(u*2.3)-.12*u*u;verts.append((math.cos(a)*x-math.sin(a)*y,math.sin(a)*x+math.cos(a)*y,h))
 for j in range(16):faces.append((j*2,j*2+1,j*2+3,j*2+2))
 me=bpy.data.meshes.new('Curved veined leaf');me.from_pydata(verts,[],faces);me.update();ob=bpy.data.objects.new('Lanceolate crop leaf',me);bpy.context.collection.objects.link(ob);ob.data.materials.append(leafmat);parts.append(ob)
 for f in me.polygons:f.use_smooth=True
for k in range(10):
 for side in [-1,1]:
  bpy.ops.mesh.primitive_uv_sphere_add(segments=8,ring_count=6,radius=1,location=(side*.033,0,1.4+k*.027));o=bpy.context.object;o.scale=(.025,.035,.045);o.data.materials.append(grainmat);parts.append(o)
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();crop=bpy.context.object;crop.name='Original wheat asset / leaves stem grain';bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
# Export editable original geometry separately for the real-time renderer.
bpy.ops.export_scene.gltf(filepath=str(P/'public/media/crop.glb'),export_format='GLB',use_selection=True,export_apply=True)
for ix in range(-12,13):
 for iy in range(-10,13):
  if ix==0 and iy==0:continue
  ob=bpy.data.objects.new('Cultivated wheat row',crop.data);bpy.context.collection.objects.link(ob);ob.location=(ix*.56,iy*.7,.75);ob.rotation_euler.z=math.sin(ix*17+iy*31)*.3
# Planet sits below the terrain; both share one physical coordinate system.
earthmat=mat('NASA December 2004 Earth',(.1,.2,.4));n=earthmat.node_tree.nodes;t=n.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(P/'src/assets/production/nasa-blue-marble.jpg'));earthmat.node_tree.links.new(t.outputs['Color'],n['Principled BSDF'].inputs['Base Color'])
bpy.ops.mesh.primitive_uv_sphere_add(segments=128,ring_count=64,radius=6300,location=(0,0,-6350));earth=bpy.context.object;earth.name='Planetary scale / historical texture';earth.data.materials.append(earthmat)
for p in earth.data.polygons:p.use_smooth=True
# Physical broad area key and sky fill. At planet scale sun is directional.
data=bpy.data.lights.new('Low sun','SUN');data.energy=2.7;data.angle=.09;ob=bpy.data.objects.new('Low sun',data);bpy.context.collection.objects.link(ob);ob.rotation_euler=(.55,-.6,-.5)
data=bpy.data.cameras.new('Journey camera');cam=bpy.data.objects.new('Journey camera',data);bpy.context.collection.objects.link(cam);s.camera=cam;data.lens=34;data.clip_start=.04;data.clip_end=100000
# Blender Z-up equivalents of the browser world. The camera is the protagonist.
poses=[((0,-14000,8000),(0,0,-6350)),((0,-1200,1500),(0,0,0)),((100,-180,140),(0,0,0)),((10,-34,27),(0,0,0)),((.75,-2.3,1.15),(0,0,1.05)),((18,-45,12),(0,20,1.5))]
for k,(loc,target) in enumerate(poses):
 f=1+round(k*71/5);cam.location=loc;cam.rotation_euler=(Vector(target)-Vector(loc)).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert(data_path='location',frame=f);cam.keyframe_insert(data_path='rotation_euler',frame=f)
for fc in cam.animation_data.action.fcurves:
 for key in fc.keyframe_points:key.interpolation='BEZIER';key.handle_left_type='AUTO_CLAMPED';key.handle_right_type='AUTO_CLAMPED'
bpy.ops.file.pack_all();s.frame_set(1);bpy.ops.wm.save_as_mainfile(filepath=str(P/'src/assets/production/journey.blend'))
out=P/'src/assets/production/journey-frames';out.mkdir(exist_ok=True)
for f in range(1,73):
 s.frame_set(f);s.render.filepath=str(out/f'frame_{f:04d}.png');bpy.ops.render.render(write_still=True)
print('JOURNEY RENDER COMPLETE',flush=True)
