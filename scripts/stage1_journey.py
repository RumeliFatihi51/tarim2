"""Stage1 visual-only revision. Same six narrative phases; independent portrait camera.
Editable physical wheat/PBR, terrain, volumetric clouds, atmosphere and keyed lighting.
"""
import bpy,math,sys
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1'
bpy.ops.wm.open_mainfile(filepath=str(S/'journey-botany.blend'));sc=bpy.context.scene;cam=sc.camera
# Source textures: original conceptual geography, not actual satellite measurements.
land=bpy.data.objects['Continuous agricultural terrain'];nt=land.data.materials[0].node_tree
for n in nt.nodes:
 if n.type=='TEX_IMAGE':
  n.image=bpy.data.images.load(str(S/'journey-geography.png'));uv=nt.nodes.new('ShaderNodeTexCoord');mapping=nt.nodes.new('ShaderNodeMapping');mapping.inputs['Scale'].default_value=(2.5,2.5,1);nt.links.new(uv.outputs['UV'],mapping.inputs[0]);nt.links.new(mapping.outputs[0],n.inputs[0])
 if n.type=='TEX_NOISE':
  position=nt.nodes.new('ShaderNodeNewGeometry');nt.links.new(position.outputs['Position'],n.inputs['Vector']);n.inputs['Scale'].default_value=32
 if n.type=='BUMP':n.inputs['Distance'].default_value=.0025
# Restrained conceptual observation tint; not a computed vegetation index.
p=nt.nodes.get('Principled BSDF');previous=p.inputs['Base Color'].links[0].from_socket;h=nt.nodes.new('ShaderNodeHueSaturation');h.inputs['Hue'].default_value=.52;h.inputs['Saturation'].default_value=.58;h.inputs['Value'].default_value=1.07;nt.links.new(previous,h.inputs['Color']);blend=nt.nodes.new('ShaderNodeMixRGB');nt.links.new(previous,blend.inputs[1]);nt.links.new(h.outputs[0],blend.inputs[2]);nt.links.new(blend.outputs[0],p.inputs['Base Color'])
for f,a in [(1,0),(35,0),(43,.55),(47,.55),(51,0),(72,0)]:blend.inputs[0].default_value=a;blend.inputs[0].keyframe_insert(data_path='default_value',frame=f)
# Soil appears only within the physical near field, avoiding a bare patch across the entire landscape.
soil_mix=next(n for n in nt.nodes if n.type=='MIX_RGB' and n!=blend)
soil_mix.inputs[0].animation_data_clear() if hasattr(soil_mix.inputs[0],'animation_data_clear') else None
# Remove the old whole-land time curve, then drive the mix with surface distance to the camera.
if nt.animation_data and nt.animation_data.action:
 for fc in list(nt.animation_data.action.fcurves):
  if fc.data_path==soil_mix.inputs[0].path_from_id('default_value'):nt.animation_data.action.fcurves.remove(fc)
camdata=nt.nodes.new('ShaderNodeCameraData');near=nt.nodes.new('ShaderNodeMapRange');near.clamp=True;near.inputs['From Min'].default_value=3;near.inputs['From Max'].default_value=16;near.inputs['To Min'].default_value=1;near.inputs['To Max'].default_value=0;nt.links.new(camdata.outputs['View Distance'],near.inputs['Value']);nt.links.new(near.outputs[0],soil_mix.inputs[0])
# Smooth, scale-consistent terrain instead of a flat rectangle.
for v in land.data.vertices:
 x,y=v.co.x,v.co.y;v.co.z=5*math.sin(x/90)*math.sin(y/100)+2.5*(math.sin(x/130)**2+math.sin(y/160)**2)
