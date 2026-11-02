"""A purposeful three-shot harvest edit, from attributed CC BY 3.0 4K footage.
Run: python scripts/produce_observation.py [cached-source.webm]
Source is downloaded to a temporary directory when no cached source is given.
No generated analysis, AI footage, synthetic motion or satellite data.
"""
from pathlib import Path
import subprocess, sys, urllib.request, tempfile, hashlib, json

ROOT = Path(__file__).resolve().parents[1]
URL = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Drone_Footage_Of_Iowa_Combine_Harvesting_Beans.webm'
OUT = ROOT / 'public/media/observation'
OUT.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory(prefix='agromax-film-') as temp:
    temp = Path(temp)
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else temp / 'source.webm'
    if not source.exists():
        urllib.request.urlretrieve(URL, source)
    manifest = {'source': URL, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                'author': 'MrAyrit', 'license': 'CC BY 3.0',
                'edit': [{'sourceStart': t, 'duration': 6} for t in [110, 70, 5]],
                'note': 'Three editorial cuts from one real Iowa 2016 harvest. Not AgroMax or satellite output.'}
    for mobile in [False, True]:
        segments = []
        size = '576:800' if mobile else '1280:720'
        crop = 'crop=ih*0.72:ih,' if mobile else ''
        # Restrained correction: neutralise the source's red cast; keep natural earth.
        grade = 'colorbalance=rs=-0.025:bs=0.018,eq=saturation=0.88:contrast=1.025:brightness=0.01'
        for i, start in enumerate([110, 70, 5]):
            clip = temp / f'{mobile}-{i}.mp4'
            subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-threads', '2',
                '-ss', str(start), '-i', str(source), '-t', '6', '-an',
                '-vf', crop + 'scale=' + size + ':flags=lanczos,fps=24,hqdn3d=1.2:1.2:2:2,' + grade,
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-threads', '2',
                '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(clip)], check=True)
            segments.append(clip)
        concat = temp / 'list.txt'
        concat.write_text(''.join(f"file '{p}'\n" for p in segments))
        stem = OUT / ('harvest-mobile' if mobile else 'harvest')
        subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat',
            '-safe', '0', '-i', str(concat), '-c', 'copy', '-movflags', '+faststart', str(stem)+'.mp4'], check=True)
        subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(stem)+'.mp4',
            '-an', '-c:v', 'libvpx-vp9', '-crf', '34', '-cpu-used', '3', '-b:v', '0', '-row-mt', '1', '-threads', '2',
            '-pix_fmt', 'yuv420p', str(stem)+'.webm'], check=True)
        poster = OUT / ('harvest-poster-mobile.webp' if mobile else 'harvest-poster.webp')
        subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-ss', '1',
            '-i', str(stem)+'.mp4', '-frames:v', '1', '-quality', '92', str(poster)], check=True)
        print('ENCODED', stem.name, flush=True)
    (ROOT/'src/assets/production/field-observation/source.json').write_text(json.dumps(manifest, indent=2))
