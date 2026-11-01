"""Original detailed wheat with actual curved leaf geometry, spikelets, awns and PBR maps.
Builds an editable scene from the existing journey without changing its six-stage logic.
"""
import bpy,math,sys,random
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1';O=P/'public/media/stage1';S.mkdir(exist_ok=True);O.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(P/'src/assets/production/journey-refined.blend'))
scene=bpy.context.scene
for o in list(bpy.data.objects):
 if o.type=='MESH' and ('wheat' in o.name.lower() or 'crop' in o.name.lower()):bpy.data.objects.remove(o,do_unlink=True)
# Material textures are generated from a reproducible botanical microstructure, not CSS filtering.
import numpy as np
from PIL import Image
rng=np.random.default_rng(41);yy,xx=np.mgrid[0:1024,0:256];u=xx/255;v=yy/1023
ribs=.5+.5*np.sin(u*math.pi*120+.2*np.sin(v*18));mid=np.exp(-((u-.5)/.017)**2);noise=rng.normal(0,.035,xx.shape);height=.18*ribs+.38*mid+noise
base=np.zeros((*xx.shape,3));base[:]=(.30,.39,.10);base+=((ribs-.5)*.035+noise*.12)[...,None];base+=mid[...,None]*np.array([.09,.08,.025]);base+=v[...,None]*np.array([.04,.03,.005])
Image.fromarray((np.clip(base,0,1)*255).astype('uint8')).save(S/'leaf-color.jpg',quality=92)
gy,gx=np.gradient(height);normal=np.stack([-gx*3,-gy*3,np.ones_like(gx)],-1);normal/=np.linalg.norm(normal,axis=-1,keepdims=True);Image.fromarray(((normal*.5+.5)*255).astype('uint8')).save(S/'leaf-normal.png')
Image.fromarray((np.clip(.67+rng.normal(0,.04,xx.shape),0,1)*255).astype('uint8')).save(S/'leaf-roughness.jpg',quality=90)
def material(name,color,rough):
 m=bpy.data.materials.new(name);m.use_nodes=True;m.diffuse_color=(*color,1);p=m.node_tree.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;return m
# Replace the early low-contrast procedural color with original image-generated botanical tissue.
scan=Image.open(S/'wheat-lamina-original.png').convert('RGB').resize((512,1024));scan.save(S/'leaf-color.jpg',quality=93)
leaf=material('Stage1 living lamina / PBR' ,(.3,.4,.12),.67);nt=leaf.node_tree;p=nt.nodes['Principled BSDF'];p.inputs['Subsurface Weight'].default_value=.06;p.inputs['Subsurface Radius'].default_value=(.7,1,.3)
for filename,socket,kind in [('leaf-color.jpg','Base Color','color'),('leaf-normal.png','Normal','normal'),('leaf-roughness.jpg','Roughness','rough')]:
 t=nt.nodes.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(S/filename))
 if kind!='color':t.image.colorspace_settings.name='Non-Color'
 if kind=='normal':n=nt.nodes.new('ShaderNodeNormalMap');n.inputs['Strength'].default_value=.32;nt.links.new(t.outputs['Color'],n.inputs['Color']);nt.links.new(n.outputs[0],p.inputs[socket])
 else:nt.links.new(t.outputs['Color'],p.inputs[socket])
