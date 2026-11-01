"""Export the actual authored wide Blender camera for matching WebGL/film handoffs."""
import bpy,json
from pathlib import Path
from mathutils import Vector
P=Path(__file__).resolve().parents[1]
def write_track(scene,path):
 camera=scene.camera;original=scene.frame_current;frames=[]
 for frame in range(1,73):
  scene.frame_set(frame);p=camera.matrix_world.translation;d=camera.matrix_world.to_quaternion()@Vector((0,0,-1));frames.append([round(x,8) for x in [p.x,p.z,-p.y,d.x,d.z,-d.y,camera.data.lens]])
 scene.frame_set(original);path.write_text(json.dumps({'fps':6,'duration':12,'aspect':1.6,'sensorHeight':22.5,'frames':frames},separators=(',',':'))+'\n')
if __name__=='__main__':
 bpy.ops.wm.open_mainfile(filepath=str(P/'src/assets/production/stage1/journey-wide.blend'));write_track(bpy.context.scene,P/'src/content/journey-camera.json');print('Exported 72 actual camera samples')
