"""Original earth-observation satellite and terrain cinematography. Blender 4.3 / CPU Cycles.
Usage: blender -b -t 2 --python scripts/render_orbital_v3.py -- --scene orbit --frames 1
No analysis data is generated. The spacecraft is an original conceptual model.
"""
import bpy, math, argparse, sys, os, random
from mathutils import Vector
from pathlib import Path
P=Path(__file__).resolve().parents[1]
a=argparse.ArgumentParser(); a.add_argument('--scene',default='orbit'); a.add_argument('--frames',type=int,default=40); a.add_argument('--start',type=int,default=1); a.add_argument('--samples',type=int,default=20); a.add_argument('--width',type=int,default=1200); a.add_argument('--height',type=int,default=1080)
args=a.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for m in list(bpy.data.materials): bpy.data.materials.remove(m)
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=args.samples; scene.cycles.use_denoising=False; scene.cycles.max_bounces=4; scene.cycles.transparent_max_bounces=2
scene.cycles.diffuse_bounces=2; scene.cycles.glossy_bounces=3; scene.render.threads_mode='FIXED'; scene.render.threads=2
scene.render.resolution_x=args.width; scene.render.resolution_y=args.height; scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'; scene.render.image_settings.color_mode='RGB'; scene.render.film_transparent=False
scene.view_settings.view_transform='AgX'; scene.view_settings.look='AgX - Medium High Contrast'; scene.render.fps=8
world=bpy.data.worlds.new('Space / subdued fill'); world.use_nodes=True; world.node_tree.nodes['Background'].inputs[0].default_value=(.11,.16,.24,1); world.node_tree.nodes['Background'].inputs[1].default_value=.18; scene.world=world

def mat(name,col,metal=0,rough=.35):
 m=bpy.data.materials.new(name); m.diffuse_color=(*col,1); m.use_nodes=True; p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*col,1); p.inputs['Metallic'].default_value=metal; p.inputs['Roughness'].default_value=rough; return m
silver=mat('Brushed aerospace aluminium',(.5,.55,.59),.86,.25); dark=mat('Graphite optical baffle',(.018,.027,.037),.55,.34); white=mat('Ceramic radiator coating',(.82,.84,.79),.2,.47); gold=mat('Gold multilayer insulation',(.61,.33,.052),.83,.29); blue=mat('Blue photovoltaic silicon',(.014,.042,.12),.75,.26); glass=mat('Coated optical surface',(.015,.11,.18),.72,.1)
p=gold.node_tree.nodes['Principled BSDF']; n=gold.node_tree.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value=38; n.inputs['Detail'].default_value=3; b=gold.node_tree.nodes.new('ShaderNodeBump'); b.inputs['Strength'].default_value=.24; b.inputs['Distance'].default_value=.045; gold.node_tree.links.new(n.outputs['Fac'],b.inputs['Height']); gold.node_tree.links.new(b.outputs['Normal'],p.inputs['Normal'])
root=bpy.data.objects.new('Observation satellite / original concept',None); bpy.context.collection.objects.link(root)
sat=[]
def finish(o,name,m,parent=True):
 o.name=name; o.data.materials.append(m)
 if parent:o.parent=root; sat.append(o)
 return o

def box(name,loc,scale,m,bevel=.035,parent=True):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc); o=bpy.context.object; o.dimensions=scale; bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  mod=o.modifiers.new('Machined edge radii','BEVEL'); mod.width=bevel; mod.segments=3
  bpy.context.view_layer.objects.active=o; bpy.ops.object.modifier_apply(modifier=mod.name)
  mod=o.modifiers.new('Weighted surface normals','WEIGHTED_NORMAL'); bpy.ops.object.modifier_apply(modifier=mod.name)
 return finish(o,name,m,parent)

