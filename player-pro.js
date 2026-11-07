/* EduTube player-pro.js — UI layer for the existing YouTube-API player.
   Reuses script.js state/functions (yt, currentVideo, videos, openVideo, toggleFavorite,
   showControls, toggleFull, speed buttons). Load AFTER script.js. */
(() => {
'use strict';
const g = id => document.getElementById(id);
const modal = g('videoModal'), frame = g('videoFrame'), panel = g('ppPanel'), menu = g('ppMenu');
if (!modal || !frame || !panel || !menu) return;

const LS = { vol: 'edutube_pp_vol', cc: 'edutube_pp_cc', layout: 'edutube_pp_layout' };
const ls = { get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
const safe = (fn, d) => { try { const r = fn(); return r === undefined ? d : r; } catch { return d; } };
const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const QL = { tiny: '144p', small: '240p', medium: '360p', large: '480p', hd720: '720p', hd1080: '1080p', hd1440: '1440p', hd2160: '4K', highres: '4K+' };

const TXT = {
  en: { up: 'Up Next', share: 'Share', more: 'More', quality: 'Quality', speed: 'Playback Speed', cc: 'Subtitles/CC', audio: 'Audio Track', layout: 'Video Layout', adv: 'Advanced Settings', auto: 'Auto', off: 'Off', on: 'On', na: 'Not available', fit: 'Fit to Screen', fill: 'Fill Screen', autoplay: 'Autoplay next lesson', copy: 'Copy link', copied: 'Link copied', noprev: 'No previous lesson', nocc: 'No captions found for this video', qnote: 'YouTube may override this choice based on your connection.', qnone: 'YouTube chooses the quality automatically for this video.', ccnote: 'Captions depend on what the YouTube video provides.', anote: 'YouTube embeds do not allow choosing an audio track.', keys: 'Shortcuts: Space play · ←/→ ±10s · ↑/↓ volume · M mute · C captions · F fullscreen · < > speed', done: 'Mark as completed' },
  am: { up: 'ቀጣይ', share: 'አጋራ', more: 'ተጨማሪ', quality: 'ጥራት', speed: 'የመልሶ ማጫወት ፍጥነት', cc: 'ንዑስ ጽሑፍ / CC', audio: 'የድምፅ ትራክ', layout: 'የቪዲዮ አቀማመጥ', adv: 'የላቁ ቅንብሮች', auto: 'ራስ-ሰር', off: 'ጠፍቷል', on: 'አብራ', na: 'የለም', fit: 'ከማያ ገጹ ጋር ይመጥን', fill: 'ማያ ገጹን ይሙላ', autoplay: 'ቀጣዩን ትምህርት በራስ-ሰር አጫውት', copy: 'ሊንክ ቅዳ', copied: 'ሊንኩ ተቀድቷል', noprev: 'ቀዳሚ ትምህርት የለም', nocc: 'ለዚህ ቪዲዮ ንዑስ ጽሑፍ አልተገኘም', qnote: 'YouTube እንደ ኢንተርኔትዎ ሁኔታ ምርጫዎን ሊተካ ይችላል።', qnone: 'YouTube ጥራቱን ለዚህ ቪዲዮ በራስ-ሰር ይመርጣል።', ccnote: 'ንዑስ ጽሑፍ የሚወሰነው በYouTube ቪዲዮው ላይ ባለው ነው።', anote: 'የYouTube ተጫዋች የድምፅ ትራክ መምረጥ አይፈቅድም።', keys: 'ቁልፎች: Space ማጫወት · ←/→ ±10ሰ · ↑/↓ ድምፅ · M ድምፅ ዝጋ · C ንዑስ ጽሑፍ · F ሙሉ ማያ · < > ፍጥነት', done: 'ተጠናቋል ብለው ምልክት ያድርጉ' }
};
const T = k => (TXT[(typeof language !== 'undefined' && language === 'am') ? 'am' : 'en'][k]);
const ico = n => `<svg class="pp-i" aria-hidden="true"><use href="#pi-${n}"/></svg>`;
const ready = () => typeof yt !== 'undefined' && yt && typeof yt.getPlayerState === 'function';
const playable = () => (typeof videos !== 'undefined' ? videos : []).filter(v => getYouTubeId(v.url));
const curIdx = () => playable().findIndex(v => typeof currentVideo !== 'undefined' && currentVideo && v.id === currentVideo.id);
const curSpeed = () => (typeof speed !== 'undefined' ? speed : 1);
const thumbUrl = v => { const id = getYouTubeId(v.url); return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : ''; };

let view = 'main', panelOpen = false, menuOpen = false;
let layout = ls.get(LS.layout, 'fit'), ccLang = null, ccTracks = [], ccPending = false;
let lastId = null, timer = null, volFor = null, volDrag = false;

/* ---------- panel building ---------- */
function btn(cls, html, onClick) { const b = document.createElement('button'); b.type = 'button'; b.className = cls; b.innerHTML = html; if (onClick) b.addEventListener('click', onClick); return b; }
function row(icon, label, value, onClick, disabled) {
  const b = btn('pp-item', `<span class="pp-ii">${ico(icon)}</span><span class="pp-lab"></span><span class="pp-val"></span>${ico('chev')}`, onClick);
  b.children[1].textContent = label; b.children[2].textContent = value || ''; b.disabled = !!disabled; return b;
}
function opt(label, active, onClick) {
  const b = btn('pp-item pp-opt', `<span class="pp-ii">${ico('check')}</span><span class="pp-lab"></span>`, onClick);
  b.children[1].textContent = label; b.setAttribute('role', 'menuitemradio'); b.setAttribute('aria-checked', String(!!active)); return b;
}
function toggle(label, on, onClick) {
  const b = btn('pp-item pp-toggle', `<span class="pp-lab"></span><span class="pp-switch"></span>`, onClick);
  b.children[0].textContent = label; b.setAttribute('role', 'switch'); b.setAttribute('aria-checked', String(!!on)); return b;
}
function note(text) { const p = document.createElement('p'); p.className = 'pp-note'; p.textContent = text; return p; }
function head(title) {
  const d = document.createElement('div'); d.className = 'pp-subhead';
  const b = btn('', ico('back'), () => go('main')); b.setAttribute('aria-label', 'Back');
  const s = document.createElement('span'); s.textContent = title; d.append(b, s); return d;
}
const qLevels = () => ready() ? safe(() => yt.getAvailableQualityLevels().filter(q => QL[q]), []) : [];
const qLabel = () => (ready() && QL[safe(() => yt.getPlaybackQuality(), '')]) || T('auto');
const ccLabel = () => ccLang ? (ccLang === 'on' ? T('on') : (ccTracks.find(t => t.languageCode === ccLang)?.languageName || T('on'))) : T('off');

function render() {
  panel.replaceChildren();
  if (view === 'main') {
    panel.append(
      row('quality', T('quality'), qLabel(), () => go('quality')),
      row('speed', T('speed'), curSpeed() + '×', () => go('speed')),
      row('cc', T('cc'), ccLabel(), () => go('cc')),
      row('audio', T('audio'), T('na'), null, true),
      row('layout', T('layout'), layout === 'fill' ? T('fill') : T('fit'), () => go('layout')),
      row('sliders', T('adv'), '', () => go('adv')));
    return;
  }
  const titles = { quality: 'quality', speed: 'speed', cc: 'cc', layout: 'layout', adv: 'adv' };
  panel.append(head(T(titles[view])));
  if (view === 'quality') {
    const lv = qLevels();
    if (!lv.length) { panel.append(note(T('qnone'))); return; }
    const now = safe(() => yt.getPlaybackQuality(), '');
    panel.append(opt(T('auto'), !QL[now] || false, () => setQuality('default')));
    lv.forEach(q => panel.append(opt(QL[q], q === now, () => setQuality(q))));
    panel.append(note(T('qnote')));
  } else if (view === 'speed') {
    SPEEDS.forEach(s => panel.append(opt(s === 1 ? '1× (Normal)' : s + '×', s === curSpeed(), () => { setSpeed(s); render(); })));
  } else if (view === 'cc') {
    panel.append(opt(T('off'), !ccLang, () => { ccOff(); render(); }));
    if (ccLang && ccTracks.length) ccTracks.forEach(t => panel.append(opt(t.displayName || t.languageName || t.languageCode, ccLang === t.languageCode, () => { ccOn(t.languageCode); render(); })));
    else panel.append(opt(T('on'), !!ccLang, () => { ccOn(); render(); }));
    panel.append(note(T('ccnote')));
  } else if (view === 'layout') {
    panel.append(opt(T('fit'), layout !== 'fill', () => setLayout('fit')), opt(T('fill'), layout === 'fill', () => setLayout('fill')));
  } else if (view === 'adv') {
    const cb = g('autoNext');
    if (cb) panel.append(toggle(T('autoplay'), cb.checked, () => { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change', { bubbles: true })); render(); }));
    panel.append(note(T('keys')), note(T('anote')));
  }
}
function go(v) { view = v; render(); }
function keep() { frame.classList.toggle('pp-keep', panelOpen || menuOpen); if (typeof showControls === 'function') showControls(); }
function togglePanel(open, v) {
  panelOpen = open ?? !panelOpen;
  if (panelOpen) closeMenu();
  panel.classList.toggle('hidden', !panelOpen); g('ppSettings').setAttribute('aria-expanded', String(panelOpen));
  if (panelOpen) { view = v || 'main'; render(); }
  keep();
}
function closeMenu() { menuOpen = false; menu.classList.add('hidden'); g('ppMore').setAttribute('aria-expanded', 'false'); frame.classList.toggle('pp-keep', panelOpen); }
function closeAll() { if (panelOpen) togglePanel(false); closeMenu(); }

/* ---------- actions on the real player ---------- */
function setSpeed(s) { const b = document.querySelector(`.speed-btn[data-speed="${s}"]`); if (b) b.click(); }
function stepSpeed(d) { let i = SPEEDS.findIndex(s => s >= curSpeed() - 1e-6); if (i < 0) i = 3; setSpeed(SPEEDS[Math.max(0, Math.min(SPEEDS.length - 1, i + d))]); }
function setQuality(q) { if (!ready()) return; safe(() => yt.setPlaybackQuality(q)); safe(() => yt.setPlaybackQualityRange && yt.setPlaybackQualityRange(q === 'default' ? 'auto' : q, q === 'default' ? 'auto' : q)); setTimeout(() => panelOpen && render(), 600); }
function setLayout(l) { layout = l; ls.set(LS.layout, l); applyFill(); render(); }
function applyFill() {
  frame.classList.toggle('pp-fill', layout === 'fill');
  if (layout !== 'fill') { frame.style.removeProperty('--pp-fill'); return; }
  const w = frame.clientWidth, h = frame.clientHeight; if (!w || !h) return;
  const vw = Math.min(w, h * 16 / 9), vh = vw * 9 / 16;
  frame.style.setProperty('--pp-fill', Math.max(w / vw, h / vh).toFixed(3));
}
function syncCC() { const b = g('ppCC'); b.setAttribute('aria-pressed', String(!!ccLang)); }
function ccOn(lang) {
  if (!ready() || typeof yt.loadModule !== 'function') { if (typeof notify === 'function') notify(T('na')); return; }
  safe(() => yt.loadModule('captions'));
  if (lang) safe(() => yt.setOption('captions', 'track', { languageCode: lang }));
  ccLang = lang || 'on'; ls.set(LS.cc, '1'); syncCC();
  setTimeout(() => {
    if (!ccLang) return;
    ccTracks = safe(() => yt.getOption('captions', 'tracklist') || [], []);
    if (!ccTracks.length && typeof notify === 'function') notify(T('nocc'));
    if (panelOpen && (view === 'cc' || view === 'main')) render();
  }, 900);
}
function ccOff() { if (ready()) safe(() => yt.unloadModule('captions')); ccLang = null; ls.set(LS.cc, '0'); syncCC(); }
function stepVol(d) { const v = g('avVolume'); v.value = Math.max(0, Math.min(100, +v.value + d)); v.dispatchEvent(new Event('input')); }

/* ---------- per-tick sync with the real player ---------- */
function onNewVideo(v) {
  g('ppTitle').textContent = v.title || '';
  g('ppMeta').textContent = `${v.subject || ''} • Grade ${v.grade || ''}`;
  g('ppThumb').style.backgroundImage = thumbUrl(v) ? `url(${thumbUrl(v)})` : '';
  const l = playable(), i = curIdx(), n = l[i + 1];
  g('ppUpNext').hidden = !n;
  if (n) {
    g('ppNThumb').style.backgroundImage = `url(${thumbUrl(n)})`;
    g('ppNTitle').textContent = n.title || '';
    g('ppNMeta').textContent = `${n.subject || ''} • Grade ${n.grade || ''}`;
  }
  ccTracks = []; ccLang = null; syncCC(); ccPending = ls.get(LS.cc, '0') === '1';
  applyFill();
}
function sync() {
  if (typeof currentVideo === 'undefined' || !currentVideo) return;
  const v = currentVideo;
  if (v.id !== lastId) { lastId = v.id; onNewVideo(v); }
  g('ppSpeed').textContent = curSpeed() + '×';
  g('ppUpLabel').textContent = T('up'); g('ppShareLabel').textContent = T('share'); g('ppMoreLabel').textContent = T('more');
  const fav = typeof favorites !== 'undefined' && favorites.includes(v.id);
  g('ppSave').setAttribute('aria-pressed', String(fav));
  g('ppSaveLabel').textContent = typeof t === 'function' ? t(fav ? 'saved' : 'save') : (fav ? 'Saved' : 'Save');
  if (!ready()) return;
  if (volFor !== yt && typeof yt.setVolume === 'function') { volFor = yt; const sv = +ls.get(LS.vol, 100); safe(() => yt.setVolume(sv)); }
  const muted = safe(() => yt.isMuted(), false);
  g('btnMute').classList.toggle('is-muted', muted);
  if (!volDrag) g('avVolume').value = muted ? 0 : safe(() => yt.getVolume(), 100);
  g('seek').style.setProperty('--b', (safe(() => yt.getVideoLoadedFraction(), 0) * 100) + '%');
  const q = safe(() => yt.getPlaybackQuality(), ''), badge = g('ppBadge');
  badge.textContent = q === 'hd2160' || q === 'hd1440' ? '4K' : 'HD';
  badge.classList.toggle('hidden', !['hd720', 'hd1080', 'hd1440', 'hd2160'].includes(q));
  if (ccPending && safe(() => yt.getPlayerState(), -1) === 1) { ccPending = false; ccOn(); }
}
new MutationObserver(() => {
  if (modal.classList.contains('hidden')) { clearInterval(timer); timer = null; lastId = null; closeAll(); }
  else if (!timer) { timer = setInterval(sync, 500); sync(); }
}).observe(modal, { attributes: true, attributeFilter: ['class'] });

/* ---------- wiring ---------- */
const on = (id, ev, fn) => g(id).addEventListener(ev, fn);
on('ppPlay2', 'click', () => g('btnPlay').click());
on('ppClose', 'click', () => g('closePlayer').click());
on('ppNext', 'click', () => g('nextLesson').click());
on('ppUpNext', 'click', () => g('nextLesson').click());
on('ppPrev', 'click', () => {
  const l = playable(), i = curIdx();
  if (i > 0) { if (typeof saveProgress === 'function') saveProgress(); openVideo(l[i - 1].id); }
  else if (typeof notify === 'function') notify(T('noprev'));
});
on('ppSettings', 'click', e => { e.stopPropagation(); togglePanel(); });
on('ppSpeed', 'click', e => { e.stopPropagation(); togglePanel(true, 'speed'); });
on('ppCC', 'click', () => (ccLang ? ccOff() : ccOn()));
on('ppSave', 'click', () => { if (currentVideo && typeof toggleFavorite === 'function') { toggleFavorite(currentVideo.id); sync(); } });
on('ppShare', 'click', async () => {
  const title = (currentVideo && currentVideo.title) || 'EduTube', url = location.href.split('#')[0];
  if (navigator.share) { try { await navigator.share({ title, url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(url); notify(T('copied')); } catch { notify(url); }
});
on('ppMore', 'click', e => {
  e.stopPropagation();
  menuOpen = !menuOpen;
  if (menuOpen) {
    if (panelOpen) togglePanel(false);
    menu.replaceChildren(
      btn('pp-item pp-opt', `<span class="pp-ii">${ico('check')}</span><span class="pp-lab"></span>`, () => { g('completeLesson').click(); closeMenu(); }),
      btn('pp-item pp-opt', `<span class="pp-ii">${ico('share')}</span><span class="pp-lab"></span>`, () => { closeMenu(); g('ppShare').click(); }),
      btn('pp-item pp-opt', `<span class="pp-ii">${ico('sliders')}</span><span class="pp-lab"></span>`, () => { closeMenu(); togglePanel(true, 'adv'); }));
    [T('done'), T('copy'), T('adv')].forEach((s, i) => { menu.children[i].children[1].textContent = s; menu.children[i].children[0].style.opacity = 1; });
  }
  menu.classList.toggle('hidden', !menuOpen); g('ppMore').setAttribute('aria-expanded', String(menuOpen)); keep();
});
on('avVolume', 'pointerdown', () => { volDrag = true; });
['pointerup', 'pointercancel', 'change'].forEach(ev => on('avVolume', ev, () => { volDrag = false; }));
on('avVolume', 'input', () => {
  if (!ready()) return; const v = +g('avVolume').value;
  safe(() => { yt.setVolume(v); if (v > 0 && yt.isMuted()) yt.unMute(); else if (v === 0 && !yt.isMuted()) yt.mute(); });
  ls.set(LS.vol, v);
});
document.addEventListener('click', e => { if ((panelOpen || menuOpen) && !e.target.closest('#ppPanel,#ppMenu,#ppSettings,#ppSpeed,#ppMore')) closeAll(); });
frame.addEventListener('pointermove', () => { if (typeof showControls === 'function') showControls(); }, { passive: true });
/* mouse double-click = fullscreen (touch double-tap keeps ±10s / play from script.js) */
g('tapLayer').addEventListener('click', e => {
  if (e.detail >= 2 && e.pointerType === 'mouse') { e.stopImmediatePropagation(); lastTap = 0; if (typeof toggleFull === 'function') toggleFull(); }
}, true);
document.addEventListener('keydown', e => {
  if (modal.classList.contains('hidden') || e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = e.target.tagName || '';
  if (/^(TEXTAREA|SELECT)$/.test(tag) || (tag === 'INPUT' && e.target.type !== 'range' && e.target.type !== 'checkbox')) return;
  const k = e.key;
  if (k === 'Escape' && (panelOpen || menuOpen)) { e.preventDefault(); e.stopImmediatePropagation(); closeAll(); return; }
  if (!ready()) return;
  if (k === 'ArrowUp' || k === 'ArrowDown') { e.preventDefault(); stepVol(k === 'ArrowUp' ? 10 : -10); if (typeof showControls === 'function') showControls(); }
  else if (k === 'c' || k === 'C') { e.preventDefault(); ccLang ? ccOff() : ccOn(); }
  else if (k === '<' || k === '>') stepSpeed(k === '>' ? 1 : -1);
}, true);
['resize', 'orientationchange', 'fullscreenchange', 'webkitfullscreenchange'].forEach(ev => window.addEventListener(ev, () => setTimeout(applyFill, 120)));
document.addEventListener('fullscreenchange', () => setTimeout(applyFill, 120));
syncCC();
})();
