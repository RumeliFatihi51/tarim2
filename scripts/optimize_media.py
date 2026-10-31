from PIL import Image
from pathlib import Path
from PIL.ImageOps import fit
root=Path('public/media')
for name in ['earth','filiz','strata','evidence']:
 source=Path('src/assets/raw')/(name+('.jpg' if name=='earth' else '.png'))
 if not source.exists():continue
 im=Image.open(source).convert('RGB')
 im.save(root/(name+'.webp'),quality=88,method=6)
 mobile=fit(im,(780,1000) if name=='earth' else (900,900),centering=(.53,.55))
 mobile.save(root/(name+'-mobile.webp'),quality=86,method=6)
 if name=='earth':
  fit(im,(1200,630)).save(root/'og.jpg',quality=87,optimize=True)
 print(name, im.size, (root/(name+'.webp')).stat().st_size)