def cylinder(name,loc,radius,depth,m,direction=(0,0,1),vertices=48):
 bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=loc); o=bpy.context.object; o.rotation_euler=Vector(direction).to_track_quat('Z','Y').to_euler()
 for f in o.data.polygons:f.use_smooth=True
 mod=o.modifiers.new('Edge treatment','BEVEL'); mod.width=.012; mod.segments=2; bpy.context.view_layer.objects.active=o; bpy.ops.object.modifier_apply(modifier=mod.name)
 return finish(o,name,m)
def rod(name,a,b,r,m):return cylinder(name,(Vector(a)+Vector(b))/2,r,(Vector(a)-Vector(b)).length,m,Vector(b)-Vector(a),12)

def light(name,loc,power,color,size):
 data=bpy.data.lights.new(name,'AREA'); data.energy=power; data.color=color; data.shape='DISK'; data.size=size; o=bpy.data.objects.new(name,data); bpy.context.collection.objects.link(o); o.location=loc; o.rotation_euler=(-Vector(loc)).to_track_quat('-Z','Y').to_euler()

if args.scene=='orbit':
 box('Insulated optical bus',(0,0,0),(1.13,1.05,1.28),gold,.095)
 box('Upper avionics deck',(0,0,.67),(1.2,1.13,.1),silver)
 box('Lower instrument deck',(0,0,-.67),(1.2,1.13,.1),silver)
 # Raised seams in the multilayer thermal blanket.
 for x in [-.48,0,.48]:rod('MLI vertical seam',(x,-.537,-.56),(x,-.537,.55),.012,silver)
 for z in [-.54,.52]:rod('MLI horizontal seam',(-.48,-.54,z),(.48,-.54,z),.012,silver)
 for side in [-1,1]:
  for j in range(8):box('Radiator fin',(side*.584,-.41+j*.117,.1),(.035,.07,.8),white,.008)
  cylinder('Solar drive',(side*.73,0,.15),.14,.38,silver,(1,0,0))
  rod('Solar spar',(side*.65,0,.15),(side*3.45,0,.15),.047,silver)
  for k in range(3):
   x=side*(1.22+k*.86)
   box('Solar panel frame',(x,0,.15),(.83,2.26,.065),silver,.016)
   box('Photovoltaic panel',(x,0,.197),(.765,2.18,.02),blue,.005)
   # Individual silicon cells and fine silver bus bars, real geometry.
   for row in range(12):
    for col in range(4):
     cell=box('Photovoltaic silicon cell',(x-.285+col*.19,-.995+row*.18,.215),(.178,.165,.006),blue,0)
     for line in [-.052,.052]:box('Solar cell contact',(x-.285+col*.19+line,-.995+row*.18,.22),(.003,.152,.002),silver,0)
   for yy in [-1.12,1.12]:
    cylinder('Panel hinge',(side*(.8+k*.86),yy,.16),.043,.1,dark,(0,1,0),16)
  rod('Instrument brace',(side*.5,-.4,-.54),(side*.39,-1.08,-.13),.027,silver)
 # Long optical barrel, toward the forward/nadir face.
 cylinder('Telescope instrument housing',(0,-.82,-.08),.34,.74,white,(0,1,0))
 for y,r,d,m in [(-.61,.37,.07,silver),(-1.05,.37,.08,silver),(-1.18,.36,.12,dark),(-1.25,.315,.03,silver),(-1.275,.286,.025,dark),(-1.295,.245,.018,glass)]:cylinder('Concentric optical assembly',(0,y,-.08),r,d,m,(0,1,0))
 cylinder('Lens inner element',(0,-1.307,-.08),.12,.008,glass,(0,1,0))
 for x in [-.42,.42]:
  cylinder('Star tracker barrel',(x,-.62,.4),.115,.28,dark,(0,-1,.12),32)
  cylinder('Star tracker optical glass',(x,-.77,.42),.082,.01,glass,(0,-1,.12),32)
 for x in [-.49,.49]:
  for y in [-.46,.46]:
   cylinder('Deck fastener',(x,y,.735),.025,.017,dark,vertices=12)
 # Real curved high-gain antenna reflector, open toward camera.
 verts=[]; faces=[]
 for j in range(11):
  r=.04+j*.024
  for k in range(40):
   t=k*math.tau/40; verts.append((.3+r*math.cos(t),.18+r*math.sin(t),.99+.75*r*r))
 for j in range(10):
  for k in range(40):
   a=j*40+k; b=j*40+(k+1)%40; faces.append((a,b,b+40,a+40))
 mesh=bpy.data.meshes.new('Parabolic antenna geometry'); mesh.from_pydata(verts,[],faces); mesh.update(); dish=bpy.data.objects.new('High-gain parabolic antenna',mesh); bpy.context.collection.objects.link(dish); finish(dish,dish.name,white)
 rod('Antenna pedestal',(.3,.18,.72),(.3,.18,1.01),.04,silver)
 rod('Reflector feed',(.3,.18,1),(.3,.18,1.32),.018,silver)
 for x in [-.45,.45]:rod('Telemetry antenna',(x,.35,.73),(x,.35,1.2),.013,silver)
 root.rotation_euler=(math.radians(12),math.radians(-15),math.radians(-18)); root.location=(0,-.4,.8)
 # The spacecraft-only model is reusable in WebGL; all materials/textures embedded.
 bpy.ops.object.select_all(action='DESELECT'); root.select_set(True)
 for o in sat:o.select_set(True)
 bpy.context.view_layer.objects.active=root
 bpy.ops.export_scene.gltf(filepath=str(P/'public/media/observation-satellite.glb'),export_format='GLB',use_selection=True,export_apply=True,export_yup=True)
 # Accurate public-domain NASA Blue Marble color texture; no measurement claims.
 earthmat=mat('NASA Blue Marble / December 2004',(.1,.2,.4),0,.84); nd=earthmat.node_tree.nodes; tex=nd.new('ShaderNodeTexImage'); tex.image=bpy.data.images.load(str(P/'src/assets/production/nasa-blue-marble.jpg')); earthmat.node_tree.links.new(tex.outputs['Color'],nd['Principled BSDF'].inputs['Base Color'])
 bpy.ops.mesh.primitive_uv_sphere_add(segments=160,ring_count=80,radius=8.8,location=(0,4.7,-6.6)); earth=bpy.context.object; finish(earth,'Earth / illustrative NASA texture',earthmat,False); earth.rotation_euler=(math.radians(-28),math.radians(5),math.radians(135))
 for f in earth.data.polygons:f.use_smooth=True
 # Thin physical sky shell: transparent head-on, luminous rim at grazing angles.
 atm=bpy.data.materials.new('Atmospheric limb'); atm.use_nodes=True; nt=atm.node_tree; nt.nodes.clear(); out=nt.nodes.new('ShaderNodeOutputMaterial'); mix=nt.nodes.new('ShaderNodeMixShader'); trans=nt.nodes.new('ShaderNodeBsdfTransparent'); emis=nt.nodes.new('ShaderNodeEmission'); emis.inputs[0].default_value=(.11,.38,.85,1); emis.inputs[1].default_value=1.2
 layer=nt.nodes.new('ShaderNodeLayerWeight'); inv=nt.nodes.new('ShaderNodeMath'); inv.operation='POWER'; inv.inputs[1].default_value=6; nt.links.new(layer.outputs['Fresnel'],inv.inputs[0]); nt.links.new(inv.outputs[0],mix.inputs[0]); nt.links.new(trans.outputs[0],mix.inputs[1]); nt.links.new(emis.outputs[0],mix.inputs[2]); nt.links.new(mix.outputs[0],out.inputs[0])
 bpy.ops.mesh.primitive_uv_sphere_add(segments=128,ring_count=64,radius=8.84,location=earth.location); finish(bpy.context.object,'Blue atmospheric edge',atm,False)
 light('Sun / broad hard key',(-5,-5,10),1800,(1,.91,.76),4)
 light('Earth reflection',(4,-2,2),520,(.48,.68,1),5)
 light('Solar rim',(-3,5,6),2400,(.65,.8,1),3)
