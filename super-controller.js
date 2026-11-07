/* EduTube super-controller.js — Super Advanced Controller below the player.
   Load AFTER script.js and player-pro.js. Uses globals: yt, currentVideo, speed, language, notify. */
(() => {
'use strict';
const g = id => document.getElementById(id);
const modal = g('videoModal'), host = g('superCtrl');
if (!modal || !host) return;

const LS = { step: 'edutube_sc_step', marks: 'edutube_sc_marks' };
const ls = { get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
const safe = (fn, d) => { try { const r = fn(); return r === undefined ? d : r; } catch { return d; } };
const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const CHIPS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const STEPS = [5, 10, 15, 30, 60];
const SLEEPS = [0, 15, 30, 45, 60, -1];

const TXT = {
  en: { title: 'Super Advanced Controller', sub: 'Full control over this lesson', progress: 'Progress', watched: 'Watched', left: 'Left', leftReal: 'Left at your speed', ends: 'Finishes at', speed: 'Speed', seek: 'Precise seek', go: 'Go', gotoPh: 'mm:ss', loop: 'Loop', loopLesson: 'Loop lesson', setA: 'Set A', setB: 'Set B', clear: 'Clear', ab: 'A–B repeat: replay a tricky section', abNone: 'Tap “Set A” at the start of the part you want to repeat.', abB: 'Now tap “Set B” at the end of the part.', abOn: 'Repeating', marks: 'Bookmarks', add: 'Add', notePh: 'Note (optional)', noMarks: 'No bookmarks yet. Save important moments!', mark: 'Bookmark', sleep: 'Sleep timer', off: 'Off', endLesson: 'End of lesson', sleepLeft: 'Pauses in', tools: 'Smart options', autoplay: 'Autoplay next lesson', awake: 'Keep screen awake', keys: 'Keyboard shortcuts', min: 'min', invalid: 'Invalid time', added: 'Bookmark saved', aSet: 'Point A set', bSet: 'A–B repeat on', abOff: 'A–B repeat off', loopOn: 'Lesson loop on', loopOff: 'Lesson loop off', sleepSet: 'Sleep timer set', sleepDone: 'Sleep timer: paused', live: 'Playing', paused: 'Paused', k: ['Play / pause', 'Seek ±10s', 'Volume', 'Mute', 'Captions', 'Fullscreen', 'Speed − / +', 'Set A → B → clear', 'Bookmark', 'Loop lesson', 'Jump to 0–90%', 'Jump to start / end'] },
  am: { title: 'እጅግ የላቀ መቆጣጠሪያ', sub: 'ለዚህ ትምህርት ሙሉ ቁጥጥር', progress: 'እድገት', watched: 'የታየ', left: 'የቀረ', leftReal: 'በፍጥነትዎ የቀረ', ends: 'የሚያልቅበት', speed: 'ፍጥነት', seek: 'ትክክለኛ ፍለጋ', go: 'ሂድ', gotoPh: 'ደቂቃ:ሴኮንድ', loop: 'ድግግሞሽ', loopLesson: 'ትምህርቱን ድገም', setA: 'A አስቀምጥ', setB: 'B አስቀምጥ', clear: 'አጽዳ', ab: 'A–B ድግግሞሽ፦ አስቸጋሪ ክፍልን ደጋግመው ይስሙ', abNone: 'መድገም የሚፈልጉት ክፍል መጀመሪያ ላይ “A አስቀምጥ” ይጫኑ።', abB: 'አሁን የክፍሉ መጨረሻ ላይ “B አስቀምጥ” ይጫኑ።', abOn: 'እየተደገመ ነው', marks: 'ዕልባቶች', add: 'ጨምር', notePh: 'ማስታወሻ (አማራጭ)', noMarks: 'ገና ዕልባት የለም። አስፈላጊ ጊዜዎችን ያስቀምጡ!', mark: 'ዕልባት', sleep: 'የእንቅልፍ ሰዓት ቆጣሪ', off: 'ጠፍቷል', endLesson: 'ትምህርቱ ሲያልቅ', sleepLeft: 'የሚቆመው በ', tools: 'ብልህ አማራጮች', autoplay: 'ቀጣዩን ትምህርት በራስ-ሰር አጫውት', awake: 'ማያ ገጹ እንዳይጠፋ አድርግ', keys: 'የቁልፍ ሰሌዳ አቋራጮች', min: 'ደቂቃ', invalid: 'ትክክል ያልሆነ ጊዜ', added: 'ዕልባት ተቀምጧል', aSet: 'ነጥብ A ተቀምጧል', bSet: 'A–B ድግግሞሽ በርቷል', abOff: 'A–B ድግግሞሽ ጠፍቷል', loopOn: 'የትምህርት ድግግሞሽ በርቷል', loopOff: 'የትምህርት ድግግሞሽ ጠፍቷል', sleepSet: 'የእንቅልፍ ቆጣሪ ተቀምጧል', sleepDone: 'የእንቅልፍ ቆጣሪ፦ ቆሟል', live: 'እየተጫወተ', paused: 'ቆሟል', k: ['አጫውት / አቁም', 'ፍለጋ ±10ሰ', 'ድምፅ', 'ድምፅ ዝጋ', 'ንዑስ ጽሑፍ', 'ሙሉ ማያ', 'ፍጥነት − / +', 'A → B → አጽዳ', 'ዕልባት', 'ትምህርት ድገም', 'ወደ 0–90% ዝለል', 'ወደ መጀመሪያ / መጨረሻ'] }
};
const lang = () => (typeof language !== 'undefined' && language === 'am') ? 'am' : 'en';
const T = k => TXT[lang()][k];
const note = m => { if (typeof notify === 'function') notify(m); };
const ready = () => typeof yt !== 'undefined' && yt && typeof yt.getPlayerState === 'function' && typeof yt.getCurrentTime === 'function';
const curSpeed = () => (typeof speed !== 'undefined' ? speed : 1);
const fmt = s => {
  s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0');
};
const parseTime = v => {
  v = String(v).trim(); if (!v) return null;
  if (/^\d+(\.\d+)?$/.test(v)) return +v;
  const p = v.split(':').map(Number); if (p.length > 3 || p.some(n => !isFinite(n) || n < 0)) return null;
  return p.reduce((a, n) => a * 60 + n, 0);
};

/* ---------- state ---------- */
const S = { vid: null, a: null, b: null, ab: false, loop: false, step: +ls.get(LS.step, 10) || 10, sleepMode: 0, sleepAt: 0, awake: false, lock: null, lastLang: null };
const now = () => safe(() => yt.getCurrentTime(), 0), dur = () => safe(() => yt.getDuration(), 0);
const seekTo = t => { if (ready()) { safe(() => yt.seekTo(Math.max(0, t), true)); if (typeof showControls === 'function') showControls(); } };
const readMarks = () => safe(() => JSON.parse(ls.get(LS.marks, '{}')), {});
const writeMarks = o => ls.set(LS.marks, JSON.stringify(o));

/* ---------- markup ---------- */
host.innerHTML = `
<div class="sc-head"><div><h3 data-k="title"></h3><small data-k="sub"></small></div><span class="sc-live"><i></i><span id="scLive"></span></span></div>
<div class="sc-grid">
  <section class="sc-card sc-wide"><h4>📊 <span data-k="progress"></span></h4>
    <div class="sc-bar"><i id="scBar"></i></div>
    <div class="sc-stats">
      <div class="sc-stat"><b id="scPct">0%</b><small data-k="watched"></small></div>
      <div class="sc-stat"><b id="scLeft">0:00</b><small data-k="left"></small></div>
      <div class="sc-stat"><b id="scReal">0:00</b><small data-k="leftReal"></small></div>
      <div class="sc-stat"><b id="scEnds">--:--</b><small data-k="ends"></small></div>
    </div></section>
  <section class="sc-card"><h4>⚡ <span data-k="speed"></span></h4>
    <div class="sc-row"><button class="sc-btn sc-step" id="scSlow" type="button" aria-label="Slower">−</button><div class="sc-big sc-grow" id="scSpeed">1×</div><button class="sc-btn sc-step" id="scFast" type="button" aria-label="Faster">+</button></div>
    <div class="sc-row sc-wrap" id="scChips" style="margin-top:10px"></div></section>
  <section class="sc-card"><h4>⏩ <span data-k="seek"></span></h4>
    <div class="sc-row"><button class="sc-btn sc-grow" id="scBack" type="button">⏪ <span id="scBackL">10s</span></button><button class="sc-btn sc-grow" id="scFwd" type="button"><span id="scFwdL">10s</span> ⏩</button></div>
    <div class="sc-row sc-wrap" id="scSteps" style="margin-top:10px"></div>
    <div class="sc-row" style="margin-top:10px"><input class="sc-in" id="scGoIn" type="text" inputmode="numeric" autocomplete="off"><button class="sc-btn" id="scGo" type="button" data-k="go"></button></div></section>
  <section class="sc-card"><h4>🔁 <span data-k="loop"></span></h4>
    <button class="sc-sw" id="scLoop" type="button" role="switch" aria-checked="false"><span data-k="loopLesson"></span><i></i></button>
    <p class="sc-empty" style="margin:6px 0 8px" data-k="ab"></p>
    <div class="sc-ab"><button class="sc-btn" id="scA" type="button" data-k="setA"></button><button class="sc-btn" id="scB" type="button" data-k="setB"></button><button class="sc-btn" id="scABx" type="button" data-k="clear"></button></div>
    <p class="sc-abinfo" id="scABinfo"></p></section>
  <section class="sc-card"><h4>😴 <span data-k="sleep"></span></h4>
    <div class="sc-row sc-wrap" id="scSleepChips"></div><p class="sc-abinfo" id="scSleepInfo"></p></section>
  <section class="sc-card sc-wide"><h4>🔖 <span data-k="marks"></span></h4>
    <div class="sc-row"><input class="sc-in" id="scNote" type="text" maxlength="60" autocomplete="off"><button class="sc-btn" id="scAdd" type="button">＋ <span data-k="add"></span> <b id="scAddT">0:00</b></button></div>
    <div class="sc-marks" id="scMarks"></div></section>
  <section class="sc-card sc-wide"><h4>🛠 <span data-k="tools"></span></h4>
    <button class="sc-sw" id="scAuto" type="button" role="switch" aria-checked="false"><span data-k="autoplay"></span><i></i></button>
    <button class="sc-sw" id="scAwake" type="button" role="switch" aria-checked="false"><span data-k="awake"></span><i></i></button>
    <details class="sc-keys"><summary data-k="keys"></summary><div class="sc-kgrid" id="scKeys"></div></details></section>
</div>`;
host.classList.add('sc');
const $ = id => g(id);
const KEYS = ['Space', '← →', '↑ ↓', 'M', 'C', 'F', '< >', 'A', 'B', 'O', '0–9', 'Home / End'];

function build() {
  const chips = $('scChips'); chips.replaceChildren();
  CHIPS.forEach(s => { const b = document.createElement('button'); b.type = 'button'; b.className = 'sc-chip'; b.dataset.s = s; b.textContent = s + '×'; b.onclick = () => setSpeed(s); chips.append(b); });
  const st = $('scSteps'); st.replaceChildren();
  STEPS.forEach(s => { const b = document.createElement('button'); b.type = 'button'; b.className = 'sc-chip'; b.dataset.s = s; b.textContent = s + 's'; b.onclick = () => { S.step = s; ls.set(LS.step, s); paint(); }; st.append(b); });
  const sl = $('scSleepChips'); sl.replaceChildren();
  SLEEPS.forEach(m => { const b = document.createElement('button'); b.type = 'button'; b.className = 'sc-chip'; b.dataset.m = m; b.onclick = () => setSleep(m); sl.append(b); });
}
function applyLang() {
  if (S.lastLang === lang()) return; S.lastLang = lang();
  host.querySelectorAll('[data-k]').forEach(el => { el.textContent = T(el.dataset.k); });
  $('scGoIn').placeholder = T('gotoPh'); $('scNote').placeholder = T('notePh');
  $('scSleepChips').querySelectorAll('.sc-chip').forEach(b => { const m = +b.dataset.m; b.textContent = m === 0 ? T('off') : m === -1 ? T('endLesson') : m + ' ' + T('min'); });
  $('scKeys').innerHTML = KEYS.map((k, i) => `<span><kbd>${k}</kbd>${TXT[lang()].k[i]}</span>`).join('');
  renderMarks(); paint();
}

/* ---------- actions ---------- */
function setSpeed(s) { const b = document.querySelector(`.speed-btn[data-speed="${s}"]`); if (b) b.click(); setTimeout(paint, 30); }
function stepSpeed(d) { let i = SPEEDS.findIndex(s => s >= curSpeed() - 1e-6); if (i < 0) i = 3; setSpeed(SPEEDS[Math.max(0, Math.min(SPEEDS.length - 1, i + d))]); }
function skip(d) { if (!ready()) return; seekTo(Math.min(Math.max(0, now() + d), Math.max(0, dur() - 0.5))); const f = g('skipFx'); if (f) { f.textContent = (d < 0 ? '⏪ ' : '⏩ ') + Math.abs(d) + 's'; f.className = 'skip-fx ' + (d < 0 ? 'l' : 'r'); void f.offsetWidth; f.classList.add('go'); } }
function setLoop(v) { S.loop = v ?? !S.loop; note(S.loop ? T('loopOn') : T('loopOff')); paint(); }
function markA() { if (!ready()) return; S.a = now(); S.b = null; S.ab = false; note(T('aSet')); paint(); }
function markB() {
  if (!ready()) return; if (S.a == null) { markA(); return; }
  let b = now(); if (b < S.a) { b = S.a; S.a = now(); } if (b - S.a < 1) return;
  S.b = b; S.ab = true; note(T('bSet')); paint();
}
function clearAB() { const was = S.ab || S.a != null; S.a = S.b = null; S.ab = false; if (was) note(T('abOff')); paint(); }
function cycleAB() { if (S.a == null) markA(); else if (S.b == null) markB(); else clearAB(); }
function setSleep(m) {
  S.sleepMode = m; S.sleepAt = m > 0 ? Date.now() + m * 60000 : 0; if (m !== 0) note(T('sleepSet')); paint();
}
function addMark(label) {
  if (!ready() || typeof currentVideo === 'undefined' || !currentVideo) return;
  const all = readMarks(), list = all[currentVideo.id] || [], t = Math.floor(now());
  if (!list.some(m => Math.abs(m.t - t) < 2)) list.push({ t, label: (label || '').trim() });
  list.sort((x, y) => x.t - y.t); all[currentVideo.id] = list; writeMarks(all); note(T('added')); renderMarks();
}
function delMark(t) {
  const all = readMarks(), id = currentVideo && currentVideo.id; if (!id) return;
  all[id] = (all[id] || []).filter(m => m.t !== t); writeMarks(all); renderMarks();
}
function renderMarks() {
  const box = $('scMarks'); box.replaceChildren();
  const list = (currentVideo && readMarks()[currentVideo.id]) || [];
  if (!list.length) { const p = document.createElement('p'); p.className = 'sc-empty'; p.textContent = T('noMarks'); box.append(p); return; }
  list.forEach(m => {
    const row = document.createElement('div'); row.className = 'sc-mark';
    const go = document.createElement('button'); go.type = 'button'; go.className = 'go';
    const b = document.createElement('b'); b.textContent = fmt(m.t); const s = document.createElement('span'); s.textContent = m.label || T('mark');
    go.append(b, s); go.onclick = () => seekTo(m.t);
    const del = document.createElement('button'); del.type = 'button'; del.className = 'del'; del.textContent = '✕'; del.setAttribute('aria-label', 'Delete'); del.onclick = () => delMark(m.t);
    row.append(go, del); box.append(row);
  });
}
async function setAwake(v) {
  S.awake = v;
  try {
    if (v && navigator.wakeLock) S.lock = await navigator.wakeLock.request('screen');
    else if (S.lock) { await S.lock.release(); S.lock = null; }
  } catch { S.awake = false; }
  paint();
}

/* ---------- painting ---------- */
const setTxt = (el, v) => { if (el.textContent !== v) el.textContent = v; };
function paint() {
  const sp = curSpeed();
  setTxt($('scSpeed'), sp + '×');
  $('scChips').querySelectorAll('.sc-chip').forEach(b => b.classList.toggle('on', Math.abs(+b.dataset.s - sp) < 1e-6));
  $('scSteps').querySelectorAll('.sc-chip').forEach(b => b.classList.toggle('on', +b.dataset.s === S.step));
  setTxt($('scBackL'), S.step + 's'); setTxt($('scFwdL'), S.step + 's');
  $('scLoop').setAttribute('aria-checked', String(S.loop));
  $('scA').classList.toggle('on', S.a != null); $('scB').classList.toggle('on', S.ab);
  $('scSleepChips').querySelectorAll('.sc-chip').forEach(b => b.classList.toggle('on', +b.dataset.m === S.sleepMode || (S.sleepMode > 0 && +b.dataset.m === S.sleepMode)));
  const info = $('scABinfo');
  setTxt(info, S.a == null ? T('abNone') : S.b == null ? `A ${fmt(S.a)} · ${T('abB')}` : `🔁 ${T('abOn')}: ${fmt(S.a)} → ${fmt(S.b)}`);
  const cb = g('autoNext'); $('scAuto').setAttribute('aria-checked', String(!!(cb && cb.checked)));
  $('scAwake').setAttribute('aria-checked', String(S.awake));
  $('scAwake').style.display = navigator.wakeLock ? '' : 'none';
}
function tick() {
  if (typeof currentVideo === 'undefined' || !currentVideo) return;
  if (currentVideo.id !== S.vid) { S.vid = currentVideo.id; S.a = S.b = null; S.ab = false; S.loop = false; renderMarks(); paint(); }
  applyLang();
  if (!ready()) return;
  const t = now(), d = dur(), st = safe(() => yt.getPlayerState(), -1);
  host.classList.toggle('is-playing', st === 1); setTxt($('scLive'), st === 1 ? T('live') : T('paused'));
  setTxt($('scAddT'), fmt(t));
  if (d > 0) {
    const pct = Math.min(100, t / d * 100), left = Math.max(0, d - t), sp = curSpeed() || 1, real = left / sp;
    $('scBar').style.width = pct + '%'; setTxt($('scPct'), Math.round(pct) + '%');
    setTxt($('scLeft'), fmt(left)); setTxt($('scReal'), fmt(real));
    setTxt($('scEnds'), new Date(Date.now() + real * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    if (S.loop && st === 1 && d - t < 0.7) seekTo(0);
    if (S.sleepMode === -1 && st === 1 && d - t < 1.5) { safe(() => yt.pauseVideo()); S.sleepMode = 0; note(T('sleepDone')); paint(); }
  }
  if (S.ab && S.a != null && S.b != null && t >= S.b && t < S.b + 1.5) seekTo(S.a);
  const si = $('scSleepInfo');
  if (S.sleepMode > 0) {
    const ms = S.sleepAt - Date.now();
    if (ms <= 0) { safe(() => yt.pauseVideo()); S.sleepMode = 0; S.sleepAt = 0; note(T('sleepDone')); paint(); setTxt(si, ''); }
    else setTxt(si, `${T('sleepLeft')} ${fmt(ms / 1000)}`);
  } else setTxt(si, S.sleepMode === -1 ? T('endLesson') : '');
}
let timer = null;
new MutationObserver(() => {
  if (modal.classList.contains('hidden')) { clearInterval(timer); timer = null; S.vid = null; S.sleepMode = 0; S.sleepAt = 0; if (S.awake) setAwake(false); }
  else if (!timer) { timer = setInterval(tick, 250); tick(); }
}).observe(modal, { attributes: true, attributeFilter: ['class'] });

/* ---------- wiring ---------- */
build();
$('scSlow').onclick = () => stepSpeed(-1);
$('scFast').onclick = () => stepSpeed(1);
$('scBack').onclick = () => skip(-S.step);
$('scFwd').onclick = () => skip(S.step);
$('scGo').onclick = () => { const t = parseTime($('scGoIn').value); if (t == null || (dur() && t > dur())) { note(T('invalid')); return; } seekTo(t); $('scGoIn').value = ''; };
$('scLoop').onclick = () => setLoop();
$('scA').onclick = markA; $('scB').onclick = markB; $('scABx').onclick = clearAB;
$('scAdd').onclick = () => { addMark($('scNote').value); $('scNote').value = ''; };
$('scAuto').onclick = () => { const cb = g('autoNext'); if (!cb) return; cb.checked = !cb.checked; cb.dispatchEvent(new Event('change', { bubbles: true })); paint(); };
$('scAwake').onclick = () => setAwake(!S.awake);
['scGoIn', 'scNote'].forEach(id => $(id).addEventListener('keydown', e => {
  e.stopPropagation();
  if (e.key === 'Enter') { e.preventDefault(); (id === 'scGoIn' ? $('scGo') : $('scAdd')).click(); }
}));
document.addEventListener('visibilitychange', () => { if (S.awake && document.visibilityState === 'visible') setAwake(true); });
document.addEventListener('keydown', e => {
  if (modal.classList.contains('hidden') || e.ctrlKey || e.metaKey || e.altKey || !ready()) return;
  const tag = e.target.tagName || '';
  if (/^(TEXTAREA|SELECT)$/.test(tag) || (tag === 'INPUT' && e.target.type !== 'range' && e.target.type !== 'checkbox')) return;
  const k = e.key.toLowerCase();
  if (k === 'a') cycleAB();
  else if (k === 'b') addMark('');
  else if (k === 'o') setLoop();
  else if (k === 'home') { e.preventDefault(); seekTo(0); }
  else if (k === 'end') { e.preventDefault(); seekTo(Math.max(0, dur() - 1)); }
  else if (/^[0-9]$/.test(k) && dur()) seekTo(dur() * (+k) / 10);
}, true);
document.addEventListener('click', e => { if (e.target.closest('.speed-btn,#ppSpeed')) setTimeout(paint, 40); });
applyLang(); paint(); renderMarks();
})();
