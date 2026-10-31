"""Denoise actual Cycles frames, then encode a seamless 24 fps loop.
40 unique source frames at 6 fps. Three wrapped samples provide optical-flow
neighbors at the loop boundary; all four delivery variants contain 160 frames.
"""
from pathlib import Path
import subprocess, os, time, sys, shutil
import numpy as np
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
oidn = os.environ.get('OIDN_BIN', 'oidnDenoise')

def denoise(src, dst):
    a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32) / 255
    ip, op = dst.with_suffix('.pfm'), dst.with_suffix('.out.pfm')
    with ip.open('wb') as f:
        f.write(f'PF\n{a.shape[1]} {a.shape[0]}\n-1.0\n'.encode())
        np.flipud(a).astype('<f4').tofile(f)
    subprocess.run([oidn, '--ldr', str(ip), '--srgb', '-o', str(op), '--threads', '2', '-q', 'h'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    with op.open('rb') as f:
        f.readline()
        w, h = map(int, f.readline().split())
        f.readline()
        out = np.flipud(np.frombuffer(f.read(), dtype='<f4').reshape(h, w, 3))
    image = Image.fromarray((np.clip(out, 0, 1) * 255 + .5).astype('uint8'))
    image.save(dst)
    ip.unlink()
    op.unlink()
    return image

def encode(name):
    clean = root / f'src/assets/production/{name}-clean'
    for i in range(1, 4):
        shutil.copyfile(clean / f'frame_{i:04d}.png', clean / f'frame_{40+i:04d}.png')
    for mobile in [False, True]:
        stem = root / 'public/media' / (name + ('-mobile' if mobile else ''))
        vf = 'hqdn3d=1:1:2:2,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:vsbmc=1'
        if mobile:
            vf += ',crop=ih*0.8:ih,scale=576:720'
        codecs = [('mp4', ['-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-movflags', '+faststart']), ('webm', ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '29', '-row-mt', '1'])]
        for ext, options in codecs:
            subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-framerate', '6', '-i', str(clean / 'frame_%04d.png'), '-vf', vf, '-frames:v', '160', '-an', *options, '-threads', '2', '-pix_fmt', 'yuv420p', str(stem) + '.' + ext], check=True)
            print('Encoded loop', name, mobile, ext, flush=True)

if __name__ == '__main__':
    for name in (sys.argv[1:] or ['orbit', 'field']):
        clean = root / f'src/assets/production/{name}-clean'
        clean.mkdir(exist_ok=True)
        for i in range(1, 41):
            src = root / f'src/assets/production/{name}-frames/frame_{i:04d}.png'
            dst = clean / f'frame_{i:04d}.png'
            while not dst.exists():
                try:
                    denoise(src, dst)
                except (FileNotFoundError, OSError, ValueError, SyntaxError):
                    time.sleep(2)
                    continue
            if i == 1:
                image = Image.open(dst).convert('RGB')
                image.save(root / f'public/media/{name}-poster.webp', quality=92, method=6)
                ImageOps.fit(image, (720, 840)).save(root / f'public/media/{name}-poster-mobile.webp', quality=88, method=6)
            print(name, i, '/40', flush=True)
        encode(name)
        print(name, 'FINISHED', flush=True)
