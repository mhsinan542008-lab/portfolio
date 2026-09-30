(() => {
const PHOTOS = [
  {id:'p02',t:'Eye to Eye',c:'reptiles',w:896,h:1600,n:'A garden lizard clings to a stem and turns one golden eye toward the lens.'},
  {id:'p29',t:'Passion Flower',c:'flora',w:1200,h:1600,n:'Purple-ringed filaments of a passion flower against a clear morning sky.'},
  {id:'p18',t:'Green Beetle',c:'bugs',w:1560,h:1248,n:'A metallic green beetle lifts one leg mid-stride across a sunlit orange floor.'},
  {id:'p20',t:'Full Moon',c:'night',w:1595,h:1600,n:'Craters and maria of a full moon, shot handheld on a clear night.'},
  {id:'p12',t:'Emerald Fly',c:'bugs',w:1560,h:1103,n:'A tiny metallic long-legged fly resting on a blade of green leaf.'},
  {id:'p25',t:'Allamanda After Rain',c:'flora',w:1200,h:1600,n:'Rain beads on the curled petal of a yellow allamanda.'},
  {id:'p09',t:'Jumping Spider',c:'bugs',w:1600,h:1065,n:'A jumping spider peers over the edge of a leaf, red ixora blurred behind.'},
  {id:'p31',t:'Low Light Fly',c:'bugs',w:1200,h:1600,n:'A house fly on the edge of a leaf, lit by the last of the evening.'},
  {id:'p01',t:'Cypress Vine',c:'flora',w:896,h:1600,n:'A single red star-shaped bloom among thread-thin cypress vine leaves.'},
  {id:'p03',t:'After the Rain',c:'flora',w:1200,h:1600,n:'Droplets gathered on a dark serrated leaf.'},
  {id:'p04',t:'Afternoon Rest',c:'reptiles',w:1025,h:1600,n:'A young lizard stretched out along a flowering stem.'},
  {id:'p05',t:'Dayflower Blue',c:'flora',w:1018,h:1600,n:'Small blue dayflowers tucked among ribbed green leaves.'},
  {id:'p07',t:'The Climber',c:'reptiles',w:896,h:1600,n:'A lizard wraps itself around a thin stem beneath white flower buds.'},
  {id:'p11',t:'Fly on a Wire',c:'bugs',w:1200,h:1600,n:'A red-eyed fly balancing on a black cable.'},
  {id:'p13',t:'Wings Open',c:'bugs',w:1600,h:1280,n:'A brown butterfly spreads its wings across three fingertips.'},
  {id:'p14',t:'Hanging Buds',c:'flora',w:1200,h:1600,n:'A curved stem lets its green buds dangle against a dark background.'},
  {id:'p15',t:'Fly at Dusk',c:'bugs',w:1548,h:1106,n:'A house fly on a wet leaf with a pink evening sky behind.'},
  {id:'p16',t:'Ant Trail',c:'bugs',w:1599,h:1599,n:'Orange ants crossing rough ground, shot from their eye level.'},
  {id:'p17',t:'Ixora Buds',c:'flora',w:1560,h:1248,n:'A cluster of red ixora buds catching late sun.'},
  {id:'p19',t:'Stars Over Palms',c:'night',w:1600,h:1598,n:'A deep blue sky full of stars above a coconut palm.'},
  {id:'p21',t:'Yellow Allamanda',c:'flora',w:1200,h:1600,n:'A rain-wet allamanda flower opening in the garden.'},
  {id:'p22',t:'Fingertip Visitor',c:'bugs',w:1560,h:1248,n:'A tiny orange insect perched on the tip of a finger.'},
  {id:'p23',t:'White Bougainvillea',c:'flora',w:1200,h:1600,n:'Papery white bougainvillea bracts spilling over a garden wall.'},
  {id:'p24',t:'In the Palm',c:'bugs',w:1200,h:1600,n:'A butterfly rests with folded wings in an open hand.'},
  {id:'p27',t:'Pink Ixora',c:'flora',w:1200,h:1600,n:'A round head of pink ixora flowers in soft evening light.'},
  {id:'p28',t:'Ixora in Bloom',c:'flora',w:1200,h:1600,n:'Red ixora opening from bud, framed by glossy leaves.'},
  {id:'p30',t:'Silhouette',c:'flora',w:1600,h:738,n:'Leaves and blossoms in silhouette against a bright cloudy sky.'}
];
const REEL = ['p02','p29','p18','p20','p12','p25','p09','p31'];
const CATS = {all:'All',bugs:'Bugs',flora:'Flora',reptiles:'Reptiles',night:'Night sky'};
const byId = Object.fromEntries(PHOTOS.map((p,i)=>[p.id,{...p,i}]));
const pad = n => String(n).padStart(2,'0');
const full = p => `img/${p.id}.jpg`, thumb = p => `t/${p.id}.jpg`;
const RATIOS=[[1,1],[4,5],[3,4],[2,3],[9,16],[5,4],[4,3],[3,2],[16,9],[2,1]];
const ratio = p => { const r=p.w/p.h; let b=RATIOS[0],d=9; for(const q of RATIOS){const e=Math.abs(q[0]/q[1]-r); if(e<d){d=e;b=q}} return b.join(':'); };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const hasGsap = typeof gsap !== 'undefined';
const $ = s => document.querySelector(s);

/* ---------- grain ---------- */
(() => { const c=document.createElement('canvas'), x=c.getContext('2d'); c.width=c.height=180; const d=x.createImageData(180,180);
  for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255; d.data[i]=d.data[i+1]=d.data[i+2]=v; d.data[i+3]=255} x.putImageData(d,0,0);
  $('#grain').style.backgroundImage=`url(${c.toDataURL()})`; })();

/* ---------- clock ---------- */
const clock=$('#clock');
const tick=()=>{ try{ clock.textContent='India · '+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date())+' IST'; }catch(e){} };
tick(); setInterval(tick,1000);

