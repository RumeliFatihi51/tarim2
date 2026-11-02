import * as T from 'three';
import {archiveChapters} from './content';
export type StudioKind='light'|'archive';
/** Authored explanatory sculpture; no ray tracing, reflectance calculation or analytic outputs. */
export async function mountStudio(canvas:HTMLCanvasElement,kind:StudioKind,_base:string){
 const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#e7e9dd');renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(36,1,.1,70);scene.fog=new T.Fog('#e7e9dd',18,40);
 scene.add(new T.HemisphereLight('#fff9e5','#476047',1.6));
 const sun=new T.DirectionalLight('#fff0cf',2.6);sun.position.set(-4,9,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;sun.shadow.normalBias=.025;sun.shadow.radius=4;scene.add(sun);
 const fill=new T.DirectionalLight('#c3dbda',1.5);fill.position.set(6,3,-3);scene.add(fill);
 const floor=new T.Mesh(new T.PlaneGeometry(80,80),new T.MeshStandardMaterial({color:'#dfe4d5',roughness:.98}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.35;floor.receiveShadow=true;scene.add(floor);
 const group=new T.Group();scene.add(group);const textures:T.Texture[]=[];
 const paper=new T.MeshStandardMaterial({color:'#f8f4e5',roughness:.82}),bronze=new T.MeshStandardMaterial({color:'#9d8656',metalness:.72,roughness:.3});
 const moving:T.Object3D[]=[],lines:T.Mesh[]=[];
 const text=(title:string,index:number)=>{const c=document.createElement('canvas');c.width=768;c.height=1100;const x=c.getContext('2d')!;x.fillStyle='#f5f1e5';x.fillRect(0,0,768,1100);x.strokeStyle='#c1cbb4';x.lineWidth=2;x.strokeRect(35,35,698,1030);x.fillStyle='#304936';x.font='20px Instrument, sans-serif';x.fillText('FILIZ / BAĞLAM ARŞİVİ',65,90);x.font='66px Instrument, sans-serif';x.fillText(title.toLocaleUpperCase('tr'),65,210);x.font='20px Instrument, sans-serif';x.fillText('0'+(index+1)+'  /  KAVRAMSAL KAYNAK',65,265);
 x.strokeStyle='#708562';x.lineWidth=3;for(let k=0;k<16;k++){x.beginPath();for(let j=0;j<80;j++){const px=65+j*8,py=430+k*18+Math.sin(j*.07+k*.2)*55;x.lineTo(px,py)}x.stroke()}
 x.font='22px Instrument, sans-serif';x.fillText(['Yer ve sınır','Kaynak ve kalite','Zaman ve süreklilik','Gerekçe ve belirsizlik'][index],65,900);x.fillStyle='#9aab88';for(let i=0;i<4;i++)x.fillRect(65,950+i*18,480-i*60,2);if(index===2){x.fillStyle='#f5f1e5';x.fillRect(60,340,640,450);x.strokeStyle='#405c3c';x.lineWidth=2;x.beginPath();x.moveTo(90,560);x.lineTo(650,560);x.stroke();for(let k=0;k<4;k++){x.beginPath();x.arc(110+k*170,560,12,0,Math.PI*2);x.stroke()}x.font='23px Instrument, sans-serif';x.fillStyle='#304936';x.fillText('ÖNCE',80,640);x.fillText('BAĞLAM',510,640)}if(index===3){x.fillStyle='#f5f1e5';x.fillRect(60,340,640,450);x.fillStyle='#304936';x.font='32px Instrument, sans-serif';['Kaynak','Tarih','Kalite','Belirsizlik'].forEach((t,k)=>{x.fillText('0'+(k+1)+'   '+t,80,420+k*90)})}const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;textures.push(t);return t;};
 if(kind==='archive'){
  for(let i=0;i<4;i++){
   const g=new T.Group();const sheet=new T.Mesh(new T.BoxGeometry(1.72,.035,2.45),paper);sheet.castShadow=true;sheet.receiveShadow=true;g.add(sheet);
   const surface=new T.Mesh(new T.PlaneGeometry(1.68,2.4),new T.MeshBasicMaterial({map:text(archiveChapters[i].title,i)}));surface.rotation.x=-Math.PI/2;surface.position.y=.02;g.add(surface);
   const clip=new T.Mesh(new T.TorusGeometry(.09,.014,8,24),bronze);clip.rotation.x=Math.PI/2;clip.position.set(.55,.045,-1.12);g.add(clip);group.add(g);moving.push(g);
  }
  for(let i=0;i<3;i++){const curve=new T.CatmullRomCurve3([new T.Vector3(-2.7+i*1.8,-1.25,0),new T.Vector3(-1.8+i*1.8,-1.2,-2),new T.Vector3(-.9+i*1.8,-1.25,0)]);const l=new T.Mesh(new T.TubeGeometry(curve,48,.012,6,false),bronze);group.add(l);lines.push(l)}
 }else{
  // Curved lamina with an authored vein network. Geometry is a botanical metaphor.
  const shape=new T.Shape();shape.moveTo(0,-2.5);shape.bezierCurveTo(-1.6,-1.2,-1.25,1.2,0,2.6);shape.bezierCurveTo(1.25,1.2,1.6,-1.2,0,-2.5);
  const geo=new T.ShapeGeometry(shape,64);geo.rotateX(-Math.PI/2);const p=geo.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,.18*Math.sin(p.getZ(i))+.22*Math.abs(p.getX(i)));geo.computeVertexNormals();
  const leaf=new T.Mesh(geo,new T.MeshPhysicalMaterial({color:'#507746',roughness:.6,side:T.DoubleSide,clearcoat:.25}));leaf.castShadow=true;leaf.receiveShadow=true;group.add(leaf);
  const veinMat=new T.MeshStandardMaterial({color:'#b7c88b',roughness:.75});
  for(let i=-8;i<=8;i++){const z=i*.24;for(const side of [-1,1]){const endZ=Math.max(-2.3,z-.22),width=.84*(1-(endZ/2.6)**2);const curve=new T.CatmullRomCurve3([new T.Vector3(0,.18*Math.sin(z)+.02,z),new T.Vector3(side*width*.5,.18*Math.sin(z-.1)+.22*width*.5+.02,z-.1),new T.Vector3(side*width,.18*Math.sin(endZ)+.22*width+.02,endZ)]);group.add(new T.Mesh(new T.TubeGeometry(curve,20,.007,5,false),veinMat))}}
  const stemCurve=new T.CatmullRomCurve3([new T.Vector3(0,.18*Math.sin(-2.7)+.02,-2.7),new T.Vector3(0,.02,0),new T.Vector3(0,.18*Math.sin(2.5)+.02,2.5)]);group.add(new T.Mesh(new T.TubeGeometry(stemCurve,50,.025,8,false),veinMat));
  const housing=new T.Group();for(let i=0;i<5;i++){const ring=new T.Mesh(new T.TorusGeometry(.48+i*.012,.04,12,64),i%2?bronze:new T.MeshStandardMaterial({color:'#213c31',metalness:.65,roughness:.32}));ring.position.z=i*.08;housing.add(ring)}
  const glass=new T.Mesh(new T.CircleGeometry(.44,64),new T.MeshPhysicalMaterial({color:'#163e37',metalness:.4,roughness:.14,clearcoat:1}));housing.add(glass);housing.position.set(2.6,1.8,-1.6);housing.lookAt(0,0,0);group.add(housing);
  for(let i=0;i<3;i++){const curve=new T.CatmullRomCurve3([new T.Vector3(-3+i*.28,3.2,1),new T.Vector3(-1+i*.3,1.5,.5),new T.Vector3(i*.25,0,0),new T.Vector3(1.5,1,-1),new T.Vector3(2.6,1.8,-1.6)]);const l=new T.Mesh(new T.TubeGeometry(curve,80,.017,6,false),new T.MeshStandardMaterial({color:i===1?'#b38d4f':'#d9c89d',emissive:'#b89b60',emissiveIntensity:.3,transparent:true,opacity:.65}));group.add(l);lines.push(l)}
 }
 let dead=false,visible=false,frame=0,active=0,progress=0,last=0;
 const size=()=>{const r=canvas.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();queueMicrotask(()=>wake())};const ro=new ResizeObserver(size);ro.observe(canvas);size();
 const render=(time:number)=>{frame=0;if(dead||!visible||document.hidden)return;if(time-last<32){frame=requestAnimationFrame(render);return}last=time;
  progress+=(active-progress)*.07;
  if(kind==='archive'){moving.forEach((o,i)=>{const emphasis=Math.max(0,1-Math.abs(progress-i));o.position.set((i-1.5)*1.85,-.55+emphasis*.7,emphasis*.85);o.rotation.set(.08-emphasis*.14,0,(i-1.5)*-.09);o.scale.setScalar(1+emphasis*.08)});camera.position.set(.4,7.6,camera.aspect<1.1?14.2:8.6);camera.lookAt(0,-.1,0)}
  else{group.rotation.y=-.18+progress*.14;camera.position.set(5.8-progress*.8,camera.aspect<1.1?13:7.2,(camera.aspect<1.1?9.8:7.4)-progress*.45);camera.lookAt(.2,.3,0);lines.forEach((l,i)=>{(l.material as T.MeshStandardMaterial).opacity=.3+.35*Math.max(0,1-Math.abs(progress-i))})}
  renderer.render(scene,camera);if(Math.abs(active-progress)>.001)frame=requestAnimationFrame(render);
 };
 const wake=()=>{if(!frame&&!dead&&visible&&!document.hidden)frame=requestAnimationFrame(render)};
 const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0}},{rootMargin:'100px'});io.observe(canvas);document.addEventListener('visibilitychange',wake);
 const lost=(e:Event)=>{e.preventDefault();canvas.dispatchEvent(new CustomEvent('studio-lost'))};canvas.addEventListener('webglcontextlost',lost);
 return {capture:(i:number)=>{active=i;progress=i;visible=true;last=-100;render(1000)},select:(i:number)=>{active=i;wake()},dispose:()=>{dead=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',wake);canvas.removeEventListener('webglcontextlost',lost);const geos=new Set<T.BufferGeometry>(),mats=new Set<T.Material>();scene.traverse(o=>{if(o instanceof T.Mesh){geos.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>mats.add(m))}});geos.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.forceContextLoss()}};
}
