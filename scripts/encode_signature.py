"""Original 20-second edit: real wheat → authored optics → authored archive → real harvest.
Render WebGL plates with render_studio.cjs first. Source footage attribution stays visible.
"""
from pathlib import Path
import subprocess,sys
P=Path(__file__).resolve().parents[1];out=P/'public/media/studio';out.mkdir(exist_ok=True)
def ff(args):subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error',*args],check=True)
for mobile in [False,True]:
 if "--mobile-only" in sys.argv and not mobile:continue
 suffix='-mobile' if mobile else '';size='576:800' if mobile else '1280:720';parts=[]
 for i,kind in enumerate(['wind','light','archive','harvest']):
  dst=Path(f'/tmp/signature{suffix}-{i}.mp4');parts.append(dst)
  inputs=['-ss','0' if kind=='wind' else '12','-i',str(P/f'public/media/observation/{kind}{suffix}.mp4')] if kind in ['wind','harvest'] else ['-framerate','6','-i',f'/tmp/agromax-studio-{kind}{suffix}/%04d.png']
  vf='scale='+size+',setsar=1,'+('fps=24' if kind in ['wind','harvest'] else 'minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:vsbmc=1')
  ff([*inputs,'-vf',vf,'-t','5','-an','-c:v','libx264','-crf','24','-preset','slow','-pix_fmt','yuv420p','-threads','2',str(dst)])
 concat=Path('/tmp/signature-list.txt');concat.write_text(''.join(f"file '{p}'\n" for p in parts))
 stem=out/('signature'+suffix)
 font=P/'public/fonts/instrument-sans.woff2';fs=60 if mobile else 96
 endcard=f"drawbox=x=0:y=0:w=iw:h=ih:color=0x183126:t=fill:enable='gte(t,18)',drawtext=fontfile={font}:text='agromax':fontcolor=0xf0f1e5:fontsize={fs}:x=(w-tw)/2:y=(h-th)/2:enable='gte(t,18)'"
 ff(['-f','concat','-safe','0','-i',str(concat),'-vf',endcard,'-c:v','libx264','-crf','20','-preset','slow','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',str(stem)+'.mp4'])
 ff(['-i',str(stem)+'.mp4','-c:v','libvpx-vp9','-b:v','0','-crf','34','-cpu-used','3','-row-mt','1','-threads','2',str(stem)+'.webm'])
 ff(['-ss','0.7','-i',str(stem)+'.mp4','-frames:v','1','-quality','92',str(out/('signature-poster'+suffix+'.webp'))]);print('ENCODED',stem,flush=True)