/* ---------- build reel ---------- */
const reelTrack=$('#reelTrack');
REEL.forEach((id,k)=>{ const p=byId[id];
  const f=document.createElement('figure'); f.className='reel-card'; f.dataset.idx=p.i; f.dataset.cursor='View'; f.tabIndex=0;
  f.setAttribute('role','button'); f.setAttribute('aria-label','Open '+p.t);
  f.innerHTML=`<div class="frame" style="aspect-ratio:${p.w}/${p.h}"><img src="${full(p)}" alt="${p.n}" loading="${k<3?'eager':'lazy'}"></div>
  <figcaption class="mono"><span><b>${pad(k+1)}</b>&nbsp;&nbsp;${p.t}</span><span>${CATS[p.c]} · ${ratio(p)}</span></figcaption>`;
  reelTrack.appendChild(f);
});
const end=document.createElement('div'); end.className='reel-end';
end.innerHTML=`<h3>Nineteen<br>more in the<br>library</h3><a class="btn" href="#library" data-scroll>Open the library <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`;
reelTrack.appendChild(end);

/* ---------- build library ---------- */
const grid=$('#grid'), index=$('#index'), filters=$('#filters');
PHOTOS.forEach((p,i)=>{
  const r=p.w/p.h, cls = r<0.9?'tall':(r>1.3?'wide':'');
  const el=document.createElement('figure'); el.className='tile '+cls; el.dataset.cat=p.c; el.dataset.idx=i; el.dataset.cursor='View';
  el.tabIndex=0; el.setAttribute('role','button'); el.setAttribute('aria-label','Open '+p.t);
  el.innerHTML=`<div class="in"><img src="${thumb(p)}" alt="${p.n}" loading="lazy"></div><span class="num mono">${pad(i+1)}</span>
  <figcaption class="cap"><b>${p.t}</b><span class="mono">${CATS[p.c]}</span></figcaption>`;
  grid.appendChild(el);
  const li=document.createElement('li'); li.dataset.cat=p.c;
  li.innerHTML=`<button type="button" data-idx="${i}" data-thumb="${thumb(p)}"><span class="mono">FR ${pad(i+1)}</span><span class="t">${p.t}</span><span class="mono hide-s">${CATS[p.c]}</span><span class="mono hide-s">${ratio(p)}</span></button>`;
  index.appendChild(li);
});
const counts = PHOTOS.reduce((a,p)=>(a[p.c]=(a[p.c]||0)+1,a),{all:PHOTOS.length});
Object.keys(CATS).forEach(k=>{ const b=document.createElement('button'); b.type='button'; b.className='chip'; b.dataset.f=k;
  b.setAttribute('aria-pressed',k==='all'); b.innerHTML=`${CATS[k]} <small>${pad(counts[k])}</small>`; filters.appendChild(b); });
