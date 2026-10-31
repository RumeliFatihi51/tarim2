"""Cinematic 2.0: original context loom geometry and actual animated Cycles sequences."""
import bpy,math,os
from mathutils import Vector
root=os.getcwd();bpy.ops.wm.open_mainfile(filepath=root+'/src/scenes/filiz.blend')
s=bpy.context.scene;s.render.engine='CYCLES';s.cycles.samples=16;s.cycles.use_denoising=False;s.render.resolution_x=1024;s.render.resolution_y=640;s.render.resolution_percentage=100;s.render.image_settings.file_format='PNG';s.render.fps=8
s.cycles.max_bounces=5;s.cycles.transmission_bounces=3
cam=s.camera;cam.data.type='PERSP';cam.data.lens=52
# Retain the authored studio environment, build an entirely new sculpted lamellar object.
for o in list(bpy.data.objects):
 if o.type in {'MESH','CURVE'} and o.name!='Studio cyclorama':bpy.data.objects.remove(o,do_unlink=True)
def material(n,c,r,m=0,t=0):
 x=bpy.data.materials.new(n);x.use_nodes=True;p=x.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Roughness'].default_value=r;p.inputs['Metallic'].default_value=m;p.inputs['Transmission Weight'].default_value=t;return x
porcelain=material('V2 chalk porcelain',(.69,.68,.59),.34);olive=material('V2 olive glass',(.08,.17,.10),.23,0,.35);brass=material('V2 fine bronze',(.40,.27,.12),.29,.75)
parts=[]
for k in range(9):
 vs=[];fs=[];N=120;M=16
 for i in range(N):
  u=i/(N-1);x=(u-.5)*5.0
  for j in range(M):
   v=j/(M-1);y=(v-.5)*2.1
   envelope=math.sin(math.pi*u)**.8
   z=.22+k*.11+envelope*(.32+1.3*(v-.35)**2)+.55*math.sin(u*math.pi*2+v*1.4+k*.10)*envelope
   vs.append((x,y+.10*math.sin(u*6+k*.14),z))
 for i in range(N-1):
  for j in range(M-1):p=i*M+j;fs.append((p,p+1,p+M+1,p+M))
 mesh=bpy.data.meshes.new('Woven cartographic surface');mesh.from_pydata(vs,[],fs);mesh.update();o=bpy.data.objects.new('Context leaf %02d'%k,mesh);s.collection.objects.link(o);o.data.materials.append(olive if k in [2,6] else porcelain)
 for p in mesh.polygons:p.use_smooth=True
 mod=o.modifiers.new('Fine material thickness','SOLIDIFY');mod.thickness=.025
 bevel=o.modifiers.new('Hand-finished edge','BEVEL');bevel.width=.012;bevel.segments=2
 o['level']=k;parts.append(o)
 # fine contour veins on the top sheet, defined in the same 3D surface, not interface lines
 if k==8:
  for jj in range(1,13):
   v=jj/14;d=bpy.data.curves.new('Contour vein','CURVE');d.dimensions='3D';d.bevel_depth=.004;d.bevel_resolution=2;sp=d.splines.new('POLY');sp.points.add(N-1)
   for i,p in enumerate(sp.points):
    u=i/(N-1);env=math.sin(math.pi*u)**.8;x=(u-.5)*5;y=(v-.5)*2.1+.10*math.sin(u*6+k*.14);z=.23+k*.11+env*(.32+1.3*(v-.35)**2)+.55*math.sin(u*math.pi*2+v*1.4+k*.10)*env;p.co=(x,y,z,1)
   line=bpy.data.objects.new('Bronze contour %02d'%jj,d);s.collection.objects.link(line);line.data.materials.append(brass);line['level']=8
# Looping choreography: physical layers breathe apart, camera and key light change in space.
for f in range(1,49):
 phase=(f-1)/48*2*math.pi
 cam.location=(5.3+.7*math.sin(phase),-7.3+.4*math.cos(phase),5.2+.4*math.cos(phase));cam.rotation_euler=(Vector((0,0,.95))-cam.location).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert('location',frame=f);cam.keyframe_insert('rotation_euler',frame=f)
 for o in parts:
  level=o['level'];o.location.z=(level-4)*.035*(1+math.sin(phase));o.rotation_euler.z=.025*math.sin(phase+level*.12);o.keyframe_insert('location',frame=f);o.keyframe_insert('rotation_euler',frame=f)
 key=bpy.data.objects.get('Large north window');key.location.x=-4+math.sin(phase);key.keyframe_insert('location',frame=f)
s.frame_start=1;s.frame_end=48;s.frame_set(1)
bpy.ops.object.select_all(action='DESELECT')
for o in bpy.data.objects:
 if o.type in {'MESH','CURVE'} and o.name!='Studio cyclorama':o.select_set(True)
bpy.ops.export_scene.gltf(filepath=root+'/public/media/context-loom.glb',use_selection=True,export_format='GLB',export_extras=True,export_animations=False)
os.makedirs(root+'/src/assets/production/loom-frames',exist_ok=True);s.render.filepath=root+'/src/assets/production/loom-frames/frame_';bpy.ops.wm.save_as_mainfile(filepath=root+'/src/scenes/context-loom-v2.blend');bpy.ops.render.render(animation=True)
# Filiz retains its organic vocabulary but gets a real camera/material/light film, not CSS movement.
bpy.ops.wm.open_mainfile(filepath=root+'/src/scenes/filiz.blend');s=bpy.context.scene;s.render.engine='CYCLES';s.cycles.samples=16;s.cycles.use_denoising=False;s.cycles.max_bounces=5;s.render.resolution_x=1024;s.render.resolution_y=768;s.render.resolution_percentage=100;s.render.image_settings.file_format='PNG';s.render.fps=8;s.frame_start=1;s.frame_end=48;cam=s.camera;cam.data.type='PERSP';cam.data.lens=50
for o in list(bpy.data.objects):
 if o.name.startswith('Fine bronze vein'):bpy.data.objects.remove(o,do_unlink=True)
for f in range(1,49):
 phase=(f-1)/48*2*math.pi;angle=.55+.21*math.sin(phase)
 cam.location=(math.sin(angle)*10,-math.cos(angle)*10,4.5+.4*math.cos(phase));cam.rotation_euler=(Vector((0,0,2))-cam.location).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert('location',frame=f);cam.keyframe_insert('rotation_euler',frame=f)
 for o in bpy.data.objects:
  if o.name.startswith('Interwoven growth'):
   k=int(o.name[-1]);o.rotation_euler.z=.12*math.sin(phase+k*.5);o.location.z=.10*math.sin(phase+k*math.pi);o.keyframe_insert('rotation_euler',frame=f);o.keyframe_insert('location',frame=f)
 key=bpy.data.objects.get('Large north window');key.location.x=-4+1.5*math.sin(phase);key.keyframe_insert('location',frame=f)
s.frame_set(1);os.makedirs(root+'/src/assets/production/filiz-frames',exist_ok=True);s.render.filepath=root+'/src/assets/production/filiz-frames/frame_';bpy.ops.wm.save_as_mainfile(filepath=root+'/src/scenes/filiz-motion-v2.blend');bpy.ops.render.render(animation=True)
