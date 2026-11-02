const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
const Axe=require('/workspace/qa-tools/node_modules/@axe-core/playwright').default;
const assert=require('node:assert/strict'),fs=require('fs');
const base=process.env.QA_BASE_URL||'http://localhost:4173/';
const out=process.env.QA_OUTPUT_DIR||'docs/observation';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const result={base,views:[],errors:[]};
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox'],...(base.startsWith('https:')?{proxy:{server:process.env.HTTPS_PROXY||process.env.HTTP_PROXY}}:{})});
 try {
  for(const width of [1440,390]){
   const context=await browser.newContext({viewport:{width,height:900},ignoreHTTPSErrors:true,reducedMotion:'reduce'});const page=await context.newPage();
   page.on('pageerror',e=>result.errors.push(e.message));
   await page.goto(base+'platform/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   const film=page.locator(process.env.QA_CAPTURE_BEFORE?'.parcel-study':'.observation-film');
   await film.scrollIntoViewIfNeeded();await page.waitForTimeout(300);
   await film.screenshot({path:out+`/${process.env.QA_CAPTURE_BEFORE?'before':'after'}-platform-${width}.jpg`});
   if(process.env.QA_CAPTURE_BEFORE){await context.close();continue;}
   assert.equal(await page.locator('video source[src]').count(),0,'reduced motion fetched video');
   assert.equal(await page.locator('[data-desktop*="revision1/parcel"]').count(),0,'old maquette still selected');
   assert.equal(await film.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0),true);
   for(let i=0;i<3;i++){
    await page.locator('.evidence-controls button').nth(i).click();
    assert.equal(await page.locator('.evidence-controls button').nth(i).getAttribute('aria-pressed'),'true');
   }
   assert.deepEqual((await new Axe({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await page.goto(base+'teknoloji/',{waitUntil:'networkidle'});
   for(let i=0;i<3;i++){
    await page.locator('.quality-controls button').nth(i).click();
    assert.equal(await page.locator('.quality-controls button').nth(i).getAttribute('aria-pressed'),'true');
   }
   await page.locator('.quality-study').screenshot({path:out+`/after-technology-${width}.jpg`});
   assert.deepEqual((await new Axe({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.equal(await page.locator('video source[src]').count(),0);
   await context.close();
   const normal=await browser.newContext({viewport:{width,height:900},ignoreHTTPSErrors:true});const p=await normal.newPage();p.on('pageerror',e=>result.errors.push(e.message));
   await p.goto(base+'platform/');await p.locator('.observation-film').scrollIntoViewIfNeeded();
   await p.waitForFunction(()=>{const v=document.querySelector('.observation-film video');return v.readyState>=2&&!v.paused});
   assert.deepEqual((await new Axe({page:p}).include('.observation-film').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v=>v.id),[]);
   const v=p.locator('.observation-film video');assert.equal(await v.evaluate(v=>v.loop),false);
   await p.locator('.observation-timeline button').nth(2).click();
   await p.waitForFunction(()=>document.querySelector('.observation-film-copy>span').textContent.startsWith('03'));
   await p.locator('.observation-timeline button').nth(0).click();
   await p.waitForFunction(()=>document.querySelector('.observation-film-copy>span').textContent.startsWith('01'));
   assert((await v.evaluate(v=>v.currentSrc)).includes(width<768?'harvest-mobile':'harvest.'));
   for(const [time,beat] of [[1,'01'],[8,'02'],[14,'03']]){
    await v.evaluate((v,t)=>{v.currentTime=t},time);
    await p.waitForFunction(n=>document.querySelector('.observation-film-copy>span').textContent.startsWith(n),beat);
   }
   await v.evaluate(v=>{v.currentTime=v.duration-.3});await p.waitForFunction(()=>document.querySelector('.observation-film video').ended);
   await p.locator('.observation-film .film-toggle').click();await p.waitForFunction(()=>{const v=document.querySelector('.observation-film video');return !v.paused&&v.currentTime<3});
   await p.locator('.observation-film .film-toggle').click();assert(await v.evaluate(v=>v.paused));
   await p.locator('.observation-film .film-toggle').click();await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);assert(await v.evaluate(v=>v.paused));
   if(width===1440){
    for(const i of [2,0]){
     await p.locator(`[data-evidence="${i}"]`).evaluate(el=>el.scrollIntoView({block:'center'}));
     await p.waitForFunction(i=>document.querySelectorAll('.evidence-controls button')[i].getAttribute('aria-pressed')==='true',i);
    }
   }
   await p.goto(base+'teknoloji/');await p.locator('.quality-study').scrollIntoViewIfNeeded();
   await p.waitForFunction(()=>{const v=document.querySelector('.quality-study video');return v.readyState>=2&&!v.paused});
   assert((await p.locator('.quality-study video').evaluate(v=>v.currentSrc)).includes(width<768?'wind-mobile':'wind.'));
   result.views.push({width,reducedMotionPoster:true,axe:0,interactions:true,threeMovieActs:true,chapterNavigation:true,replay:true,pause:true,offscreenPause:true,scrollReversible:width===1440,windPlayback:true});
   await normal.close();
  }
  if(!process.env.QA_CAPTURE_BEFORE){
   const c=await browser.newContext({viewport:{width:390,height:900},ignoreHTTPSErrors:true});const p=await c.newPage();
   await p.route('**/media/observation/*.webm',r=>r.abort());await p.goto(base+'platform/');await p.locator('.observation-film').scrollIntoViewIfNeeded();
   await p.waitForFunction(()=>{const v=document.querySelector('.observation-film video');return v.readyState>=2&&!v.paused&&v.currentSrc.endsWith('.mp4')});result.mp4Fallback=true;await c.close();
   const f=await browser.newContext({viewport:{width:390,height:900},ignoreHTTPSErrors:true});const q=await f.newPage();
   await q.route('**/media/observation/*.mp4',r=>r.abort());await q.route('**/media/observation/*.webm',r=>r.abort());await q.goto(base+'platform/');await q.locator('.observation-film').scrollIntoViewIfNeeded();await q.waitForTimeout(800);
   assert.equal(await q.locator('.observation-film img').evaluate(i=>i.complete&&i.naturalWidth>0),true);assert.equal(await q.locator('.observation-film .film-ready').count(),0);result.mediaFailurePoster=true;await f.close();
   assert.deepEqual(result.errors,[]);
  }
 }finally{await browser.close();fs.writeFileSync(out+`/${process.env.QA_CAPTURE_BEFORE?'baseline':'tests'}.json`,JSON.stringify(result,null,2))}
 console.log(JSON.stringify(result));
})().catch(e=>{console.error(e);process.exit(1)});