$('#series').innerHTML=['bugs','flora','reptiles','night'].map(k=>`<div><b>${pad(counts[k])}</b><span class="mono">${CATS[k]}</span></div>`).join('');

let current='all';
filters.addEventListener('click',e=>{ const b=e.target.closest('.chip'); if(!b||b.dataset.f===current) return;
  current=b.dataset.f; filters.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c===b));
  const tiles=[...grid.children]; const show=el=>current==='all'||el.dataset.cat===current;
  const state = (hasGsap && window.Flip && !reduce) ? Flip.getState(tiles) : null;
  tiles.forEach(el=>el.style.display=show(el)?'':'none');
  [...index.children].forEach(el=>el.style.display=show(el)?'':'none');
  $('#libCount').textContent=pad(counts[current]);
  if(state){ Flip.from(state,{duration:.7,ease:'power3.inOut',absolute:true,scale:true,
      onEnter:els=>gsap.fromTo(els,{opacity:0,scale:.85},{opacity:1,scale:1,duration:.6,delay:.1}),
      onLeave:els=>gsap.to(els,{opacity:0,scale:.85,duration:.35}),
      onComplete:()=>window.ScrollTrigger&&ScrollTrigger.refresh()}); }
  else if(window.ScrollTrigger) ScrollTrigger.refresh();
});
const setView=v=>{ $('#vGrid').setAttribute('aria-pressed',v==='grid'); $('#vIndex').setAttribute('aria-pressed',v==='index');
  grid.classList.toggle('off',v!=='grid'); index.classList.toggle('on',v==='index'); window.ScrollTrigger&&ScrollTrigger.refresh();
  try{localStorage.setItem('ms-view',v)}catch(e){} };
$('#vGrid').onclick=()=>setView('grid'); $('#vIndex').onclick=()=>setView('index');
try{ if(localStorage.getItem('ms-view')==='index') setView('index') }catch(e){}

/* tile tilt */
if(fine && !reduce) grid.addEventListener('pointermove',e=>{ const t=e.target.closest('.tile'); if(!t) return;
  const r=t.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  t.querySelector('.in').style.transform=`rotateY(${x*6}deg) rotateX(${-y*6}deg)`; });
grid.addEventListener('pointerout',e=>{ const t=e.target.closest('.tile'); if(t && !t.contains(e.relatedTarget)) t.querySelector('.in').style.transform=''; });

/* index hover preview */
const prev=$('#preview'), prevImg=$('#previewImg'); let pv={x:0,y:0,tx:0,ty:0,on:false};
if(fine){
  index.addEventListener('pointerover',e=>{ const b=e.target.closest('button'); if(!b) return; prevImg.src=b.dataset.thumb; pv.on=true; prev.style.opacity=1; });
  index.addEventListener('pointerleave',()=>{ pv.on=false; prev.style.opacity=0; });
}

