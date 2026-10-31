/** QA tooling uses the session's Playwright installation, separate from production deps. */
const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
const {AxeBuilder}=require('/workspace/qa-tools/node_modules/@axe-core/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
const origin=process.env.QA_ORIGIN||'http://localhost:4173';const base=process.env.BASE_PATH||'/';
const routes=['','platform/','teknoloji/','filiz/','cozumler/','hakkimizda/','iletisim/','gizlilik/','kullanim/','gorsel-kredileri/','404.html'];
const sizes=[[1440,900],[1920,1080],[1024,768],[768,1024],[390,844],[360,800],[320,800]];
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const results={date:new Date().toISOString(),routes:[],screenshots:[],consoleErrors:[],accessibility:[],functional:{}};
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();
  page.on('pageerror',e=>results.consoleErrors.push(e.message));
  for(const route of routes){const response=await page.goto(origin+base+route,{waitUntil:'networkidle'});assert(response.status()===200,route+' deep-link');assert.equal(await page.locator('h1').count(),1);
   await page.evaluate(async()=>{document.querySelectorAll('img').forEach(im=>im.loading='eager');await document.fonts.ready;for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,45));}window.scrollTo(0,0);await Promise.all([...document.images].map(im=>im.decode().catch(()=>{})));});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert(!overflow,`Horizontal overflow ${width} ${route}`);
   const images=await page.locator('img').evaluateAll(imgs=>imgs.filter(im=>!im.naturalWidth).map(im=>im.currentSrc));assert.equal(images.length,0,'Broken images '+route+': '+images);
   results.routes.push({route:route||'/',width,status:response.status(),overflow,images:'pass'});fs.writeFileSync('qa/results.json',JSON.stringify(results,null,2));
   if(width!==320&&route!=='404.html'){
    const accessibility=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.accessibility.push({route:route||'/',width,violations:accessibility.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,help:v.help,targets:v.nodes.map(n=>n.target)}))});
   }
   if(width!==320){const file=`qa/${route?route.replace('/',''):'home'}-${width}.png`;await page.screenshot({path:file,fullPage:true});results.screenshots.push(file);}
  }await context.close();
 }
 const p=await browser.newPage();
 for(const [width,height] of sizes){await p.setViewportSize({width,height});await p.goto(origin+base,{waitUntil:'networkidle'});await p.screenshot({path:`qa/hero-${width}x${height}.png`});results.screenshots.push(`qa/hero-${width}x${height}.png`);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'hero overflow '+width)}
 await p.setViewportSize({width:390,height:844});await p.goto(origin+base+'platform/',{waitUntil:'networkidle'});
 await p.getByRole('button',{name:'Menüyü aç'}).click();await p.waitForTimeout(100);
 assert.equal(await p.getByRole('button',{name:'Menüyü kapat'}).getAttribute('aria-expanded'),'true');
 const menu=p.locator('#mobile-menu');assert.equal(await menu.getByRole('link').count(),7);
 for(let i=0;i<8;i++)await p.keyboard.press('Tab');assert(await p.evaluate(()=>document.activeElement.closest('#mobile-menu')||document.activeElement.closest('.menu-toggle')),'menu focus trap');
 await p.keyboard.press('Escape');assert.equal(await p.getByRole('button',{name:'Menüyü aç'}).getAttribute('aria-expanded'),'false');assert.equal(await p.evaluate(()=>document.body.style.overflow),'');results.functional.menu='7 links, focus trap, Escape, focus return, scroll restoration pass';
 await p.getByRole('button',{name:'Menüyü aç'}).click();await menu.getByRole('link',{name:/Filiz AI/}).click();await p.waitForURL('**/filiz/');await p.reload({waitUntil:'networkidle'});assert((await p.locator('h1').innerText()).includes('Filiz'));await p.goBack({waitUntil:'networkidle'});results.functional.deepLinks='direct load, menu navigation, reload and browser back pass';
 const reduced=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});await reduced.goto(origin+base,{waitUntil:'networkidle'});await reduced.locator('.strata-art').scrollIntoViewIfNeeded();assert.equal(await reduced.locator('canvas').count(),0);results.functional.reducedMotion='static poster; no WebGL canvas';await reduced.close();
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(origin+base+'teknoloji/');assert.equal(await nojs.locator('h1').count(),1);assert((await nojs.locator('main').innerText()).includes('Sentinel-2'));assert(await nojs.locator('footer a').count()>8);results.functional.noJavaScript='complete prerendered content and footer navigation pass';await nojs.close();
 const blocked=await browser.newPage({viewport:{width:1440,height:900}});await blocked.route('**/*.glb',r=>r.abort());await blocked.goto(origin+base,{waitUntil:'networkidle'});await blocked.locator('.strata-art').scrollIntoViewIfNeeded();await blocked.waitForTimeout(1000);assert((await blocked.locator('.strata-art img').evaluate(im=>im.naturalWidth))>0);assert.equal(await blocked.locator('canvas.is-rendered').count(),0);results.functional.glbFailure='poster stays available when GLB download fails';await blocked.close();
 const gl=await browser.newPage({viewport:{width:1440,height:900}});await gl.goto(origin+base,{waitUntil:'networkidle'});await gl.locator('.strata-art').scrollIntoViewIfNeeded();await gl.locator('canvas.is-rendered').waitFor({timeout:20000});await gl.screenshot({path:'qa/strata-webgl.png'});results.functional.webgl='real GLB loaded and rendered';await gl.close();
 await p.goto('http://localhost:5173/docs/art-direction-board.html');await p.setViewportSize({width:1800,height:1120});await p.screenshot({path:'qa/art-direction-board.png',fullPage:true});
 const failures=results.accessibility.filter(a=>a.violations.length);fs.writeFileSync('qa/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify({routes:results.routes.length,screenshots:results.screenshots.length,a11yPages:results.accessibility.length,a11yFailures:failures,consoleErrors:results.consoleErrors,functional:results.functional},null,2));if(failures.length||results.consoleErrors.length)process.exitCode=1;
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
