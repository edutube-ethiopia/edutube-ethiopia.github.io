/* EduTube Exam Center Pro — additive UI layer; preserves the existing quiz engine. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const KEY = 'edutube_exam_favorites_v1';
  const readFav = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY)||'[]').map(String)); } catch { return new Set(); } };
  let favorites = readFav(), query = '', sortMode = 'default', onlyFav = false, listMode = false;
  let focusSeconds = 25*60, focusTimer = null, scratchOpen = false;
  const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function toast(message) {
    let el=$('examProToast');
    if(!el){el=document.createElement('div');el.id='examProToast';el.className='toast';document.body.append(el);}
    el.textContent=message;el.classList.add('show');clearTimeout(el._hide);el._hide=setTimeout(()=>el.classList.remove('show'),2200);
  }
  function mount(){
    const page=$('page-exams'), grid=$('examGrid');
    if(!page||!grid||$('examProTools'))return;
    const panel=document.createElement('section');panel.id='examProTools';panel.className='exam-pro';
    panel.innerHTML=`
      <div class="exam-pro-welcome"><div><span class="eyebrow">EXAM CENTER · PRO</span><h2>Your personal exam command center</h2><p>Find, organize and practice with the quizzes already published on EduTube.</p></div><div class="exam-pro-clock"><small>FOCUS TIMER</small><b id="epTimer">25:00</b><button type="button" id="epTimerToggle">Start focus</button></div></div>
      <div class="exam-pro-stats"><article><b id="epTotal">0</b><small>Available exams</small></article><article><b id="epShown">0</b><small>Showing now</small></article><article><b id="epSaved">0</b><small>Saved exams</small></article><article><b id="epAttempts">0</b><small>Recorded attempts</small></article></div>
      <div class="exam-pro-tools">
        <input id="epSearch" type="search" placeholder="Search exam title or subject…" aria-label="Search exams">
        <select id="epSort" aria-label="Sort exams"><option value="default">Original order</option><option value="az">Title A–Z</option><option value="za">Title Z–A</option><option value="questions">Most questions</option><option value="short">Shortest exam</option></select>
        <button type="button" class="small-button" id="epFavorites">♡ Saved only</button>
        <button type="button" class="small-button" id="epView">▤ List view</button>
        <button type="button" class="small-button" id="epShuffle">↝ Pick for me</button>
        <button type="button" class="small-button" id="epReset">Reset filters</button>
      </div>
      <div class="exam-pro-quick">
        <button type="button" id="epScratch">✎ Scratchpad</button>
        <button type="button" id="epCalculator">＋ Quick calculator</button>
        <button type="button" id="epPrint">⇩ Print exam list</button>
        <button type="button" id="epGuide">⌨ Keyboard guide</button>
      </div>
      <div id="epScratchPanel" class="exam-pro-widget hidden"><div><b>Personal scratchpad</b><button type="button" class="small-button" id="epScratchClose">Close</button></div><textarea id="epScratchText" rows="4" placeholder="Write formulas, reminders or revision notes. Saved on this device."></textarea><small>Private to this browser · Auto-saved locally</small></div>
      <div id="epCalcPanel" class="exam-pro-widget hidden"><b>Quick calculator</b><div class="ep-calc-row"><input id="epCalcInput" inputmode="decimal" placeholder="Example: (25*4)/5"><button type="button" class="small-button" id="epCalcRun">Calculate</button></div><strong id="epCalcResult" aria-live="polite">Result appears here</strong><small>Basic arithmetic only. Do not enter personal information.</small></div>
      <div id="epGuidePanel" class="exam-pro-widget hidden"><b>Keyboard & study tips</b><p>Use Tab to move between controls, Enter or Space to activate a button, and Escape to leave an active quiz if your browser/app supports it. Read each question carefully and review feedback before moving on.</p></div>
      <p class="exam-pro-hint" id="epHint" aria-live="polite">Tip: save an exam to build your personal revision list.</p>`;
    grid.parentNode.insertBefore(panel,grid);
    $('epSearch').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();apply()});
    $('epSort').addEventListener('change',e=>{sortMode=e.target.value;apply()});
    $('epFavorites').onclick=()=>{onlyFav=!onlyFav;$('epFavorites').classList.toggle('active',onlyFav);$('epFavorites').textContent=onlyFav?'♥ Saved only':'♡ Saved only';apply()};
    $('epView').onclick=()=>{listMode=!listMode;grid.classList.toggle('exam-list-view',listMode);$('epView').textContent=listMode?'▦ Grid view':'▤ List view'};
    $('epShuffle').onclick=()=>{const cards=visibleCards();if(!cards.length)return toast('No exams match the current filters.');const card=cards[Math.floor(Math.random()*cards.length)];card.querySelector('button')?.click();};
    $('epReset').onclick=()=>{query='';sortMode='default';onlyFav=false;$('epSearch').value='';$('epSort').value='default';$('epFavorites').classList.remove('active');$('epFavorites').textContent='♡ Saved only';apply()};
    $('epScratch').onclick=()=>{$('epScratchPanel').classList.toggle('hidden');};
    $('epScratchClose').onclick=()=>$('epScratchPanel').classList.add('hidden');
    $('epScratchText').value=localStorage.getItem('edutube_exam_scratchpad_v1')||'';
    $('epScratchText').addEventListener('input',e=>localStorage.setItem('edutube_exam_scratchpad_v1',e.target.value));
    $('epCalculator').onclick=()=>$('epCalcPanel').classList.toggle('hidden');
    $('epCalcRun').onclick=()=>{const v=$('epCalcInput').value.trim();if(!/^[0-9+\-*/().%\s]+$/.test(v)){$('epCalcResult').textContent='Enter a valid arithmetic expression.';return;}try{const result=safeMath(v);$('epCalcResult').textContent=Number.isFinite(result)?String(result):'Invalid calculation';}catch{$('epCalcResult').textContent='Could not calculate this expression.';}};
    $('epGuide').onclick=()=>$('epGuidePanel').classList.toggle('hidden');
    $('epPrint').onclick=()=>window.print();
    $('epTimerToggle').onclick=toggleTimer;
    refreshStats();apply();
    document.querySelectorAll('#examGrade,#examSubject').forEach(el=>el.addEventListener('change',()=>setTimeout(()=>{refreshStats();apply()},0)));
  }
  function visibleCards(){return [...$('examGrid').querySelectorAll('.exam-card')].filter(c=>!c.hidden);}
  function refreshStats(){const cards=[...$('examGrid').querySelectorAll('.exam-card')];$('epTotal').textContent=cards.length;$('epAttempts').textContent=(()=>{try{return JSON.parse(localStorage.getItem('edutube_v4_attempts')||'[]').length}catch{return 0}})();$('epSaved').textContent=favorites.size;}
  function apply(){
    const grid=$('examGrid');if(!grid)return;
    const cards=[...grid.querySelectorAll('.exam-card')];
    cards.forEach(card=>{
      const title=card.querySelector('h3')?.textContent||'',meta=card.querySelector('.video-meta')?.textContent||'',match=(title+' '+meta).toLowerCase().includes(query);
      const id=(meta+'|'+title).replace(/\s+/g,' ').trim();card.dataset.examKey=id;
      card.hidden=!(match&&(!onlyFav||favorites.has(id)));
      let save=card.querySelector('.ep-save');if(!save){save=document.createElement('button');save.type='button';save.className='small-button ep-save';save.addEventListener('click',()=>{favorites.has(card.dataset.examKey)?favorites.delete(card.dataset.examKey):favorites.add(card.dataset.examKey);localStorage.setItem(KEY,JSON.stringify([...favorites]));refreshStats();apply();});card.append(save);}
      save.textContent=favorites.has(id)?'♥ Saved':'♡ Save';save.setAttribute('aria-pressed',String(favorites.has(id)));
    });
    const shown=cards.filter(c=>!c.hidden);
    shown.sort((a,b)=>{const ta=a.querySelector('h3')?.textContent||'',tb=b.querySelector('h3')?.textContent||'';if(sortMode==='az')return ta.localeCompare(tb);if(sortMode==='za')return tb.localeCompare(ta);if(sortMode==='questions')return (parseInt(b.querySelector('p')?.textContent)||0)-(parseInt(a.querySelector('p')?.textContent)||0);if(sortMode==='short')return (parseInt(a.querySelector('p')?.textContent)||999)-(parseInt(b.querySelector('p')?.textContent)||999);return 0;});
    shown.forEach(c=>grid.append(c));$('epShown').textContent=shown.length;
    let empty=$('epNoResults');if(!empty){empty=document.createElement('p');empty.id='epNoResults';empty.className='empty-state';grid.after(empty);}empty.textContent=shown.length?'':'No exams match. Try changing your search or filters.';empty.classList.toggle('hidden',shown.length>0);
  }
  function safeMath(expression){const tokens=expression.match(/\d+(?:\.\d+)?|[()+\-*/%]/g)||[];if(tokens.join('')!==expression.replace(/\s+/g,''))throw Error('Invalid');let i=0;function atom(){const t=tokens[i++];if(t==='('){const n=expr();if(tokens[i++]!==')')throw Error('Invalid');return n;}if(t==='-')return -atom();if(t==='+')return atom();const n=Number(t);if(!Number.isFinite(n))throw Error('Invalid');return n;}function term(){let n=atom();while(['*','/','%'].includes(tokens[i])){const op=tokens[i++],r=atom();n=op==='*'?n*r:op==='/'?n/r:n%r;}return n;}function expr(){let n=term();while(['+','-'].includes(tokens[i])){const op=tokens[i++],r=term();n=op==='+'?n+r:n-r;}return n;}const out=expr();if(i!==tokens.length)throw Error('Invalid');return out;}
  function toggleTimer(){if(focusTimer){clearInterval(focusTimer);focusTimer=null;$('epTimerToggle').textContent='Resume focus';return;}if(focusSeconds<=0)focusSeconds=25*60;$('epTimerToggle').textContent='Pause focus';focusTimer=setInterval(()=>{focusSeconds--;const m=String(Math.floor(focusSeconds/60)).padStart(2,'0'),s=String(focusSeconds%60).padStart(2,'0');$('epTimer').textContent=m+':'+s;if(focusSeconds<=0){clearInterval(focusTimer);focusTimer=null;$('epTimerToggle').textContent='Start focus';toast('Focus session complete — take a short break!');focusSeconds=25*60;}},1000);}
  document.addEventListener('DOMContentLoaded',mount);
})();
