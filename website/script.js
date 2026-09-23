'use strict';
const $ = (selector) => document.querySelector(selector);
const roomData = { classic: {name:'經典房',base:600,max:2}, duplex:{name:'加高房',base:900,max:4} };
const money = (value) => value.toLocaleString('zh-TW');
const roomSelect = $('#calc-room');
const catsSelect = $('#calc-cats');
const nightsInput = $('#calc-nights');
function normalizeNights() {
  const raw = Number(nightsInput.value);
  return Math.max(1, Math.min(365, Number.isFinite(raw) ? Math.trunc(raw) : 1));
}
function estimate() {
  const room = roomData[roomSelect.value];
  const cats = Number(catsSelect.value);
  const nights = normalizeNights();
  const extra = (cats - 1) * 200;
  const total = (room.base + extra) * nights;
  return {room,cats,nights,extra,total};
}
function renderEstimate() {
  const {room,cats,nights,extra,total} = estimate();
  $('#calc-breakdown').textContent = extra ? `${room.name}（NT$${money(room.base)} + 加 ${cats - 1} 貓 NT$${money(extra)}）× ${nights} 晚` : `${room.name} NT$${money(room.base)} × ${nights} 晚`;
  $('#calc-total').innerHTML = `NT$ <strong>${money(total)}</strong>`;
  $('#minus').disabled = nights <= 1;
  $('#plus').disabled = nights >= 365;
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
nightsInput.addEventListener('input',renderEstimate);
nightsInput.addEventListener('change',()=>{nightsInput.value = normalizeNights();renderEstimate();});
$('#minus').addEventListener('click',()=>{nightsInput.value = Math.max(1,normalizeNights()-1);renderEstimate();});
$('#plus').addEventListener('click',()=>{nightsInput.value = Math.min(365,normalizeNights()+1);renderEstimate();});
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
  nightsInput.value=normalizeNights();
  renderEstimate();
  const {room,cats,nights,total}=estimate();
  $('#inquiry-text').value=`你好，想詢問希希貓旅的空房！\n房型：${room.name}\n貓咪數量：${cats} 隻\n住宿：${nights} 晚\n入住日期：（請填寫）\n平日住宿估算：NT$${money(total)}\n再麻煩協助確認房況與實際費用，謝謝！`;
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
  $('#copy-status').textContent=success?'已複製！開啟 LINE 後貼上，再補上入住日期即可。':'已選取內容，請按 Ctrl+C（Mac：⌘C）複製，再到 LINE 貼上。';
  if(success)$('#copy-inquiry').innerHTML='已複製 <span aria-hidden="true">✓</span>';
});
$('#year').textContent=new Date().getFullYear();
