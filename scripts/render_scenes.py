"""Original AgroMax artwork. Blender 4.3 / Cycles; no external meshes/textures."""
import bpy, math, os
from mathutils import Vector
OUT=os.path.abspath('src/assets/raw'); os.makedirs(OUT,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=96
scene.cycles.use_denoising=False; scene.render.resolution_x=1500; scene.render.resolution_y=1200; scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'; scene.world=bpy.data.worlds.new('Ivory daylight'); scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs[0].default_value=(0.64,0.68,0.61,1); scene.world.node_tree.nodes['Background'].inputs[1].default_value=.45
scene.view_settings.view_transform='AgX'
def mat(name,color,rough=.4,metal=0,trans=0):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal;p.inputs['Transmission Weight'].default_value=trans
 n=m.node_tree.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value=150;n.inputs['Detail'].default_value=2
 b=m.node_tree.nodes.new('ShaderNodeBump'); b.inputs['Strength'].default_value=.12;b.inputs['Distance'].default_value=.025;m.node_tree.links.new(n.outputs['Fac'],b.inputs['Height']);m.node_tree.links.new(b.outputs[0],p.inputs['Normal']);return m
ivory=mat('Unglazed porcelain',(0.76,.74,.65),.32);green=mat('Deep chlorophyll glass',(.10,.24,.14),.17,0,.65);sage=mat('Satin celadon',(.40,.49,.35),.29);bronze=mat('Brushed champagne bronze',(.50,.32,.13),.24,.8);sand=mat('Warm limestone',(.66,.58,.43),.55)
floor=mat('Warm seamless',(.78,.77,.70),.62)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.12));bpy.context.object.data.materials.append(floor);bpy.context.object.name='Studio cyclorama'
def light(name,loc,power,size,color):
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.shape='DISK';d.size=size;d.color=color;o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector((0,0,1.5))-o.location).to_track_quat('-Z','Y').to_euler()
light('Large north window',(-4,-5,8),1400,5,(1,.91,.76));light('Cool fill',(5,2,6),1000,4,(.85,.94,1));light('Edge softbox',(0,5,7),1700,3,(1,.98,.89))
camd=bpy.data.cameras.new('Portrait lens');cam=bpy.data.objects.new('Camera',camd);scene.collection.objects.link(cam);scene.camera=cam;camd.type='ORTHO';camd.ortho_scale=7.8
base=set(bpy.data.objects)
def camera(loc,target,scale):
 cam.location=loc;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();camd.ortho_scale=scale

def mesh(name,vs,fs,material):
 d=bpy.data.meshes.new(name);d.from_pydata(vs,[],fs);d.update();o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.data.materials.append(material)
 for p in d.polygons:p.use_smooth=True
 s=o.modifiers.new('Porcelain thickness','SOLIDIFY');s.thickness=.055
 b=o.modifiers.new('Soft polished edge','BEVEL');b.width=.035;b.segments=3
 return o

def curve(name,pts,r,material):
 d=bpy.data.curves.new(name,'CURVE');d.dimensions='3D';d.bevel_depth=r;d.bevel_resolution=4;s=d.splines.new('POLY');s.points.add(len(pts)-1)
 for p,co in zip(s.points,pts):p.co=(*co,1)
 o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.data.materials.append(material);return o

def render(name):
 scene.render.filepath=OUT+'/'+name+'.png';bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath('src/scenes/'+name+'.blend'));bpy.ops.render.render(write_still=True)
def clear():
 for o in list(bpy.data.objects):
  if o not in base:bpy.data.objects.remove(o,do_unlink=True)
# S04: two interleaving organic porcelain/glass ribbons. Sculptural, no interface.
for k,material in enumerate([ivory,green]):
 vs=[];fs=[];N=180;M=26
 for i in range(N):
  t=i/(N-1); a=t*math.pi*2.15+k*math.pi;radius=1.05*(1-.34*t);width=.67*math.sin(math.pi*t)**.55+.055
  for j in range(M):
   u=(j/(M-1)-.5)*2;rr=radius+u*width
   vs.append((rr*math.cos(a),rr*math.sin(a),.28+3.5*t+.27*u*u+.16*math.sin(a)*u))
 for i in range(N-1):
  for j in range(M-1):p=i*M+j;fs.append((p,p+1,p+M+1,p+M))
 mesh('Interwoven growth '+str(k),vs,fs,material)
for k in range(3):
 pts=[]
 for i in range(250):
  t=i/249; a=t*math.pi*2.15+k*.07
  pts.append(((1.05*(1-.34*t)+.71)*math.cos(a),(1.05*(1-.34*t)+.71)*math.sin(a),.33+3.5*t))
 curve('Fine bronze vein '+str(k),pts,.009,bronze)
camera((6,-10,5.5),(0,0,1.95),6.4);render('filiz');clear()
# S02: organic translucent mineral strata with sculpted, non-cartographic edges.
for k,material in enumerate([sand,sage,green,ivory]):
 vs=[(0,0,.35+k*.68)];fs=[];N=160
 for i in range(N):
  a=2*math.pi*i/N;r=1.75+.13*math.sin(a*3+k*.4)+.07*math.sin(a*7)
  vs.append((r*math.cos(a),r*.68*math.sin(a),.35+k*.68+.12*math.sin(a*2)))
 for i in range(N):fs.append((0,i+1,(i+1)%N+1))
 mesh('Mineral stratum '+str(k),vs,fs,material)
 for r in [.65,1.,1.3,1.55]:
  pts=[]
  for i in range(161):
   a=2*math.pi*i/160;rr=r+.035*math.sin(a*3+k*.4);pts.append((rr*math.cos(a),rr*.68*math.sin(a),.362+k*.68+.12*math.sin(a*2)*r/1.75))
  curve('Contour incision',pts,.006,bronze if k==3 else sage)
camera((6,-9,6.7),(0,0,1.35),6.8);render('strata');clear()
# S05: evidence as an aligned sequence of bespoke limestone portals.
for k in range(5):
 vs=[];fs=[];N=100;M=12;R=1.5-k*.10
 for i in range(N):
  a=math.pi*i/(N-1)
  for j in range(M):
   b=2*math.pi*j/M;rr=R+.15*math.cos(b);vs.append((rr*math.cos(a),k*.48+.15*math.sin(b),.18+rr*math.sin(a)))
 for i in range(N-1):
  for j in range(M):p=i*M+j;fs.append((p,i*M+(j+1)%M,(i+1)*M+(j+1)%M,p+M))
 mesh('Aligned evidence portal '+str(k),vs,fs,ivory if k%2==0 else sage)
curve('Continuity',[(0,-1.8+i*.04,.19+.03*math.sin(i*.05)) for i in range(120)],.025,bronze)
camera((5,-8,4.3),(0,.7,.8),5.4);render('evidence')