land.data.update()
# Close plant surfaces are matte, detailed and backlit; no plastic highlight.
for m in bpy.data.materials:
 if not m.use_nodes:continue
 p=m.node_tree.nodes.get('Principled BSDF')
 if not p:continue
 if m.name.startswith('Stage1 pale gold'):
  p.inputs['Base Color'].default_value=(.36,.30,.105,1);p.inputs['Roughness'].default_value=.74;p.inputs['Subsurface Weight'].default_value=.08
 if m.name.startswith('Stage1 '):p.inputs['Alpha'].default_value=1
 if m.name.startswith('Stage1 living lamina'):
  # A thin blade transmits diffuse light; random-walk SSS assumes a closed solid.
  p.inputs['Subsurface Weight'].default_value=0;ntleaf=m.node_tree;trans=ntleaf.nodes.new('ShaderNodeBsdfTranslucent');ntleaf.links.new(p.inputs['Base Color'].links[0].from_socket,trans.inputs['Color']);mixleaf=ntleaf.nodes.new('ShaderNodeMixShader');mixleaf.inputs[0].default_value=.22;ntleaf.links.new(p.outputs[0],mixleaf.inputs[1]);ntleaf.links.new(trans.outputs[0],mixleaf.inputs[2]);ntleaf.links.new(mixleaf.outputs[0],ntleaf.nodes.get('Material Output').inputs['Surface'])
for o in bpy.data.objects:
 if o.type=='LIGHT' and o.name=='Stage1 sky key':o.data.energy=180
 if o.type=='LIGHT' and o.name=='Stage1 warm rim':o.data.energy=380
# Real light-transport clouds in 3D, selectively visible only during atmospheric travel.
vol=bpy.data.materials.new('Stage1 atmospheric cloud volume');vol.use_nodes=True;n=vol.node_tree.nodes;n.clear();out=n.new('ShaderNodeOutputMaterial');v=n.new('ShaderNodeVolumePrincipled');v.inputs['Color'].default_value=(.95,.97,1,1);v.inputs['Anisotropy'].default_value=.32;noise=n.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=3;noise.inputs['Detail'].default_value=3;r=n.new('ShaderNodeValToRGB');r.color_ramp.elements[0].position=.35;r.color_ramp.elements[1].position=.7;mult=n.new('ShaderNodeMath');mult.operation='MULTIPLY';mult.inputs[1].default_value=.018;vol.node_tree.links.new(noise.outputs['Fac'],r.inputs[0]);vol.node_tree.links.new(r.outputs[0],mult.inputs[0]);vol.node_tree.links.new(mult.outputs[0],v.inputs['Density']);vol.node_tree.links.new(v.outputs[0],out.inputs['Volume'])
for i in range(8):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=1,location=(math.sin(i*4)*160,-550+i*70,450-i*35));o=bpy.context.object;o.name='Stage1 atmospheric volume';o.scale=(100,70,22);o.data.materials.append(vol)
 for f,h in [(1,True),(18,True),(19,False),(28,False),(29,True),(72,True)]:o.hide_render=h;o.keyframe_insert(data_path='hide_render',frame=f)
# A physically layered limb; original historical NASA Earth map remains intact.
atm=bpy.data.materials.new('Stage1 blue atmospheric limb');atm.use_nodes=True;n=atm.node_tree.nodes;n.clear();out=n.new('ShaderNodeOutputMaterial');mix=n.new('ShaderNodeMixShader');trans=n.new('ShaderNodeBsdfTransparent');em=n.new('ShaderNodeEmission');em.inputs[0].default_value=(.22,.47,.85,1);em.inputs[1].default_value=1.4;layer=n.new('ShaderNodeLayerWeight');power=n.new('ShaderNodeMath');power.operation='POWER';power.inputs[1].default_value=4;atm.node_tree.links.new(layer.outputs['Fresnel'],power.inputs[0]);atm.node_tree.links.new(power.outputs[0],mix.inputs[0]);atm.node_tree.links.new(trans.outputs[0],mix.inputs[1]);atm.node_tree.links.new(em.outputs[0],mix.inputs[2]);atm.node_tree.links.new(mix.outputs[0],out.inputs[0]);bpy.ops.mesh.primitive_uv_sphere_add(segments=96,ring_count=48,radius=6355,location=(0,0,-6350));o=bpy.context.object;o.name='Stage1 atmospheric halo';o.data.materials.append(atm)
for f,h in [(1,False),(28,False),(29,True),(72,True)]:o.hide_render=h;o.keyframe_insert(data_path='hide_render',frame=f)
# Native sky radiance gives the macro horizon atmospheric depth instead of a flat background.
w=sc.world.node_tree;out=w.nodes.get('World Output');old=w.nodes.get('Background');sky=w.nodes.new('ShaderNodeTexSky');sky.sky_type='NISHITA';sky.sun_elevation=.18;sky.sun_rotation=2.1;sky.sun_disc=False;sky.air_density=1;sky.dust_density=1.5;day=w.nodes.new('ShaderNodeBackground');day.inputs[1].default_value=.35;w.links.new(sky.outputs[0],day.inputs[0]);mix=w.nodes.new('ShaderNodeMixShader');w.links.new(old.outputs[0],mix.inputs[1]);w.links.new(day.outputs[0],mix.inputs[2]);w.links.new(mix.outputs[0],out.inputs[0])
for f,a in [(1,0),(20,0),(34,1),(72,1)]:mix.inputs[0].default_value=a;mix.inputs[0].keyframe_insert(data_path='default_value',frame=f)
# Linked undeformed geometry remains truly instanced; whole culms sway gently from the root.
plant=bpy.data.objects.get('Stage1 authored wheat')
for index,ob in enumerate([o for o in bpy.data.objects if o.type=='MESH' and o.data==plant.data]):
 for f in [1,45,50,55,60,65,72]:
  ob.rotation_euler.x=.018*math.sin(index*.37+f*.28) if 45<f<70 else 0;ob.keyframe_insert(data_path='rotation_euler',index=0,frame=f)
