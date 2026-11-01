"""Offline OIDN 1.4.3 RT filter, LDR beauty. pip install oidn==0.2.1.
No browser dependency. Use an isolated tooling PYTHONPATH, never bundle the library.
"""
from pathlib import Path
import oidn,numpy as np
from PIL import Image
import sys,ctypes,os
folders=[Path(x) for x in sys.argv[1:]]
lib=ctypes.CDLL(str(Path(oidn.__file__).parent/'lib.linux.x64/libOpenImageDenoise.so.1.4.3'))
lib.oidnSetDevice1i.argtypes=[ctypes.c_void_p,ctypes.c_char_p,ctypes.c_int]
d=oidn.NewDevice();lib.oidnSetDevice1i(d,b'numThreads',2);oidn.CommitDevice(d)
for folder in folders:
 out=folder.parent/(folder.name.replace('-frames','-clean'));out.mkdir(exist_ok=True)
 for p in sorted(folder.glob('*.png')):
  if (out/p.name).exists():continue
  a=np.ascontiguousarray(np.asarray(Image.open(p).convert('RGB'),dtype=np.float32)/255);h,w,_=a.shape;b=np.zeros_like(a);f=oidn.NewFilter(d,'RT');oidn.SetSharedFilterImage(f,'color',a,oidn.FORMAT_FLOAT3,w,h);oidn.SetSharedFilterImage(f,'output',b,oidn.FORMAT_FLOAT3,w,h);oidn.CommitFilter(f);oidn.ExecuteFilter(f);assert oidn.GetDeviceError(d)==0;oidn.ReleaseFilter(f);Image.fromarray((np.clip(b,0,1)*255).astype(np.uint8)).save(out/p.name)
 print('DENOISED',folder,flush=True)
oidn.ReleaseDevice(d)
