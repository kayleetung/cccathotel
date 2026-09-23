const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const {execFileSync} = require('child_process');
const root = path.resolve(__dirname,'..');
const site = path.join(root,'website');
const baseline = '772c285c915085d48df8641d439c18f29a4342db';
const old = execFileSync('git',['show',`${baseline}:website/index.html`],{cwd:root,encoding:'utf8'});
const html = fs.readFileSync(path.join(site,'index.html'),'utf8');
const script = fs.readFileSync(path.join(site,'script.js'),'utf8');
const match = (s,r) => {const m=s.match(r);assert(m,`Missing ${r}`);return m[0];};
assert.equal(match(html,/<title>.*?<\/title>/),match(old,/<title>.*?<\/title>/));
for(const m of old.matchAll(/<meta\s+(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>/g))assert(html.includes(m[0]),`SEO changed: ${m[0]}`);
assert.equal(match(html,/<link rel="canonical"[^>]*>/),match(old,/<link rel="canonical"[^>]*>/));
const ga=match(old,/<!-- Google tag \(gtag.js\) -->[\s\S]*?<\/script>\s*<script>[\s\S]*?<\/script>/);
assert(html.includes(ga),'Original GA block must remain verbatim');
assert(!/noindex|analytics\.js|assets\/|aggregateRating/.test(html));
assert(!html.includes('牠'));
assert(html.includes('2026.09.23-01'));
assert(html.trimEnd().endsWith('</html>'));
assert.equal((html.match(/<h1\b/g)||[]).length,1);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size);
for(const id of ['rooms','photoStrip','faqList','info'])assert(ids.includes(id));
for(const [,attr,url] of html.matchAll(/\b(src|href)="([^"]+)"/g)){
 if(url.startsWith('#')){if(url.length>1)assert(ids.includes(url.slice(1)),`Broken anchor ${url}`);continue;}
 if(/^(https?:|tel:)/.test(url)){if(attr==='src')assert(url==='https://www.googletagmanager.com/gtag/js?id=G-2KLHF5VMVZ');continue;}
 assert(fs.existsSync(path.join(site,url.split('?')[0])),`Missing ${url}`);
}
for(const m of html.matchAll(/<img\b([^>]+)>/g))assert(/\balt="[^"]*"/.test(m[1]));
const schemas=s=>[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const oldBusiness=schemas(old).find(s=>s['@type']==='LocalBusiness');
const business=schemas(html).find(s=>s['@type']==='LocalBusiness');
for(const [key,val] of Object.entries(oldBusiness))if(key!=='geo')assert.deepEqual(business[key],val,`Business field ${key}`);
assert(!business.geo);
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const faq=schemas(html).find(s=>s['@type']==='FAQPage').mainEntity;
const visible=[...html.matchAll(/<details><summary>(.*?)<\/summary><div>([\s\S]*?)<\/div><\/details>/g)];
assert.equal(faq.length,9);assert.equal(visible.length,9);
visible.forEach((m,i)=>{assert.equal(faq[i].name,plain(m[1]));assert.equal(faq[i].acceptedAnswer.text,plain(m[2]));});
assert.equal(fs.readFileSync(path.join(site,'robots.txt'),'utf8').replace(/\r\n/g,'\n'),execFileSync('git',['show',`${baseline}:website/robots.txt`],{cwd:root,encoding:'utf8'}).replace(/\r\n/g,'\n'));
for(const name of ['logo.jpg','cat-peek.jpg','cat-room.jpg','room-interior.jpg','room-hall.jpg','room-hall2.jpg'])assert(fs.readFileSync(path.join(site,name)).equals(execFileSync('git',['show',`${baseline}:website/${name}`],{cwd:root})));
function element(value=''){return{value,disabled:false,textContent:'',innerHTML:'',addEventListener(){},replaceChildren(...options){this.options=options;},focus(){}};}
const nodes={'#calc-room':element('classic'),'#calc-cats':element('1'),'#calc-nights':element('1'),'#calc-breakdown':element(),'#calc-total':element(),'#minus':element(),'#plus':element()};
const context=vm.createContext({document:{querySelector:s=>nodes[s],querySelectorAll:()=>[]},Option:function(text,value){this.text=text;this.value=value;}});
vm.runInContext(script.split('const menuButton')[0],context);
let cases=0;
for(const [room,base,max] of [['classic',600,2],['duplex',900,4]]){
 nodes['#calc-room'].value=room;vm.runInContext('changeRoom()',context);assert.equal(nodes['#calc-cats'].options.length,max);
 for(let cats=1;cats<=max;cats++)for(const nights of [1,2,7,30,365]){nodes['#calc-cats'].value=String(cats);nodes['#calc-nights'].value=String(nights);assert.equal(vm.runInContext('estimate().total',context),(base+(cats-1)*200)*nights);cases++;}
}
nodes['#calc-room'].value='classic';nodes['#calc-cats'].value='4';vm.runInContext('changeRoom()',context);assert.equal(nodes['#calc-cats'].value,'2');
for(const [input,want] of [['',1],['0',1],['-20',1],['1.9',1],['900',365],['abc',1]]){nodes['#calc-nights'].value=input;assert.equal(vm.runInContext('normalizeNights()',context),want);cases++;}
console.log(`PASS: original title/meta/canonical/GA/robots preserved; six original images identical; business fields preserved except documented geo omission; 9 FAQ pairs; local resources/anchors; ${cases} calculator cases and capacity switch.`);
