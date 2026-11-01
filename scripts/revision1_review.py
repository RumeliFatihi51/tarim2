"""Side-by-side actual browser captures. This only packages QA evidence."""
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
P=Path(__file__).resolve().parents[1];R=P/'docs/revision1/review'
for route in ['home','platform','teknoloji','filiz','cozumler','hakkimizda','iletisim']:
 for width in [1440,390]:
  images=[]
  for version in ['before','after']:
   im=Image.open(R/f'{route}-{width}-{version}.jpg').convert('RGB');im.thumbnail((700,20000));images.append(im)
  canvas=Image.new('RGB',(1440,max(x.height for x in images)+45),'#efefe5');d=ImageDraw.Draw(canvas)
  for i,im in enumerate(images):canvas.paste(im,(i*720,40));d.text((i*720+12,13),('BEFORE / 105b3df' if i==0 else 'AFTER / PREMIUM MEDIA REVISION')+f' / {route} / {width}px',fill='#142d22')
  canvas.save(R/f'{route}-{width}-comparison.jpg',quality=80,optimize=True)
print('Prepared 14 side-by-side comparisons')
