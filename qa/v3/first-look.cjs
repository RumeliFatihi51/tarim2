const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});try{
for(const [name,width,height,motion] of [['desktop',1440,1000,'reduce'],['mobile',390,844,'reduce'],['webgl',1440,1000,'no-preference']]){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:motion,deviceScaleFactor:1});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.locator('.orbital-stage img').evaluate(im=>im.decode());if(name==='webgl')await page.waitForTimeout(1800);
 await page.screenshot({path:`qa/v3/first-${name}.png`});console.log(JSON.stringify({name,errors,canvas:await page.locator('.webgl-active canvas').count(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)}));
 if(name==='mobile'){await page.getByRole('button',{name:'Menüyü aç',exact:true}).click();await page.screenshot({path:'qa/v3/first-menu.png'});}
 await context.close();}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
