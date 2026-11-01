"""A real homogeneous stratus passage conceals the conceptual global/local scale handoff."""
import bpy

def install_veil(sc):
 if bpy.data.objects.get('Stage1 stratus passage'):return
 m=bpy.data.materials.new('Stage1 stratus / scattering and sky fill');m.use_nodes=True;n=m.node_tree.nodes;n.clear();out=n.new('ShaderNodeOutputMaterial');v=n.new('ShaderNodeVolumePrincipled');v.inputs['Color'].default_value=(.92,.96,1,1);v.inputs['Anisotropy'].default_value=.15;v.inputs['Emission Color'].default_value=(.72,.84,1,1);m.node_tree.links.new(v.outputs[0],out.inputs['Volume'])
 for f,d in [(1,0),(15,0),(16,.002),(17,.008),(18,.015),(19,.015),(20,.007),(21,.001),(22,0),(72,0)]:
  v.inputs['Density'].default_value=d;v.inputs['Density'].keyframe_insert(data_path='default_value',frame=f);v.inputs['Emission Strength'].default_value=d*.07;v.inputs['Emission Strength'].keyframe_insert(data_path='default_value',frame=f)
 bpy.ops.mesh.primitive_cube_add(size=2,location=(0,-500,900));o=bpy.context.object;o.name='Stage1 stratus passage';o.scale=(1200,1200,400);o.data.materials.append(m)
 for f,h in [(1,True),(15,True),(16,False),(22,False),(23,True),(72,True)]:o.hide_render=h;o.keyframe_insert(data_path='hide_render',frame=f)