# Zero-alpha plants are also excluded from far render passes; this changes no visible pixels.
for ob in bpy.data.objects:
 if ob.type=='MESH' and ob.data==plant.data:
  for f,h in [(1,True),(45,True),(46,False),(66,False),(67,True),(72,True)]:ob.hide_render=h;ob.keyframe_insert(data_path='hide_render',frame=f)
# Extend the authored plot beyond the camera frustum using nested collection instances.
# No rectangular bed edge may enter the macro shot. Geometry and textures are shared.
plot=bpy.data.collections.new('Stage1 continuous wheat field / source tile');sc.collection.children.link(plot)
for ob in [o for o in bpy.data.objects if o.type=='MESH' and o.data==plant.data]:
 for owner in list(ob.users_collection):owner.objects.unlink(ob)
 plot.objects.link(ob)
for ix in [-1,0,1]:
 for iy in [-2,-1,0,1,2]:
  if ix==0 and iy==0:continue
  ob=bpy.data.objects.new('Stage1 field continuation',None);ob.instance_type='COLLECTION';ob.instance_collection=plot;ob.location=(ix*3.72,iy*4.92,0);sc.collection.objects.link(ob)
sc.render.use_persistent_data=True
sys.path.insert(0,str(P/'scripts'));from stage1_atmosphere import install_veil;install_veil(sc)
# Camera refinement stays inside existing phase structure. No new scroll system.
frames=[1,15,29,44,58,72]
wide=[((0,-14000,8000),(0,0,-6350),34),((0,-1200,1500),(0,0,0),34),((30,-130,240),(0,0,0),34),((20,-65,140),(0,0,0),34),((-.18,-.35,1.04),(-.075,-.059,.958),70),((40,-130,65),(-30,80,6),34)]
portrait=[((0,-19000,11500),(0,0,-6350),30),((75,-1400,1650),(20,0,0),30),((45,-150,300),(15,0,0),32),((20,-85,170),(15,0,0),32),((-.10,-.42,1.06),(-.075,-.059,.958),58),((18,-150,70),(0,80,8),30)]
sc.cycles.samples=12;sc.cycles.max_bounces=4;sc.cycles.volume_bounces=1;sc.cycles.use_denoising=False;sc.render.threads_mode='FIXED';sc.render.threads=2;sc.render.fps=6
for mobile,poses in [(False,wide),(True,portrait)]:
 cam.animation_data_clear();cam.data.animation_data_clear();cam.data.clip_end=100000;cam.data.clip_start=.03;cam.data.sensor_fit='VERTICAL' if mobile else 'AUTO'
 for f,(loc,target,lens) in zip(frames,poses):
  cam.location=loc;cam.rotation_euler=(Vector(target)-Vector(loc)).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert(data_path='location',frame=f);cam.keyframe_insert(data_path='rotation_euler',frame=f);cam.data.lens=lens;cam.data.keyframe_insert(data_path='lens',frame=f)
  cam.data.dof.focus_distance=(Vector(target)-Vector(loc)).length;cam.data.dof.aperture_fstop=8 if f==58 else 64;cam.data.dof.keyframe_insert(data_path='focus_distance',frame=f);cam.data.dof.keyframe_insert(data_path='aperture_fstop',frame=f)
 # Bake a scale-aware dolly for the two macro legs, keeping all six phase endpoints.
 # Exponential distance avoids lingering over an enlarged aerial plate, then snapping into the leaf.
 for frame in range(44,73):
  k=3 if frame<=58 else 4;t=(frame-frames[k])/(frames[k+1]-frames[k]);u=t*t*(3-2*t)
  loc0,target0,lens0=poses[k];loc1,target1,lens1=poses[k+1];a=Vector(loc0)-Vector(target0);b=Vector(loc1)-Vector(target1);pan=u if k==3 else max(0,min(1,(t-.55)/.45));pan=pan if k==3 else pan*pan*(3-2*pan);target=Vector(target0).lerp(Vector(target1),pan);direction=a.normalized().lerp(b.normalized(),u).normalized();distance=math.exp(math.log(a.length)*(1-u)+math.log(b.length)*u);cam.location=target+direction*distance;cam.rotation_euler=(-direction).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert(data_path='location',frame=frame);cam.keyframe_insert(data_path='rotation_euler',frame=frame);cam.data.lens=lens0+(lens1-lens0)*u;cam.data.keyframe_insert(data_path='lens',frame=frame);cam.data.dof.focus_distance=distance;cam.data.dof.keyframe_insert(data_path='focus_distance',frame=frame)
 # Focus is baked from the moving hero leaf surface, so the shallow macro plane does not drift.
 for frame in range(55,63):
  sc.frame_set(frame);bpy.context.view_layer.update();point=plant.matrix_world@plant.data.vertices[1791].co;direction=cam.matrix_world.to_quaternion()@Vector((0,0,-1));cam.data.dof.focus_distance=max(.03,(point-cam.matrix_world.translation).dot(direction));cam.data.dof.keyframe_insert(data_path='focus_distance',frame=frame)
 for ob in [cam,cam.data]:
  if ob.animation_data and ob.animation_data.action:
   for fc in ob.animation_data.action.fcurves:
    for k in fc.keyframe_points:k.interpolation='BEZIER';k.handle_left_type='AUTO_CLAMPED';k.handle_right_type='AUTO_CLAMPED'
 sc.render.resolution_x=576 if mobile else 1040;sc.render.resolution_y=1024 if mobile else 650;sc.render.resolution_percentage=100
 sc.use_nodes=True;tree=sc.node_tree;tree.nodes.clear();render=tree.nodes.new('CompositorNodeRLayers');final=tree.nodes.new('CompositorNodeImage');final.image=bpy.data.images.load(str(S/('journey-reveal-portrait.png' if mobile else 'journey-reveal.png')));scale=tree.nodes.new('CompositorNodeScale');scale.space='RENDER_SIZE';scale.frame_method='CROP';tree.links.new(final.outputs['Image'],scale.inputs['Image']);over=tree.nodes.new('CompositorNodeMixRGB');over.blend_type='MIX';tree.links.new(render.outputs['Image'],over.inputs[1]);tree.links.new(scale.outputs[0],over.inputs[2]);out=tree.nodes.new('CompositorNodeComposite');tree.links.new(over.outputs[0],out.inputs[0])
 for f,a in [(1,0),(62,0),(70,1),(72,1)]:over.inputs[0].default_value=a;over.inputs[0].keyframe_insert(data_path='default_value',frame=f)
 folder=S/(('journey-portrait-proof' if mobile else 'journey-wide-proof') if '--proof' in sys.argv else ('journey-portrait-frames' if mobile else 'journey-wide-frames'));folder.mkdir(exist_ok=True);sc.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(S/('journey-portrait.blend' if mobile else 'journey-wide.blend')))
 if not mobile:
  sys.path.insert(0,str(P/'scripts'));from stage1_camera_track import write_track;write_track(sc,P/'src/content/journey-camera.json')
 for i in ([1,15,29,44,58,72] if "--proof" in sys.argv else range(1,73)):
  if (folder/f'frame_{i:04d}.png').exists():continue
  f=1+(i-1)*71/71;sc.frame_set(int(f),subframe=f-int(f));sc.render.filepath=str(folder/f'frame_{i:04d}.png');bpy.ops.render.render(write_still=True)
  print('STAGE1 JOURNEY',mobile,i,'/72',flush=True)
print('STAGE1 JOURNEY COMPLETE',flush=True)