# Husk PBR source: tan glume edges and longitudinal fibres at physical scale.
yg,xg=np.mgrid[0:512,0:256];ug=xg/255;vg=yg/511;fibre=.5+.5*np.sin(ug*math.pi*42);edge=np.abs(ug-.5)*2;gn=rng.normal(0,.016,xg.shape)
grain=np.zeros((*xg.shape,3));grain[:]=(.48,.36,.15);grain+=((fibre-.5)*.045+gn)[...,None];grain-=edge[...,None]*np.array([.13,.10,.05]);grain+=vg[...,None]*np.array([.055,.04,.01]);Image.fromarray((np.clip(grain,0,1)*255).astype('uint8')).save(S/'grain-color.jpg',quality=93)
Image.fromarray((np.clip(.5+.2*fibre+gn,0,1)*255).astype('uint8')).save(S/'grain-height.png')
stem=material('Stage1 fibrous culm' ,(.32,.39,.105),.71);husk=material('Stage1 pale gold glumes',(.55,.48,.20),.68);awn=material('Stage1 fine awns',(.30,.23,.09),.79)
nt=husk.node_tree;p=nt.nodes['Principled BSDF'];p.inputs['Base Color'].default_value=(.42,.30,.10,1);p.inputs['Subsurface Weight'].default_value=.035;p.inputs['Specular IOR Level'].default_value=.22
for filename in ['grain-color.jpg','grain-height.png']:
 t=nt.nodes.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(S/filename))
 if filename.endswith('.jpg'):nt.links.new(t.outputs['Color'],p.inputs['Base Color'])
 else:
  t.image.colorspace_settings.name='Non-Color';n=nt.nodes.new('ShaderNodeBump');n.inputs['Strength'].default_value=.22;n.inputs['Distance'].default_value=.0001;nt.links.new(t.outputs['Color'],n.inputs['Height']);nt.links.new(n.outputs['Normal'],p.inputs['Normal'])

verts=[];faces=[];mids=[];uvs=[]
def patch(v,f,mat,uv=None):
 start=len(verts);verts.extend(v);faces.extend(tuple(start+i for i in q) for q in f);mids.extend([mat]*len(f));uvs.extend(uv or [(0,0)]*len(v))
# A tapered, lightly bowed culm, with a subtle internode profile.
v=[];f=[]
for j in range(25):
 z=j/24*1.2;r=.0027*(1-.5*j/24)*(1+.12*math.cos(j*math.pi/3))
 for k in range(20):a=k*math.tau/20;v.append((r*math.cos(a)+.018*math.sin(z*1.4),r*math.sin(a),z))
for j in range(24):
 for k in range(20):f.append((j*20+k,j*20+(k+1)%20,(j+1)*20+(k+1)%20,(j+1)*20+k))
patch(v,f,1)
for k in range(5):
 a=k*2.399+.5;z=.14+k*.17;length=.24+.05*math.sin(k+1);width=.012+.004*math.sin(k+2);v=[];f=[];uv=[]
 for j in range(41):
  t=j/40;w=width*math.sin(math.pi*t)**.7
  for col in range(7):
   q=col/3-1;x=t*length;y=q*w;h=z+.16*math.sin(t*2.25)-.06*t*t+.009*(1-abs(q))*math.sin(math.pi*t);v.append((math.cos(a)*x-math.sin(a)*y,math.sin(a)*x+math.cos(a)*y,h));uv.append((col/6,t))
 for j in range(40):
  for c in range(6):i=j*7+c;f.append((i,i+1,i+8,i+7))
 patch(v,f,0,uv)
# Alternate spikelets taper toward the tip. Each has two pointed glumes and a fine awn.
for j in range(16):
 side=(-1)**j;z=1.08+j*.0075;scale=1-.35*(j/15)**2;cx=.018*math.sin(z*1.4)+side*.0045*scale;cy=side*.004
 for q in [-1,1]:
  v=[];f=[]
  for ring in range(9):
   t=ring/8;rad=math.sin(math.pi*t)**.75
   for k in range(14):
    a=k*math.tau/14;x=.005*scale*rad*math.cos(a);y=.0045*rad*math.sin(a);v.append((cx+x+side*t*.004,cy+y+q*.004,z+t*.021))
  for ring in range(8):
   for k in range(14):i=ring*14+k;f.append((i,ring*14+(k+1)%14,(ring+1)*14+(k+1)%14,i+14))
  patch(v,f,2,[(k/13,r/8) for r in range(9) for k in range(14)])
  start=Vector((cx+side*.004,cy+q*.004,z+.021));end=start+Vector((side*.025,q*.0048,.045+.020*(j/15)));v=[];f=[]
  for ring in range(7):
   t=ring/6;c=start.lerp(end,t);c.x+=side*.012*math.sin(t*math.pi);r=.00019*(1-t)+.00001
   for k in range(6):a=k*math.tau/6;v.append(tuple(c+Vector((math.cos(a)*r,math.sin(a)*r,0))))
  for ring in range(6):
   for k in range(6):i=ring*6+k;f.append((i,ring*6+(k+1)%6,(ring+1)*6+(k+1)%6,i+6))
  patch(v,f,3)
