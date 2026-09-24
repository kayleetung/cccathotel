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
assert(html.includes('2026.09.24-04'));
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
function element(value=''){return{value,disabled:false,textContent:'',innerHTML:'',classList:{toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},replaceChildren(...options){this.options=options;},focus(){}};}
const nodes={'#calc-room':element('classic'),'#calc-cats':element('1'),'#calc-checkin':element(),'#calc-checkout':element(),'#calc-breakdown':element(),'#calc-total':element(),'#date-help':element(),'#inquiry-open':element()};
const context=vm.createContext({document:{querySelector:s=>nodes[s],querySelectorAll:()=>[],addEventListener(){}},Option:function(text,value){this.text=text;this.value=value;}});
vm.runInContext(script.split('const menuButton')[0],context);
// Fix only the clock; exercise the actual calendar parsing, constraints and pricing code.
vm.runInContext("taipeiToday=()=> '2026-09-24'",context);
assert.equal(nodes['#inquiry-open'].disabled,true);
let cases=0;
for(const [room,base,max] of [['classic',600,2],['duplex',900,4]]){
 nodes['#calc-room'].value=room;vm.runInContext('changeRoom()',context);assert.equal(nodes['#calc-cats'].options.length,max);
 for(let cats=1;cats<=max;cats++)for(const nights of [1,2,7,30,365]){nodes['#calc-cats'].value=String(cats);nodes['#calc-checkin'].value='2026-09-24';nodes['#calc-checkout'].value=new Date(Date.UTC(2026,8,24+nights)).toISOString().slice(0,10);assert.equal(vm.runInContext('estimate().total',context),(base+(cats-1)*200)*nights);cases++;}
}
nodes['#calc-room'].value='classic';nodes['#calc-cats'].value='4';vm.runInContext('changeRoom()',context);assert.equal(nodes['#calc-cats'].value,'2');
for(const [start,end,nights] of [['2026-09-30','2026-10-02',2],['2026-12-31','2027-01-02',2],['2028-02-28','2028-03-01',2],['2027-03-13','2027-03-15',2],['2026-10-31','2026-11-02',2]]){nodes['#calc-checkin'].value=start;nodes['#calc-checkout'].value=end;assert.equal(vm.runInContext('estimate().nights',context),nights);cases++;}
for(const [start,end] of [['',''],['2026-09-24',''],['','2026-09-25'],['2026-09-24','2026-09-24'],['2026-09-25','2026-09-24'],['2026-09-23','2026-09-25'],['2026-09-24','2027-09-25'],['2027-02-29','2027-03-01'],['bad','2027-03-01']]){nodes['#calc-checkin'].value=start;nodes['#calc-checkout'].value=end;vm.runInContext('renderEstimate()',context);assert.equal(vm.runInContext('estimate()',context),null);assert.equal(nodes['#inquiry-open'].disabled,true);assert.equal(nodes['#calc-total'].textContent,'—');cases++;}
nodes['#calc-checkin'].value='2026-12-31';nodes['#calc-checkout'].value='2027-01-02';vm.runInContext('renderEstimate()',context);assert.equal(nodes['#inquiry-open'].disabled,false);assert.equal(nodes['#calc-checkout'].min,'2027-01-01');assert.equal(nodes['#calc-checkout'].max,'2027-12-31');
console.log(`PASS: original SEO/GA/robots and images; 9 FAQ pairs; local resources/anchors; ${cases} date/pricing cases, capacity switch, date limits and invalid-date inquiry protection.`);
