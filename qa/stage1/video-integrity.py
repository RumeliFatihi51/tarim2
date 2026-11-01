"""Decode both final signature MP4s; distinguish frame integrity from aesthetic judgment."""
from pathlib import Path
import subprocess,json
import numpy as np
results=[]
for variant in ['', '-mobile']:
 p=Path('public/media/stage1/journey'+variant+'.mp4')
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-vf','scale=64:64','-f','rawvideo','-pix_fmt','rgb24','-'])
 frames=np.frombuffer(raw,dtype=np.uint8).reshape(-1,64,64,3);means=frames.mean(axis=(1,2,3));spatial=frames.std(axis=(1,2)).mean(axis=1)
 assert len(frames)==288,(p,len(frames));assert means.min()>2,(p,means.min())
 results.append({'file':str(p),'decodedFrames':len(frames),'blackFrames':int((means<=2).sum()),'minimumMeanRGB':float(means.min()),'macroExitMinimumSpatialStd':float(spatial[232:248].min()),'note':'Opaque cloud passage and final reading hold are intentional; these statistics are not a flicker or quality certificate.'})
Path('qa/stage1/video-integrity.json').write_text(json.dumps(results,indent=2));print(json.dumps(results))
