const fs=require('fs'),path=require('path');
const {chromium}=require('/Users/hazutanimasahiro/.npm/_npx/f15a2c6009a805b8/node_modules/playwright');
const base=path.resolve('artifacts/section4-figures');
const manifest=JSON.parse(fs.readFileSync(path.join(base,'manifest.json')));
const frame=n=>manifest.frames.find(f=>f.name===n);
function shot(n,x,y,s=1.4){const f=frame(n);return `<img alt="${n}" style="position:absolute;left:${x}px;top:${y}px;width:${f.clip.width*s}px;height:${f.clip.height*s}px" src="data:image/png;base64,${fs.readFileSync(path.join(base,'crops',n+'.png')).toString('base64')}">`;}
function txt(t,x,y,w=1000,cls=''){return `<div class="label ${cls}" style="left:${x}px;top:${y}px;width:${w}px">${t}</div>`}
function svg(content,h){return `<svg width="1200" height="${h}" style="position:absolute;inset:0;pointer-events:none"><defs><marker id="arr" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="#236c78" stroke-width="1.6"/></marker></defs>${content}</svg>`}
function line(d){return `<path d="${d}" fill="none" stroke="#236c78" stroke-width="2.5" marker-end="url(#arr)"/>`}
function ring(x,y,w,h){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="none" stroke="#236c78" stroke-width="2.5" stroke-dasharray="7 5"/>`}
function wrap(title,sub,body,h){return `<!doctype html><html lang="ja"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:white;color:#182c37;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Kaku Gothic ProN',sans-serif}.figure{position:relative;width:1200px;height:${h}px;background:#fff}.title{position:absolute;left:40px;top:27px;font-size:27px;font-weight:700}.subtitle{position:absolute;left:40px;top:69px;font-size:18px;color:#52616a}.label{position:absolute;font-size:21px;line-height:1.65}.small{font-size:18px;color:#52616a}.strong{font-weight:700}.teal{color:#236c78}.step{font-size:19px;font-weight:700;color:#236c78}.note{position:absolute;left:40px;bottom:20px;font-size:15px;color:#63727b;border-top:1px solid #dce2e5;padding-top:12px;width:1120px}</style><div class="figure"><div class="title">${title}</div><div class="subtitle">${sub}</div>${body}<div class="note">Syntabloの実画面を切り抜いて配置。見出し・説明・矢印・破線は説明のための加筆。</div></div></html>`}
const figures=[];
figures.push({id:'figure-01-insertion',title:'図1　空所挿入',h:590,html:wrap('図1　空所挿入','動詞の目的語位置に、名詞句のブロックを挿入する。',
 txt('① 挿入前',40,123,500,'step')+txt('② 挿入後',795,123,350,'step')+
 shot('01-insertion-before',35,164,1.3)+shot('02-insertion-after',790,164,1.3)+
 txt('目的語の空所',65,328,290,'teal')+txt('an apple が空所に入る',805,328,340)+
 txt('比較：sleep',40,401,240,'step')+shot('03-sleep',220,375,1.3)+txt('目的語の空所がないため、同じ挿入操作はできない。',430,424,720)+
 svg(ring(148,241,72,54)+line('M 122 335 L 175 303')+line('M 652 266 L 770 266'),590),590)});
figures.push({id:'figure-02-attachment',title:'図2　非空所アタッチ',h:650,html:wrap('図2　非空所アタッチ','修飾語は、目的語の空所を埋めずに動詞句に結合する。',
 txt('① アタッチ前',40,123,400,'step')+shot('04-attachment-before',100,162,1.4)+
 txt('② アタッチ後',40,367,400,'step')+shot('05-attachment-after',100,409,1.4)+
 txt('slowly が動詞句に結合する。<br>an apple は目的語の位置に保たれる。',700,440,455)+
 svg(line('M 715 277 C 670 335, 557 363, 515 488')+ring(448,498,132,55),650),650)});
figures.push({id:'figure-03-voice',title:'図3　語形と空所の連動',h:700,html:wrap('図3　語形と空所の連動','受動態用の形を選ぶと、目的語に対応していた空所が表示されなくなる。',
 txt('① 能動態用の形',45,123,310,'step')+txt('② 語形を選択',455,123,310,'step')+txt('③ 受動態用の形',870,123,310,'step')+
 shot('06-active',40,170,1.3)+shot('07-voice-menu',450,170,1.3)+shot('08-passive',865,170,1.3)+
 txt('目的語の空所がある',40,349,340)+txt('この eaten を選択',680,506,420,'teal')+txt('目的語の空所がない',865,349,320)+
 txt('同じ綴りの eaten が2か所にあるが、ここでは下段の受動態用を選択している。',40,573,1120,'small')+
 svg(line('M 280 271 L 407 271')+line('M 692 271 L 832 271')+ring(475,509,94,39)+line('M 668 524 L 575 529'),700),700)});
figures.push({id:'figure-04-gap-filling',title:'図4　GAPとFILLERの対応',h:1080,html:wrap('図4　GAPとFILLERの対応','画面上の挿入先の空所と、挿入する節の内部にあるGAPを区別する。',
 txt('① 接続前',40,120,400,'step')+shot('09-gap-before',40,164,1.4)+
 txt('FILLER：What',705,209,440,'strong teal')+txt('FILLERを置く空所には、<br>What がすでに入っている。',705,252,440)+
 txt('GAPを含む節の挿入先',705,347,440,'strong teal')+txt('この空所は、目的語に対応する<br>GAPを含む節を要求する。',705,390,440)+
 txt('GAP：eat の目的語位置',705,490,440,'strong teal')+
 txt('② 接続後：What did you eat?',40,627,1090,'step')+shot('10-gap-after',40,674,1.4)+
 txt('FILLER',140,875,250,'strong teal')+txt('解決済みのGAP',520,875,400,'strong teal')+
 txt('What と目的語のGAPが対応付けられ、空所は小さな丸の表示に変わる。',40,957,1120)+
 svg(ring(117,247,116,59)+ring(242,247,78,59)+ring(435,475,78,59)+
 line('M 691 230 L 651 230 L 651 182 L 171 182 L 171 242')+
 line('M 691 372 L 630 372 L 630 323 L 280 323 L 280 308')+
 line('M 691 511 L 522 511')+
 line('M 146 822 L 146 858 L 580 858 L 580 802'),1080),1080)});
(async()=>{const browser=await chromium.launch({headless:true});try{for(const f of figures){fs.writeFileSync(path.join(base,'figures',f.id+'.html'),f.html);const page=await browser.newPage({viewport:{width:1200,height:f.h},deviceScaleFactor:2});await page.setContent(f.html);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(base,'figures',f.id+'.png')});await page.close();console.log(f.id);}}finally{await browser.close()}
fs.writeFileSync(path.join(base,'index.html'),`<!doctype html><html lang="ja"><meta charset="utf-8"><title>Syntablo セクション4 挿入図</title><style>body{font-family:sans-serif;max-width:1200px;margin:32px auto;padding:0 24px;color:#182c37}img{width:100%;height:auto;border:1px solid #ddd}p{line-height:1.8}a{color:#236c78}</style><h1>Syntablo セクション4 挿入図</h1><p>ヘッドレスChromiumで撮影。元画像は originals、切り抜きは crops、注釈付き図は figures に保存しています。</p>${figures.map(f=>`<h2>${f.title}</h2><p><a href="figures/${f.id}.png">PNG</a> · <a href="figures/${f.id}.html">編集用HTML</a></p><img src="figures/${f.id}.png">`).join('')}<h2>撮影原本と切り抜き</h2><ul>${manifest.frames.map(f=>`<li>${f.name}：<a href="originals/${f.name}.png">元画像</a> · <a href="crops/${f.name}.png">切り抜き</a></li>`).join('')}</ul></html>`);
})().catch(e=>{console.error(e);process.exit(1)});