else:
 # A continuous terrain surface, not stacked data plates.
 texmat=mat('Cultivated landscape / original generated image',(.3,.4,.17),0,.94); nodes=texmat.node_tree.nodes; t=nodes.new('ShaderNodeTexImage'); t.image=bpy.data.images.load(str(P/'src/assets/production/agriculture-v3-original.png')); texmat.node_tree.links.new(t.outputs['Color'],nodes['Principled BSDF'].inputs['Base Color'])
 verts=[]; uv=[]; faces=[]; n=144
 for j in range(n+1):
  for i in range(n+1):
   x=(i/n-.5)*18; y=(j/n-.5)*12
   z=.08*math.sin(x*.5)*math.cos(y*.6)+.12*math.sin(x*.22+y*.5)
   verts.append((x,y,z)); uv.append((i/n,j/n))
 for j in range(n):
  for i in range(n):
   k=j*(n+1)+i; faces.append((k,k+1,k+n+2,k+n+1))
 mesh=bpy.data.meshes.new('Subdivided topographic surface'); mesh.from_pydata(verts,[],faces); mesh.update(); ob=bpy.data.objects.new('Agricultural land / continuous surface',mesh); bpy.context.collection.objects.link(ob); finish(ob,ob.name,texmat,False); uvl=mesh.uv_layers.new()
 for p in mesh.polygons:
  p.use_smooth=True
  for loop in p.loop_indices:uvl.data[loop].uv=uv[mesh.loops[loop].vertex_index]
 # Subtle actual surface bump based on the land texture.
 b=nodes.new('ShaderNodeBump'); b.inputs['Strength'].default_value=.16; b.inputs['Distance'].default_value=.035; texmat.node_tree.links.new(t.outputs['Color'],b.inputs['Height']); texmat.node_tree.links.new(b.outputs['Normal'],nodes['Principled BSDF'].inputs['Normal'])
 world.node_tree.nodes['Background'].inputs[0].default_value=(.7,.76,.8,1); world.node_tree.nodes['Background'].inputs[1].default_value=.55
 light('Morning sun',(-5,-4,12),1900,(1,.89,.71),8)