/* ---------- cursor ---------- */
const cur=$('#cursor'), ring=cur.querySelector('.ring'), dot=cur.querySelector('.dot'), label=$('#cursorLabel');
const m={x:innerWidth/2,y:innerHeight/2}, rp={x:m.x,y:m.y};
if(fine){ document.body.classList.add('has-cursor'); }
addEventListener('pointermove',e=>{ m.x=e.clientX; m.y=e.clientY; pv.tx=e.clientX; pv.ty=e.clientY; });
document.addEventListener('pointerover',e=>{ const t=e.target.closest('[data-cursor]'); if(t){ label.textContent=t.dataset.cursor; cur.classList.add('is-label'); } else cur.classList.remove('is-label'); });
document.addEventListener('pointerleave',()=>cur.style.opacity=0); document.addEventListener('pointerenter',()=>cur.style.opacity=1);
let lastPx=0;
function loop(){
  rp.x+=(m.x-rp.x)*.18; rp.y+=(m.y-rp.y)*.18;
  dot.style.transform=`translate(${m.x}px,${m.y}px) translate(-50%,-50%)`;
  ring.style.transform=`translate(${rp.x}px,${rp.y}px) translate(-50%,-50%)`;
  const vx=pv.tx-pv.x; pv.x+=vx*.14; pv.y+=(pv.ty-pv.y)*.14;
  prev.style.transform=`translate(${pv.x}px,${pv.y}px) translate(-50%,-50%) rotate(${Math.max(-12,Math.min(12,vx*.15))}deg)`;
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ---------- hero trail ---------- */
const hero=$('#hero'), trail=$('#trail');
const POOL=14, pool=[]; let pi=0, ti=0, z=1, lastT={x:-999,y:-999};
for(let i=0;i<POOL;i++){ const im=new Image(); im.alt=''; im.decoding='async'; trail.appendChild(im); pool.push(im); }
const order=[...PHOTOS].sort(()=>Math.random()-.5);
function spawn(x,y){
  const im=pool[pi++%POOL], p=order[ti++%order.length]; im.src=thumb(p); im.style.zIndex=z++;
  const w=im.offsetWidth||200, h=w*p.h/p.w;
  if(!hasGsap){ im.style.transition='opacity .8s'; im.style.opacity=1; im.style.transform=`translate(${x-w/2}px,${y-h/2}px)`; clearTimeout(im._t); im._t=setTimeout(()=>im.style.opacity=0,1100); return; }
  gsap.killTweensOf(im);
  gsap.timeline()
    .set(im,{x:x-w/2,y:y-h/2,opacity:1,scale:.55,rotate:gsap.utils.random(-10,10)})
    .to(im,{scale:1,duration:.45,ease:'expo.out'})
    .to(im,{opacity:0,scale:.82,y:`+=${60}`,duration:.9,ease:'power2.in'},'+=.55');
}
let idle=0, auto=null, t0=0;
function heroMove(e){ const r=hero.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
  idle=performance.now(); if(Math.hypot(x-lastT.x,y-lastT.y)>(innerWidth<700?60:95)){ spawn(x,y); lastT={x,y}; } }
if(!reduce){
  hero.addEventListener('pointermove',heroMove);
  hero.addEventListener('pointerdown',heroMove);
  // ambient drift when the cursor is still (and on touch screens)
  auto=setInterval(()=>{ if(performance.now()-idle<2200) return; const r=hero.getBoundingClientRect(); if(r.bottom<0) return;
    t0+=.28; const x=r.width*(.5+.36*Math.sin(t0*1.1)), y=r.height*(.48+.26*Math.sin(t0*1.7+1)); spawn(x,y); },260);
} else {
  // static collage for reduced motion
  [[.14,.2,-6],[.52,.1,4],[.78,.28,-3]].forEach(([fx,fy,r],k)=>{ const im=pool[k], p=PHOTOS[[0,3,1][k]]; im.src=thumb(p);
    im.style.opacity=1; im.style.transform=`translate(${fx*hero.offsetWidth}px,${fy*hero.offsetHeight}px) rotate(${r}deg)`; });
}
if(!fine) $('#hint').textContent='Tap or drag to develop the roll';

/* ---------- contact letters + copy ---------- */
document.querySelectorAll('.hello .w').forEach(w=>{ w.innerHTML=[...w.textContent].map(c=>`<span class="l">${c}</span>`).join(''); });
$('#copyBtn').addEventListener('click',()=>{ const txt=$('#addr').textContent, lab=$('#copyTxt');
  const done=ok=>{ lab.textContent= ok?'Copied':'Select and copy'; lab.classList.toggle('copied',ok); setTimeout(()=>{lab.textContent='Copy email';lab.classList.remove('copied')},2200); };
  const sel=()=>{ const r=document.createRange(); r.selectNodeContents($('#addr')); const s=getSelection(); s.removeAllRanges(); s.addRange(r); done(false); };
  try{ navigator.clipboard.writeText(txt).then(()=>done(true),sel); }catch(e){ sel(); } });

/* ---------- lightbox ---------- */
const lb=$('#lb'), lbImg=$('#lbImg'), strip=$('#strip'); let li=0, lastFocus=null;
strip.innerHTML=PHOTOS.map((p,i)=>`<button type="button" data-i="${i}" aria-label="${p.t}"><img src="${thumb(p)}" alt="" loading="lazy"></button>`).join('');
function show(i,dir=0){
  li=(i+PHOTOS.length)%PHOTOS.length; const p=PHOTOS[li];
  $('#lbCount').textContent=`${pad(li+1)} / ${PHOTOS.length}`; $('#lbTitle').textContent=p.t;
  $('#lbMeta').textContent=`FR ${pad(li+1)} · ${CATS[p.c]} · ${ratio(p)}`; $('#lbNote').textContent=p.n;
  lbImg.alt=p.n;
  if(hasGsap && !reduce && dir){ gsap.fromTo(lbImg,{x:dir*60,opacity:0},{x:0,opacity:1,duration:.55,ease:'expo.out'}); }
  lbImg.src=full(p);
  strip.querySelectorAll('button').forEach((b,k)=>b.setAttribute('aria-current',k===li));
  const cb=strip.children[li]; if(cb) strip.scrollTo({left:cb.offsetLeft-strip.clientWidth/2+26,behavior:reduce?'auto':'smooth'});
}
function open(i){ lastFocus=document.activeElement; show(i); lb.classList.add('open'); lenis&&lenis.stop(); document.documentElement.style.overflow='hidden';
  if(hasGsap&&!reduce) gsap.fromTo(lbImg,{scale:.92,opacity:0},{scale:1,opacity:1,duration:.7,ease:'expo.out'}); $('#lbClose').focus(); }
function close(){ lb.classList.remove('open'); lenis&&lenis.start(); document.documentElement.style.overflow=''; lastFocus&&lastFocus.focus&&lastFocus.focus(); }
document.addEventListener('click',e=>{ const t=e.target.closest('[data-idx]'); if(t && !lb.contains(t)){ open(+t.dataset.idx); } });
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open')){ if((e.key==='Enter'||e.key===' ') && e.target.matches('figure[data-idx]')){ e.preventDefault(); open(+e.target.dataset.idx);} return; }
  if(e.key==='Escape') close(); if(e.key==='ArrowRight') show(li+1,1); if(e.key==='ArrowLeft') show(li-1,-1); });
