const fs=require('fs'),path=require('path'),Module=require('module');
const ts=require('typescript');
const originalResolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,...rest){return originalResolve.call(this,request.startsWith('@/')?path.resolve('src',request.slice(2)):request,parent,...rest)};
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
const {getLessonBlocks}=require(path.resolve('src/data/lesson-blocks.ts'));
const apple=getLessonBlocks('apple','banana').find(b=>b.id==='lesson_noun_apple');
const {chromium}=require('/Users/hazutanimasahiro/.npm/_npx/f15a2c6009a805b8/node_modules/playwright');
const base=path.resolve('artifacts/section4-figures');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const page=await browser.newPage({viewport:{width:1800,height:1100},deviceScaleFactor:2});
 await page.goto('http://127.0.0.1:3100/app/sandbox');
 await page.getByRole('button',{name:'サインインせずに使う'}).click();
 await page.waitForSelector('#grid',{state:'attached'});await page.waitForTimeout(800);
 await page.evaluate(apple=>{
  const el=document.querySelector('#svg').parentElement;
  let f=el[Object.keys(el).find(k=>k.startsWith('__reactFiber'))];
  while(f){let h=f.memoizedState,n=0;while(h&&n++<100){const c=h.memoizedState?.current;if(c?.grammar&&c?.blocks)window.r=c;h=h.next;}f=f.return;}
  if(!window.r)throw Error('Renderer not found');
  window.library=Object.values(r.fullBlockList).flat();library.push(apple);
  window.make=(id,name,x=1000,y=420)=>{const b=structuredClone(library.find(b=>b.id===id));if(!b)throw Error('Missing '+id);function ids(b){b.id='fig_'+name+'_'+b.id;for(const c of b.children){delete c.instanceId;if(c.content?.children)ids(c.content)}}ids(b);b.x=x;b.y=y;return b;};
  window.set=(blocks)=>{r.blocks=blocks;r.renderBlocks();};
  window.insert=(source,target,childId)=>{const b=r.findBlock(target).foundBlock;const index=b.children.findIndex(c=>c.id===childId);const preview=r.previewInsertion(source,target,index);if(!preview||!r.validate(preview))throw Error('Invalid insertion '+source+' -> '+target);r.insertBlock(source,target,index);};
  window.attach=(source,target)=>{const preview=r.previewAttachment(source,target,'right');if(!preview||!r.validate(preview))throw Error('Invalid attachment');r.attachBlock(source,target,'right');};
 },apple);
 const manifest={headless:true,viewport:{width:1800,height:1100},deviceScaleFactor:2,frames:[]};
 async function snap(name){await page.mouse.move(1750,1050);await page.waitForTimeout(120);const detail=await page.evaluate(()=>{
  const box=e=>{const b=e.getBoundingClientRect();return{x:b.x,y:b.y,width:b.width,height:b.height}};
  const bounds=[...document.querySelectorAll('#grid > g')].map(box);const x=Math.floor(Math.min(...bounds.map(b=>b.x))-16),y=Math.floor(Math.min(...bounds.map(b=>b.y))-16),right=Math.ceil(Math.max(...bounds.map(b=>b.x+b.width))+16),bottom=Math.ceil(Math.max(...bounds.map(b=>b.y+b.height))+16);
  return {clip:{x,y,width:right-x,height:bottom-y},elements:[...document.querySelectorAll('#grid [id]')].filter(e=>e.id.startsWith('frame-')||e.id.startsWith('placeholder-')||e.id.includes('resolved')).map(e=>({id:e.id,...box(e)})),blocks:r.blocks.map(b=>({id:b.id,valid:r.validate(b),text:r.generateFlatString(b)}))};});
  await page.screenshot({path:path.join(base,'originals',name+'.png'),fullPage:true});
  await page.screenshot({path:path.join(base,'crops',name+'.png'),clip:detail.clip});
  manifest.frames.push({name,...detail});fs.writeFileSync(path.join(base,'manifest.json'),JSON.stringify(manifest,null,2));console.log(name,JSON.stringify(detail.clip),JSON.stringify(detail.blocks));
 }
 await page.evaluate(()=>{const eat=make('eat_verb','eat'),an=make('det_an','an',1580,420),apple=make('lesson_noun_apple','apple');set([eat,an,apple]);insert(apple.id,an.id,'complement');});
 await snap('01-insertion-before');
 await page.evaluate(()=>insert(r.blocks.find(b=>b.id.includes('det_an')).id,r.blocks.find(b=>b.id.includes('eat_verb')).id,'complement-0'));
 await snap('02-insertion-after');
 await page.evaluate(()=>set([make('sleep_verb','sleep')]));await snap('03-sleep');
 await page.evaluate(()=>{const eat=make('eat_verb','eat'),an=make('det_an','an'),apple=make('lesson_noun_apple','apple'),slow=make('adverb_slowly','slow',1850,420);set([eat,an,apple,slow]);insert(apple.id,an.id,'complement');insert(an.id,eat.id,'complement-0');});
 await snap('04-attachment-before');
 await page.evaluate(()=>attach(r.blocks.find(b=>b.id.includes('slowly')).id,r.blocks.find(b=>b.id.includes('eat_verb')).id));await snap('05-attachment-after');
 await page.evaluate(()=>set([make('eat_verb','voice')]));await snap('06-active');
 await page.locator('#grid .block-dropdown').click();await snap('07-voice-menu');
 await page.locator('#option-5-dropdown-0-fig_voice_eat_verb').dispatchEvent('mousedown');await snap('08-passive');
 await page.evaluate(()=>{const q=make('what_question','wh',1000,340),did=make('inverted_do','did',1000,660),you=make('pronoun_you_sg','you'),eat=make('eat_verb','gap');did.children.find(c=>c.id==='head').selected=2;set([q,did,you,eat]);insert(you.id,did.id,'specifier');insert(eat.id,did.id,'complement');});
 await snap('09-gap-before');
 await page.evaluate(()=>insert(r.blocks.find(b=>b.id.includes('inverted_do')).id,r.blocks.find(b=>b.id.includes('what_question')).id,'sentence-complement'));
 await snap('10-gap-after');
 fs.writeFileSync(path.join(base,'states.json'),JSON.stringify(await page.evaluate(()=>r.blocks),null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