scene.camera=None; data=bpy.data.cameras.new('Cinematic camera'); cam=bpy.data.objects.new('Cinematic camera',data); bpy.context.collection.objects.link(cam); scene.camera=cam
cam.data.lens=43 if args.scene=='orbit' else 47; cam.data.clip_end=200; cam.data.dof.use_dof=False
outdir=P/f'src/assets/production/{args.scene}-frames'; outdir.mkdir(exist_ok=True)
# Pose for a designed still; animation is a smooth, physically coherent looping camera dolly.
def pose(t):
 if args.scene=='orbit':
  cam.location=(4.5+.55*math.sin(t*math.tau),-9.7+.4*math.cos(t*math.tau),5.2+.22*math.sin(t*math.tau))
  aim=Vector((0,-.2,.25)); root.rotation_euler.z=math.radians(-18)+.055*math.sin(t*math.tau)
 else:
  cam.location=(.5+.6*math.sin(t*math.tau),-4.5+.45*math.cos(t*math.tau),10.8+.8*math.cos(t*math.tau)); aim=Vector((0,0,0))
 cam.rotation_euler=(aim-Vector(cam.location)).to_track_quat('-Z','Y').to_euler()
pose(0); bpy.ops.wm.save_as_mainfile(filepath=str(P/f'src/assets/production/{args.scene}-v3.blend'))
for frame in range(args.start,args.start+args.frames):
 pose((frame-1)/40); scene.frame_set(frame); scene.render.filepath=str(outdir/f'frame_{frame:04d}.png'); bpy.ops.render.render(write_still=True)
print('ORBITAL PRODUCTION COMPLETE',args.scene,args.start,args.frames,flush=True)