$('#lbClose').onclick=close; $('#lbPrev').onclick=()=>show(li-1,-1); $('#lbNext').onclick=()=>show(li+1,1);
strip.addEventListener('click',e=>{ const b=e.target.closest('button'); if(b){ const n=+b.dataset.i; show(n, n>li?1:-1); } });
let sx=null; const stage=$('#lbStage');
stage.addEventListener('pointerdown',e=>{ sx=e.clientX; });
stage.addEventListener('pointerup',e=>{ if(sx===null) return; const dx=e.clientX-sx; sx=null; if(Math.abs(dx)>50) show(li+(dx<0?1:-1),dx<0?1:-1); else if(e.target===stage) close(); });

/* ---------- smooth scroll + scroll motion ---------- */
let lenis=null;
if(!reduce && typeof Lenis!=='undefined'){
  lenis=new Lenis({lerp:.09,smoothWheel:true});
  if(hasGsap && window.ScrollTrigger){ lenis.on('scroll',ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
  else { const r=t=>{lenis.raf(t);requestAnimationFrame(r)}; requestAnimationFrame(r); }
}
document.addEventListener('click',e=>{ const a=e.target.closest('a[data-scroll]'); if(!a) return; const id=a.getAttribute('href'); const el=document.querySelector(id); if(!el) return;
  e.preventDefault(); lenis? lenis.scrollTo(el,{offset:0,duration:1.4}) : el.scrollIntoView({behavior:reduce?'auto':'smooth'}); });
$('#toTop').onclick=()=> lenis? lenis.scrollTo(0,{duration:1.6}) : scrollTo({top:0,behavior:reduce?'auto':'smooth'});

function intro(){
  if(!hasGsap||reduce) return;
  const lines=document.querySelectorAll('.hero-name .line');
  lines.forEach(l=>{ l.innerHTML=[...l.textContent].map(c=>`<span class="ch">${c===' '||c===' '?'&nbsp;':c}</span>`).join(''); });
  gsap.from('.hero-name .ch',{yPercent:110,rotate:6,duration:1.2,ease:'expo.out',stagger:.045});
  gsap.from('.hero-meta > *',{y:24,duration:1,ease:'expo.out',stagger:.08,delay:.4});
  // first few frames drop in so the hero is never empty
  const r=hero.getBoundingClientRect();
  [[.2,.32],[.5,.22],[.78,.4],[.36,.5]].forEach(([fx,fy],k)=>setTimeout(()=>spawn(r.width*fx,r.height*fy),500+k*170));
  idle=performance.now();
}

function scrollFx(){
  if(!hasGsap || !window.ScrollTrigger || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm=gsap.matchMedia();
  mm.add('(min-width:761px)',()=>{
    const dist=()=>reelTrack.scrollWidth-innerWidth;
    const skewTo=gsap.quickTo(reelTrack,'skewX',{duration:.5,ease:'power3'});
    const tween=gsap.to(reelTrack,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#reel',pin:true,scrub:1,start:'top top',end:()=>'+='+dist(),invalidateOnRefresh:true,
      onUpdate:s=>skewTo(gsap.utils.clamp(-6,6,s.getVelocity()/-400)), onLeave:()=>skewTo(0), onLeaveBack:()=>skewTo(0)}});
    reelTrack.querySelectorAll('.frame img').forEach(img=>{
      gsap.fromTo(img,{xPercent:-12},{xPercent:4,ease:'none',scrollTrigger:{trigger:img.parentElement,containerAnimation:tween,start:'left right',end:'right left',scrub:true}});
    });
    return ()=>gsap.set(reelTrack,{clearProps:'all'});
  });
  // hero name drifts apart on scroll
  gsap.to('.hero-name .line:first-child',{xPercent:-8,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('.hero-name .line:last-child',{xPercent:8,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  // about image parallax
  gsap.fromTo('#aboutImg',{yPercent:-14},{yPercent:0,ease:'none',scrollTrigger:{trigger:'.about .ph',start:'top bottom',end:'bottom top',scrub:true}});
  // section headings rise in (visible at rest, only offset)
  document.querySelectorAll('.sec-head h2, .about .big, .hello').forEach(h=>gsap.from(h,{y:60,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 90%'}}));
  // grid tiles lift in batches
  ScrollTrigger.batch('.tile',{start:'top 95%',once:true,onEnter:b=>gsap.from(b,{y:50,duration:1,ease:'expo.out',stagger:.06})});
  addEventListener('load',()=>ScrollTrigger.refresh());
}

/* ---------- preloader ---------- */
function preload(){
  const L=$('#loader'), cnt=$('#count'), flash=$('#flashImg');
  if(reduce||!hasGsap){ L.remove(); scrollFx(); return; }
  lenis&&lenis.stop();
  const srcs=PHOTOS.slice(0,14).map(thumb); let loaded=0, shown=0;
  srcs.forEach(s=>{ const i=new Image(); i.onload=i.onerror=()=>loaded++; i.src=s; });
  const st={v:0}; let fi=0;
  const flashInt=setInterval(()=>{ flash.src=srcs[fi++%srcs.length]; },110);
  const tw=gsap.to(st,{v:100,duration:1.8,ease:'power2.inOut',onUpdate:()=>{ cnt.textContent=String(Math.round(Math.min(st.v, 30+loaded/srcs.length*70))).padStart(3,'0'); },
    onComplete:()=>{ cnt.textContent='100'; clearInterval(flashInt);
      gsap.to(L,{yPercent:-100,duration:1,ease:'expo.inOut',delay:.15,onStart:()=>{ intro(); },onComplete:()=>{ L.remove(); lenis&&lenis.start(); scrollFx(); }}); }});
}
preload();
})();
