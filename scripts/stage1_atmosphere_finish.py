import bpy,sys,os
from pathlib import Path
P=Path(__file__).resolve().parents[1];S=P/'src/assets/production/stage1';sys.path.insert(0,str(P/'scripts'))
from stage1_atmosphere import install_veil
import finish_v3
finish_v3.oidn=os.environ.get('OIDN_BIN','oidnDenoise')
for variant in ['wide','portrait']:
 bpy.ops.wm.open_mainfile(filepath=str(S/f'journey-{variant}.blend'));sc=bpy.context.scene;install_veil(sc);sc.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(S/f'journey-{variant}.blend'))
 for f in range(16,22):
  sc.frame_set(f);raw=S/f'journey-{variant}-frames'/f'frame_{f:04d}.png';sc.render.filepath=str(raw);bpy.ops.render.render(write_still=True);finish_v3.denoise(raw,S/f'journey-{variant}-clean'/raw.name)
 print('Atmosphere passage completed',variant,flush=True)
