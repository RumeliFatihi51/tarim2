import bpy,os
bpy.ops.object.select_all(action='DESELECT')
for o in list(bpy.data.objects):
 if o.type in ['MESH','CURVE'] and o.name!='Studio cyclorama':
  o.select_set(True)
  if o.name.startswith('Mineral stratum'):o['level']=int(o.name.split()[-1])
  elif o.type=='CURVE':
   zs=[p.co.z for sp in o.data.splines for p in sp.points]
   if zs:o['level']=round(((sum(zs)/len(zs))-.362)/.68)
bpy.ops.export_scene.gltf(filepath=os.path.abspath('public/media/strata.glb'),use_selection=True,export_format='GLB',export_yup=True,export_extras=True)