mesh=bpy.data.meshes.new('Stage1 wheat / curved botanical mesh');mesh.from_pydata(verts,[],faces);mesh.update();uv=mesh.uv_layers.new()
for poly,mi in zip(mesh.polygons,mids):
 poly.material_index=mi;poly.use_smooth=True
 for loop in poly.loop_indices:uv.data[loop].uv=uvs[mesh.loops[loop].vertex_index]
plant=bpy.data.objects.new('Stage1 authored wheat',mesh);bpy.context.collection.objects.link(plant)
for m in [leaf,stem,husk,awn]:mesh.materials.append(m)
bpy.ops.object.select_all(action='DESELECT');plant.select_set(True);bpy.context.view_layer.objects.active=plant
bpy.ops.export_scene.gltf(filepath=str(O/'wheat.glb'),export_format='GLB',use_selection=True,export_apply=True)
random.seed(64)
for x in range(-15,16):
 for y in range(-20,21):
  if x==0 and y==0:continue
  o=bpy.data.objects.new('Stage1 wheat row',mesh);bpy.context.collection.objects.link(o);o.location=(x*.12+random.uniform(-.012,.012),y*.12+random.uniform(-.012,.012),0);o.rotation_euler.z=random.uniform(-.4,.4);o.scale=(1,1,random.uniform(.88,1.09))
# Keep the same six-stage source camera, replace only art/geometry/material/lighting.
scene.render.resolution_x=1280;scene.render.resolution_y=800;scene.cycles.samples=32;scene.cycles.use_denoising=False;scene.render.threads_mode='FIXED';scene.render.threads=2;scene.cycles.max_bounces=5
for o in bpy.data.objects:
 if o.type=='LIGHT' and o.data.type=='SUN':o.data.angle=.12;o.data.energy=2.5
# Soft frontal sky and a warm rim separate translucency from plastic specular response.
for name,loc,energy,color,size in [('Stage1 sky key',(0,-3,4),120,(.9,.96,1),4),('Stage1 warm rim',(3,2,5),260,(1,.83,.54),3)]:
 data=bpy.data.lights.new(name,'AREA');data.energy=energy;data.color=color;data.size=size;ob=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(ob);ob.location=loc;ob.rotation_euler=(-Vector(loc)).to_track_quat('-Z','Y').to_euler()
scene.world.node_tree.nodes['Background'].inputs[1].default_value=.6
cam=scene.camera;cam.location=(.35,-1.25,1.28);cam.rotation_euler=(Vector((0,0,1.45))-cam.location).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert(data_path='location',frame=58);cam.keyframe_insert(data_path='rotation_euler',frame=58)
for f,lens,stop,dist in [(1,34,64,18000),(44,34,64,140),(52,42,8,5),(58,60,4.5,1.3),(64,40,8,12),(72,34,64,40)]:
 cam.data.lens=lens;cam.data.dof.aperture_fstop=stop;cam.data.dof.focus_distance=dist;cam.data.keyframe_insert(data_path='lens',frame=f);cam.data.dof.keyframe_insert(data_path='aperture_fstop',frame=f);cam.data.dof.keyframe_insert(data_path='focus_distance',frame=f)
scene.camera.data.dof.use_dof=True;scene.camera.data.dof.aperture_fstop=5.6;scene.camera.data.dof.focus_distance=2.5
bpy.ops.file.pack_all();scene.frame_set(57);bpy.ops.wm.save_as_mainfile(filepath=str(S/'journey-botany.blend'))
if '--proof' in sys.argv:
 out=S/'botany-refined-proof';out.mkdir(exist_ok=True)
 for f in [53,57,61]:scene.frame_set(f);scene.render.filepath=str(out/f'frame_{f:04d}.png');bpy.ops.render.render(write_still=True)
print('STAGE1 BOTANY READY',len(verts),'vertices',flush=True)
