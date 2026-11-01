"""Build review boards from real browser captures; no edits to production images."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageOps
P=Path(__file__).resolve().parents[1];Q=P/'qa/stage1';O=P/'docs/stage1/review';O.mkdir(exist_ok=True)
pages=['home','platform','teknoloji','filiz','cozumler','hakkimizda','iletisim']
for page in pages:
 for device in ['desktop','mobile']:
  pair=[]
  for label in ['before','after']:
   im=Image.open(Q/label/f'{page}-{device}.png').convert('RGB');width=720 if device=='desktop' else 390;im.resize((width,round(im.height*width/im.width))).save(O/f'{page}-{device}-{label}.jpg',quality=85,optimize=True)
   pair.append(im)
  w=1440 if device=='desktop' else 780;h=min(max(i.height for i in pair),1100 if device=='desktop' else 1600);out=Image.new('RGB',(w,h+35),'#f2f1e8');d=ImageDraw.Draw(out)
  for col,(label,im) in enumerate(zip(['BEFORE','AFTER'],pair)):
   im=im.crop((0,0,im.width,min(im.height,h)));im=im.resize((w//2,round(im.height*(w//2)/im.width)));out.paste(im,(col*w//2,35));d.text((col*w//2+16,10),f'{page.upper()} / {device.upper()} / {label}',fill='#203326')
  display_height=35+max(round(min(i.height,h)*(w//2)/i.width) for i in pair);out=out.crop((0,0,w,display_height));out.save(O/f'{page}-{device}-comparison.jpg',quality=90)
# Raw render and actual browser stage boards are copied only when all frames exist.
for variant in ['wide','portrait']:
 p=Q/'journey-renders'/f'{variant}-18-frames.jpg'
 if p.exists():Image.open(p).save(O/f'journey-{variant}-18-renders.jpg',quality=90)
for device in ['desktop','mobile']:
 for when in ['before','after']:
  folder=Q/f'journey-{when}'/device
  if not all((folder/f'phase-{i}-mid.png').exists() for i in range(1,7)):continue
  width,height=(480,300) if device=='desktop' else (240,520);out=Image.new('RGB',(width*3,(height+26)*2),'#f2f1e8');d=ImageDraw.Draw(out)
  for i in range(6):
   im=Image.open(folder/f'phase-{i+1}-mid.png').convert('RGB');im=ImageOps.fit(im,(width,height));x=(i%3)*width;y=(i//3)*(height+26);out.paste(im,(x,y+26));d.text((x+9,y+7),f'{when.upper()} / {device.upper()} / PHASE {i+1}',fill='#203326')
  out.save(O/f'journey-{device}-{when}.jpg',quality=91)
# Lightweight local/GitHub-readable evidence index, no new public site route.
lines=['# Gerçek tarayıcı karşılaştırmaları','', 'Başlangıç canlı sürüm 579bbe9. After kayıtları yerel production build; canlı sonuç ayrıca QA raporunda. Tam sayfa görüntüler aşağıdadır; Journey motion testleri ayrı kayıttadır.']
for page in pages:
 lines += ['',f'## {page}', '',f'![Desktop before/after]({page}-desktop-comparison.jpg)', '',f'![Mobile before/after]({page}-mobile-comparison.jpg)', '',f'[Desktop önce]({page}-desktop-before.jpg) · [Desktop sonra]({page}-desktop-after.jpg) · [Mobil önce]({page}-mobile-before.jpg) · [Mobil sonra]({page}-mobile-after.jpg)']
lines += ['', '## Sanat yönetimi', '', '![Özgün sahneler](ART_DIRECTION.jpg)', '', '## Yolculuk', '', '![Masaüstü önce](journey-desktop-before.jpg)', '', '![Masaüstü sonra](journey-desktop-after.jpg)', '', '![Mobil önce](journey-mobile-before.jpg)', '', '![Mobil sonra](journey-mobile-after.jpg)', '', '![18 geniş render karesi](journey-wide-18-renders.jpg)', '', '![18 portre render karesi](journey-portrait-18-renders.jpg)']
(O/'README.md').write_text('\n'.join(lines)+'\n')
print('Review boards generated')
