"""Original metric-free terrain maquette and botanical light study. No real parcel data.
Cycles geometry / physical materials; independent portrait cameras; seamless camera loop.
Run blender -b -t 8 --python scripts/revision1_production.py -- parcel|leaf [--preview]
"""
import bpy, math, random, sys
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/revision1';S.mkdir(exist_ok=True)
name='leaf' if 'leaf' in sys.argv else 'parcel';random.seed(41)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
s=bpy.context.scene;s.render.engine='CYCLES';s.cycles.samples=32 if '--preview' in sys.argv else 8;s.cycles.use_denoising=False;s.cycles.max_bounces=5;s.render.threads_mode='FIXED';s.render.threads=8;s.render.image_settings.file_format='PNG';s.render.fps=4
s.world.color=(.23,.27,.22);s.view_settings.view_transform='AgX'
def mat(name,color,rough=.7):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;n=m.node_tree.nodes;p=n.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough
 noise=n.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=90;noise.inputs['Detail'].default_value=3;b=n.new('ShaderNodeBump');b.inputs['Strength'].default_value=.24;b.inputs['Distance'].default_value=.035;m.node_tree.links.new(noise.outputs['Fac'],b.inputs['Height']);m.node_tree.links.new(b.outputs['Normal'],p.inputs['Normal']);return m
soil=mat('Warm limestone / micro-relief',(.34,.27,.16));sage=mat('Olive canopy / rough diffuse',(.105,.17,.065));earth=mat('Ochre earth',(.25,.13,.055));grass=mat('Crop canopy',(.19,.26,.055));ivory=mat('Warm porcelain',(.64,.60,.49))
def mesh(n,v,f,m):
 me=bpy.data.meshes.new(n);me.from_pydata(v,[],f);me.update();o=bpy.data.objects.new(n,me);bpy.context.collection.objects.link(o);o.data.materials.append(m);return o
def curve(n,pts,rad,m):
 c=bpy.data.curves.new(n,'CURVE');c.dimensions='3D';c.bevel_depth=rad;c.bevel_resolution=2;p=c.splines.new('POLY');p.points.add(len(pts)-1)
 for a,b in zip(p.points,pts):a.co=(*b,1)
 o=bpy.data.objects.new(n,c);bpy.context.collection.objects.link(o);o.data.materials.append(m);return o
def light(n,loc,power,size,color):
 d=bpy.data.lights.new(n,'AREA');d.energy=power;d.shape='DISK';d.size=size;d.color=color;o=bpy.data.objects.new(n,d);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector((0,0,0))-o.location).to_track_quat('-Z','Y').to_euler()
if name=='parcel':
 # The first low-poly orchard proof was rejected. This is an authored textured
 # continuous relief, not a measured DEM and not a simulated parcel dashboard.
 def h(x,y):return .46*math.sin(x*.32)+.26*math.cos(y*.45)+.12*math.sin(y+x*.5)
 N=200;v=[(x/N*12-6,y/N*12-6,h(x/N*12-6,y/N*12-6)) for y in range(N+1) for x in range(N+1)];f=[(y*(N+1)+x,y*(N+1)+x+1,(y+1)*(N+1)+x+1,(y+1)*(N+1)+x) for y in range(N) for x in range(N)];o=mesh('Continuous fictional agricultural relief',v,f,soil)
 tex=soil.node_tree.nodes.new('ShaderNodeTexImage');tex.image=bpy.data.images.load(str(S/'parcel-surface.png'));bs=soil.node_tree.nodes.get('Principled BSDF');soil.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color']);bs.inputs['Roughness'].default_value=.88
 uv=o.data.uv_layers.new(name='Original fictional aerial surface')
 for poly in o.data.polygons:
  poly.use_smooth=True
  for li in poly.loop_indices:
   ix=o.data.loops[li].vertex_index;uv.data[li].uv=((ix%(N+1))/N,(ix//(N+1))/N)
 edge=[(-6+i/100*12,-6) for i in range(101)]+[(6,-6+i/100*12) for i in range(1,101)]+[(6-i/100*12,6) for i in range(1,101)]+[(-6,6-i/100*12) for i in range(1,101)];v=[];f=[]
 for x,y in edge:v.extend([(x,y,h(x,y)),(x,y,-1.0)])
 for i in range(len(edge)):j=(i+1)%len(edge);f.append((i*2,i*2+1,j*2+1,j*2))
 o=mesh('Natural earthen section edge',v,f,earth);bevel=o.modifiers.new('Soft material edge','BEVEL');bevel.width=.025;bevel.segments=3
 bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-1.02));bpy.context.object.data.materials.append(ivory)
 target=(0,0,0);loc=(11,-14,14);mobile=(10,-14,22);lens=48
 light('Broad raking daylight',(-7,-5,12),2300,7,(1,.92,.79));light('Cool open sky',(6,3,10),1000,12,(.78,.88,1))

