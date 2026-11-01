from pathlib import Path
from PIL import Image,ImageDraw
P=Path('docs/phase2')
for name in ['home','platform','teknoloji','filiz','cozumler','hakkimizda','iletisim']:
 for width in [1440,390]:
  a=Image.open(P/'before'/f'{name}-{width}-before.jpg').convert('RGB');b=Image.open(P/f'{name}-{width}.jpg').convert('RGB');a.thumbnail((700,20000));b.thumbnail((700,20000));out=Image.new('RGB',(1440,max(a.height,b.height)+40),'#efefe5');d=ImageDraw.Draw(out);out.paste(a,(0,40));out.paste(b,(720,40));d.text((12,12),'BEFORE / '+name,fill='#183126');d.text((732,12),'PHASE 2 / '+name,fill='#183126');out.save(P/'comparison'/f'{name}-{width}.jpg',quality=80,optimize=True)
