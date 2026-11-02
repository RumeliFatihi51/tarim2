"""Native-motion 4K Pexels source edit. No synthetic camera, CGI or interpolated frames.
Sources in docs/quality and source manifest; cache raw originals outside the repository.
Usage python scripts/produce_quality.py /tmp/agromax-quality
"""
from pathlib import Path
import subprocess,sys,json,hashlib
P=Path(__file__).resolve().parents[1];cache=Path(sys.argv[1]);out=P/'public/media/quality';out.mkdir(exist_ok=True)
clips={
 'leaf':{'id':30833644,'author':'Gaurav Kumar','file':'13185762_3840_2160_24fps.mp4','slug':'close-up-of-vibrant-green-leaf-in-sunlight'},
 'farmland':{'id':5200865,'author':'Marian Croitoru','file':'5200865-uhd_3840_2160_30fps.mp4','slug':'aerial-shot-of-agricultural-farms'},
 'aerial':{'id':30946834,'author':'Usman AbdulrasheedGambo','file':'13232111_3840_2160_24fps.mp4','slug':'aerial-drone-view-of-agricultural-landscape'},
}
for name,c in clips.items():
 c['page']=f"https://www.pexels.com/video/{c['slug']}-{c['id']}/";c['url']=f"https://videos.pexels.com/video-files/{c['id']}/{c['file']}";c['license']='https://www.pexels.com/license/';c['sha256']=hashlib.sha256((cache/(name+'.mp4')).read_bytes()).hexdigest()
(P/'src/assets/production/quality/sources.json').write_text(json.dumps(clips,indent=2))
def ff(args):subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error',*args],check=True)
def encode(source,start,length,stem,mobile,poster=True):
 if '--resume' in sys.argv and Path(str(stem).replace('-mobile','')+'-poster'+('-mobile' if mobile else '')+'.webp').exists():return
 size='720:1000' if mobile else '1920:1080'
 # Mobile receives a real centre crop from the original 3840px plate, no upscaling.
 vf=('crop=ih*0.72:ih,' if mobile else '')+f'scale={size}:flags=lanczos,setsar=1,fps=24,eq=contrast=1.035:saturation=0.92'
 ff(['-ss',str(start),'-i',str(source),'-t',str(length),'-an','-vf',vf,'-c:v','libx264','-crf','21','-preset','slow','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',str(stem)+'.mp4'])
 ff(['-i',str(stem)+'.mp4','-c:v','libvpx-vp9','-crf','28','-b:v','0','-cpu-used','3','-row-mt','1','-threads','2',str(stem)+'.webm'])
 if poster:ff(['-ss','1','-i',str(stem)+'.mp4','-frames:v','1','-quality','94',str(stem).replace('-mobile','')+'-poster'+('-mobile' if mobile else '')+'.webp'])
for mobile in [False,True]:
 suffix='-mobile' if mobile else ''
 for name,src,start,duration in [('light','leaf',2,8),('context','farmland',0,6)]:
  encode(cache/(src+'.mp4'),start,duration,out/(name+suffix),mobile);print('ENCODED',name,suffix,flush=True)
 # Bespoke 4-act edit: landscape -> leaf detail -> cultivation -> surrounding landscape.
 parts=[]
 for i,(src,start) in enumerate([('farmland',0),('leaf',4),('aerial',3),('farmland',1)]):
  dst=cache/f'shot-{mobile}-{i}';parts.append(str(dst)+'.mp4')
  if '--resume' in sys.argv and i!=2 and Path(str(dst)+'.mp4').exists():
   try:
    duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(dst)+'.mp4']))
    if abs(duration-5)<.05:continue
   except (ValueError,subprocess.CalledProcessError):pass
  size='720:1000' if mobile else '1920:1080';vf=('crop=ih*0.72:ih,' if mobile else '')+f'scale={size}:flags=lanczos,setsar=1,fps=24,eq=contrast=1.035:saturation=0.92'
  ff(['-ss',str(start),'-i',str(cache/(src+'.mp4')),'-t','5','-an','-vf',vf,'-c:v','libx264','-crf','20','-preset','slow','-threads','2','-pix_fmt','yuv420p',str(dst)+'.mp4'])
 listing=cache/'list.txt';listing.write_text(''.join(f"file '{p}'\n" for p in parts));stem=out/('signature'+suffix);font=P/'public/fonts/instrument-sans.woff2';fs=70 if mobile else 110
 end=f"drawbox=x=0:y=0:w=iw:h=ih:color=0x183126:t=fill:enable='gte(t,18)',drawtext=fontfile={font}:text='agromax':fontcolor=0xf0f1e5:fontsize={fs}:x=(w-tw)/2:y=(h-th)/2:enable='gte(t,18)'"
 ff(['-f','concat','-safe','0','-i',str(listing),'-vf',end,'-c:v','libx264','-crf','21','-maxrate','2700k','-bufsize','5400k','-preset','slow','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',str(stem)+'.mp4'])
 ff(['-f','concat','-safe','0','-i',str(listing),'-vf',end,'-c:v','libvpx-vp9','-crf','28','-b:v','2400k','-maxrate','2800k','-bufsize','5600k','-cpu-used','3','-row-mt','1','-threads','2',str(stem)+'.webm'])
 ff(['-ss','1','-i',str(stem)+'.mp4','-frames:v','1','-quality','94',str(out/('signature-poster'+suffix+'.webp'))]);print('ENCODED signature',suffix,flush=True)