else:
 # Curved wheat lamina with anatomically parallel venation, no invented spectral rainbow.
 lm=mat('Wheat lamina / waxy cuticle',(.13,.24,.035),.4);bs=lm.node_tree.nodes.get('Principled BSDF');bs.inputs['Subsurface Weight'].default_value=.12;bs.inputs['Subsurface Radius'].default_value=(.6,1,.3)
 texpath=P/'src/assets/production/stage1/wheat-lamina-original.png'
 if texpath.exists():
  tex=lm.node_tree.nodes.new('ShaderNodeTexImage');tex.image=bpy.data.images.load(str(texpath));lm.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color'])
 def pt(t,u):
  w=.62*math.sin(math.pi*t)**.65;return (u*w, (t-.5)*7, .6*math.sin(t*3.3)+.16*u*u+.1*u*math.sin(t*8))
 N=160;M=24;v=[pt(j/N,i/M*2-1) for j in range(N+1) for i in range(M+1)];f=[(j*(M+1)+i,j*(M+1)+i+1,(j+1)*(M+1)+i+1,(j+1)*(M+1)+i) for j in range(N) for i in range(M)];o=mesh('Curved wheat lamina',v,f,lm)
 uv=o.data.uv_layers.new(name='Longitudinal botanical texture')
 for p in o.data.polygons:
  p.use_smooth=True
  for li in p.loop_indices:
   ix=o.data.loops[li].vertex_index;uv.data[li].uv=((ix%(M+1))/M,(ix//(M+1))/N)
 rib=mat('Parallel vascular relief',(.28,.37,.07),.48)
 for u in [-.78,-.58,-.38,-.18,0,.18,.38,.58,.78]:curve('Parallel vein',[(x,y,z+.008) for x,y,z in [pt(.02+j/100*.96,u) for j in range(101)]],.002 if u else .006,rib)
 bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.7));bpy.context.object.data.materials.append(mat('Quiet forest background',(.035,.065,.032)))
 target=(0,.2,.35);loc=(5,-6,7);mobile=(4,-7,9);lens=65
 light('Raking daylight',(-3,1,5),550,4,(1,.92,.76));light('Soft cool fill',(4,3,4),140,5,(.76,.88,1))
camd=bpy.data.cameras.new('Authored dolly camera');cam=bpy.data.objects.new('Authored dolly camera',camd);bpy.context.collection.objects.link(cam);s.camera=cam;camd.lens=lens;camd.dof.use_dof=True;camd.dof.aperture_fstop=7 if name=='parcel' else 4
for portrait in [False,True]:
 stem=name+('-portrait' if portrait else '-wide');folder=S/(stem+'-frames');folder.mkdir(exist_ok=True);s.render.resolution_x=640 if portrait else 1280;s.render.resolution_y=900 if portrait else 800;s.render.resolution_percentage=100 if '--preview' in sys.argv else 75
 origin=Vector(mobile if portrait else loc);aim=Vector(target)
 for frame in range(1,25):
  t=(frame-1)/24*math.tau;cam.location=origin+Vector((.5*math.sin(t),.15*(math.cos(t)-1),.12*math.sin(t)));cam.rotation_euler=(aim-cam.location).to_track_quat('-Z','Y').to_euler();camd.dof.focus_distance=(aim-cam.location).length;cam.keyframe_insert(data_path='location',frame=frame);cam.keyframe_insert(data_path='rotation_euler',frame=frame)
 s.frame_start=1;s.frame_end=24;s.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(S/(stem+'.blend')))
 for frame in ([1] if '--preview' in sys.argv else range(1,25)):
  s.frame_set(frame);s.render.filepath=str(folder/f'{frame:04}.png');bpy.ops.render.render(write_still=True)
 print('FINISHED',stem,flush=True)
