const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/reel.html');await p.waitForFunction(()=>window.ready===true,{timeout:20000});
const fs=require('fs');fs.mkdirSync(__dirname+'/beats',{recursive:true});
for(let i=0;i<30;i++){const t=i*0.5+0.42;await p.evaluate(t=>seek(t),t);await p.screenshot({path:`${__dirname}/beats/b${String(i).padStart(2,'0')}.jpg`,type:'jpeg',quality:80});}
console.log('errors',errs);await b.close();})();
