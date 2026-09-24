'use strict';
const $ = (selector) => document.querySelector(selector);
const roomData = { classic: {name:'經典房',base:600,max:2}, duplex:{name:'加高房',base:900,max:4} };
const money = (value) => value.toLocaleString('zh-TW');
const roomSelect = $('#calc-room');
const catsSelect = $('#calc-cats');
const checkInInput = $('#calc-checkin');
const checkOutInput = $('#calc-checkout');
const DAY_MS = 86400000;
// Calendar dates, not elapsed local hours: DST and the visitor's timezone must not change the night count.
function dateDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const stamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(stamp) && new Date(stamp).toISOString().slice(0,10) === value ? stamp / DAY_MS : null;
}
function dateAfter(value,days) { return new Date((dateDay(value)+days)*DAY_MS).toISOString().slice(0,10); }
function taipeiToday(now=new Date()) {
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part=type=>parts.find(p=>p.type===type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
function stayDates(today=taipeiToday()) {
  const checkin=checkInInput.value,checkout=checkOutInput.value;
  const start=dateDay(checkin),end=dateDay(checkout);
  if(start===null||end===null) return {valid:false,error:'請選擇入住與退房日期，為您計算住宿晚數。'};
  if(start<dateDay(today)) return {valid:false,error:'入住日期不能早於今天，請重新選擇。',field:checkInInput};
  const nights=end-start;
  if(nights<1) return {valid:false,error:'退房日期須晚於入住日期，至少住宿 1 晚。',field:checkOutInput};
  if(nights>365) return {valid:false,error:'此處可試算最多 365 晚，更長住宿請直接透過 LINE 洽詢。',field:checkOutInput};
  return {valid:true,checkin,checkout,nights};
}
function estimate() {
  const stay=stayDates();
  if(!stay.valid) return null;
  const room = roomData[roomSelect.value];
  const cats = Number(catsSelect.value);
  const {nights,checkin,checkout} = stay;
  const extra = (cats - 1) * 200;
  const total = (room.base + extra) * nights;
  return {room,cats,nights,extra,total,checkin,checkout};
}
function renderEstimate() {
  const today=taipeiToday();
  checkInInput.min=today;
  const selected=dateDay(checkInInput.value);
  const earliest=selected!==null&&checkInInput.value>=today ? checkInInput.value : today;
  checkOutInput.min=dateAfter(earliest,1);
  checkOutInput.max=dateAfter(earliest,365);
  const stay=stayDates(today);
  [checkInInput,checkOutInput].forEach(input=>input.removeAttribute('aria-invalid'));
  $('#date-help').classList.toggle('date-error',Boolean(stay.field));
  if(stay.field) stay.field.setAttribute('aria-invalid','true');
  $('#inquiry-open').disabled=!stay.valid;
  $('#date-help').textContent=stay.valid?`共 ${stay.nights} 晚 · 以入住至退房的日期差計算。`:stay.error;
  if(!stay.valid){$('#calc-breakdown').textContent='選好日期後，即可查看平日住宿估算。';$('#calc-total').textContent='—';return;}
  const {room,cats,nights,extra,total} = estimate();
  $('#calc-breakdown').textContent = extra ? `${room.name}（NT$${money(room.base)} + 加 ${cats - 1} 貓 NT$${money(extra)}）× ${nights} 晚` : `${room.name} NT$${money(room.base)} × ${nights} 晚`;
  $('#calc-total').innerHTML = `NT$ <strong>${money(total)}</strong>`;
}
function changeRoom() {
  const previous = Number(catsSelect.value);
  const maximum = roomData[roomSelect.value].max;
  catsSelect.replaceChildren(...Array.from({length:maximum},(_,i) => new Option(`${i + 1} 隻貓`,String(i + 1))));
  catsSelect.value = String(Math.min(previous,maximum));
  renderEstimate();
}
roomSelect.addEventListener('change',changeRoom);
catsSelect.addEventListener('change',renderEstimate);
[checkInInput,checkOutInput].forEach(input=>{
  input.addEventListener('input',renderEstimate);
  input.addEventListener('change',renderEstimate);
  input.addEventListener('click',()=>{
    // Supported browsers open the calendar when any part of the field is clicked.
    // Native date controls remain available when showPicker is unavailable/restricted.
    if(typeof input.showPicker==='function') { try { input.showPicker(); } catch {} }
  });
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderEstimate();});
document.querySelectorAll('[data-room]').forEach(button=>button.addEventListener('click',()=>{
  roomSelect.value = button.dataset.room;
  changeRoom();
  $('#estimate').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'});
  roomSelect.focus({preventScroll:true});
}));
renderEstimate();

const menuButton = $('.menu-button');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true;menuButton.setAttribute('aria-label','開啟選單');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));$('#mobile-nav').hidden=!open;menuButton.setAttribute('aria-label',open?'關閉選單':'開啟選單');});
$('#mobile-nav').querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!$('.header').contains(event.target))closeMenu();});
matchMedia('(min-width: 851px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const photos = [
  {src:'room-hall.jpg',caption:'木質格柵走廊・希希的日常風景'},
  {src:'room-interior.jpg',caption:'經典房・120 × 120 × 120 cm'},
  {src:'cat-room.jpg',caption:'跳台上的小小探索家'},
  {src:'room-hall2.jpg',caption:'店內實景'},
  {src:'cat-peek.jpg',caption:'小小房客，大大的好奇心'}
];
let currentPhoto=0;
const galleryDialog=$('#gallery-dialog');
function showPhoto(){const photo=photos[currentPhoto];$('#gallery-image').src=photo.src;$('#gallery-image').alt=photo.caption;$('#gallery-caption').textContent=photo.caption;$('#photo-counter').textContent=`${String(currentPhoto+1).padStart(2,'0')} / 05`;}
function openDialog(dialog){dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{currentPhoto=photos.findIndex(photo=>photo.src===button.dataset.photo);showPhoto();openDialog(galleryDialog);}));
$('#gallery-all').addEventListener('click',()=>{currentPhoto=0;showPhoto();openDialog(galleryDialog);});
function stepPhoto(direction){currentPhoto=(currentPhoto+direction+photos.length)%photos.length;showPhoto();}
$('#photo-prev').addEventListener('click',()=>stepPhoto(-1));
$('#photo-next').addEventListener('click',()=>stepPhoto(1));
galleryDialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();stepPhoto(1);}if(event.key==='ArrowLeft'){event.preventDefault();stepPhoto(-1);}});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
});
$('#inquiry-open').addEventListener('click',()=>{
  renderEstimate();
  const result=estimate();
  if(!result)return;
  const {room,cats,nights,total,checkin,checkout}=result;
  $('#inquiry-text').value=`您好，想詢問希希貓旅的空房！\n房型：${room.name}\n貓咪數量：${cats} 隻\n入住日期：${checkin.replaceAll('-','/')}\n退房日期：${checkout.replaceAll('-','/')}\n住宿：${nights} 晚\n平日住宿估算：NT$${money(total)}\n${$('#estimate-disclaimer').textContent}\n再麻煩協助確認房況與實際費用，謝謝！`;
  $('#copy-status').textContent='此步驟僅整理需求，尚未預訂或送出訊息。';
  $('#copy-inquiry').innerHTML='複製詢問內容 <span aria-hidden="true">⧉</span>';
  openDialog($('#inquiry-dialog'));
});
$('#copy-inquiry').addEventListener('click',async()=>{
  const textarea=$('#inquiry-text');
  let success=false;
  try{await navigator.clipboard.writeText(textarea.value);success=true;}catch{
    textarea.focus();textarea.select();
    try{success=document.execCommand('copy');}catch{success=false;}
  }
  $('#copy-status').textContent=success?'已複製！日期與住宿需求已帶入，開啟 LINE 後貼上即可。':'已選取內容，請按 Ctrl+C（Mac：⌘C）複製，再到 LINE 貼上。';
  if(success)$('#copy-inquiry').innerHTML='已複製 <span aria-hidden="true">✓</span>';
});
$('#year').textContent=new Date().getFullYear();

// Conversion events for GA4. The gtag snippet in <head> stays untouched (RULES R5); this only calls it.
function track(name,params){if(typeof gtag==='function')gtag('event',name,params);}
function placeOf(el){
  const zone=el.closest('.announcement,.header,.mobile-dock,.hero,#rooms,#estimate,#booking,#faq,#contact,dialog');
  if(!zone)return 'other';
  return zone.id||zone.classList[0]||zone.tagName.toLowerCase();
}
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link)return;
  const href=link.getAttribute('href');
  if(href.startsWith('https://line.me/'))track('line_click',{link_location:placeOf(link)});
  else if(href.startsWith('tel:'))track('phone_click',{link_location:placeOf(link)});
  else if(href.startsWith('https://maps.google.com/'))track('map_click',{link_location:placeOf(link),link_text:link.textContent.replace('↗','').trim()});
});
$('#inquiry-open').addEventListener('click',()=>track('inquiry_open',{room:roomSelect.value}));
$('#copy-inquiry').addEventListener('click',()=>track('inquiry_copy',{room:roomSelect.value}));
