"""Versioned source art + responsive exports; existing media is never deleted."""
from pathlib import Path
from PIL import Image,ImageOps
import shutil,json,hashlib
P=Path(__file__).resolve().parents[1];out=P/'public/media/stage1';src=P/'src/assets/production/stage1';out.mkdir(exist_ok=True);src.mkdir(exist_ok=True)
assets={
'home-dawn':'exec-2daed7ba-96e1-4b37-a580-d3bfa99a9a62.png',
'solution-advisor':'exec-6ac10fb5-63b4-4783-be60-30d934656307.png',
'botanical-reference':'exec-c772b7a6-7899-4d21-baa2-7422c1404e9d.png',
'parcel-context':'exec-97a3e675-f33a-458f-a57f-810f7d70819a.png',
'spectrum-optics':'exec-ab24df73-77fc-4f0d-9432-02ca33a430e5.png',
'filiz-context':'exec-2d567c88-9021-4fbc-8533-d3d0d51975b8.png',
'solution-cooperative':'exec-eb7d155a-fecb-43d4-bb05-b5e08e93a409.png',
'solution-enterprise':'exec-b7e79539-05ac-4835-8104-4e88fe189a19.png',
'solution-research':'exec-e9567843-d24a-442b-bdf4-c843a0cf6326.png',
'about-material':'exec-0199bb41-17c4-4f03-b403-fd5131919934.png',
'contact-earth':'exec-a443d763-0adc-4463-85bc-18c518fffa6d.png',
'journey-geography':'exec-17e1da8e-bcd6-41f8-8805-6131f293b9a9.png',
'perspective-detail':'exec-39276f15-ac28-4e90-807e-69acc8399999.png',
 'temporal-earth':'exec-b86a16bb-d36c-413c-989d-b885ee8b3485.png',
 'journey-reveal':'exec-22ffd54c-d66a-4717-af7c-53f31926bad5.png'}
portraits={'home-dawn':'exec-0bd5061e-14d4-484b-b899-283e0b419038.png','journey-reveal':'exec-d5d84afb-4d41-4441-a9d5-1736dce7a52f.png'}
records=[]
for name,file in assets.items():
 target=src/(name+'.png');original=Path('/workspace/generated_images')/file
 if not target.exists():shutil.copyfile(original,target)
 im=Image.open(target).convert('RGB');im.thumbnail((1920,1440));im.save(out/(name+'.webp'),quality=88,method=6)
 # Non-central authored crops per subject; independent portrait art can override these exports.
 center={'home-dawn':(.73,.5),'solution-advisor':(.73,.6),'parcel-context':(.58,.62),'spectrum-optics':(.79,.5),'filiz-context':(.48,.55),'solution-cooperative':(.38,.5),'solution-enterprise':(.67,.45),'solution-research':(.4,.6)}.get(name,(.5,.5))
 if name in portraits:
  master=src/(name+'-portrait.png')
  if not master.exists():shutil.copyfile(Path('/workspace/generated_images')/portraits[name],master)
  portrait=ImageOps.fit(Image.open(master).convert('RGB'),(576,1024) if name=='journey-reveal' else (720,960))
 else:portrait=ImageOps.fit(im,(720,960),centering=center)
 portrait.save(out/(name+'-mobile.webp'),quality=84,method=6)
 records.append({'name':name,'original':str(target.relative_to(P)),'size':Image.open(target).size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'mobileFocus':center,'kind':'original conceptual image-generation art; not a photograph of a real AgroMax operation'})
for name,file in portraits.items():
 target=src/(name+'-portrait.png')
 records.append({'name':name+'-portrait','original':str(target.relative_to(P)),'size':Image.open(target).size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'kind':'independently image-generated portrait composition of the same conceptual location, not a crop'})
texture=src/'wheat-lamina-original.png'
if texture.exists():records.append({'name':'wheat-lamina-original','original':str(texture.relative_to(P)),'size':Image.open(texture).size,'sha256':hashlib.sha256(texture.read_bytes()).hexdigest(),'kind':'original image-generated wheat lamina material, scan aesthetic but not a measured botanical scan'})
(src/'source-register.json').write_text(json.dumps(records,indent=2));print('Prepared',len(records),'original sources and exports')

import base64
for rec in records:
 name=rec['name'];width,height=rec['size'];encoded=base64.b64encode((src/(name+'.png')).read_bytes()).decode()
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><title>{name} / editable conceptual art source</title><g id="original-raster-art"><image width="{width}" height="{height}" preserveAspectRatio="xMidYMid slice" xlink:href="data:image/png;base64,{encoded}"/></g><g id="optional-annotation-layer" opacity="0"><path d="M100 100H1500V900H100Z" fill="none" stroke="#d9e2bd" stroke-width="2"/></g></svg>'
 (src/(name+'.svg')).write_text(svg)
