/* EduTube Ethiopia — Home Pro. Additive: icon sprite, nav icons, home page behaviour, English/Amharic text for the new home page. */
(function () {
  "use strict";
  var P = {
    home: '<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    video: '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M10 9.500v5l4.500-2.500z"/>',
    exam: '<path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z"/><rect x="5" y="5.500" width="14" height="16" rx="2"/><path d="M9 13l2 2 4-4"/>',
    notes: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    heart: '<path d="M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
    trophy: '<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.500 14L7 22l5-3 5 3-1.500-8"/>',
    spark: '<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 16l.8 2.200L22 19l-2.200.8L19 22l-.8-2.200L16 19l2.200-.8z"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    moon: '<path d="M20 14.500A8 8 0 1 1 9.500 4a6.500 6.500 0 0 0 10.500 10.500z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.500 9 2.500 12 0v-5M22 9v6"/>',
    math: '<path d="M18 5H7l6 7-6 7h11"/>',
    atom: '<circle cx="12" cy="12" r="1.500"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 14h8"/>',
    bio: '<path d="M5 19C5 10 10 5 20 4c0 10-5 15-15 15zM5 19l8-8"/>',
    text: '<path d="M4 20L10 4l6 16M6.500 14h7M19 8v12"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    landmark: '<path d="M3 9l9-5 9 5zM5 10v8M10 10v8M14 10v8M19 10v8M3 21h18"/>',
    trend: '<path d="M3 17l6-6 4 4 8-9M15 6h6v6"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'
  };
  function ic(name, cls) {
    return '<svg class="' + (cls || "hp-nav-ic") + '" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  var T = {
    en: {},
    am: {
      heroChip: "ለ9–12ኛ ክፍል ነፃ ትምህርት", h1a: "ዛሬ ይማሩ።", h1b: "ነገን ይምሩ።",
      heroText: "የቪዲዮ ትምህርቶችን ይመልከቱ፣ በፈተናዎች ይለማመዱ፣ ማስታወሻዎችን ያንብቡ፣ እድገትዎንም ይከታተሉ። ሁሉም በአንድ ቦታ።",
      searchPh: "ትምህርት ይፈልጉ፣ ለምሳሌ የኒውተን ሕግጋት", searchBtn: "ፈልግ", jumpTo: "ወደ", grade: "ክፍል",
      ctaExam: "የልምምድ ፈተና ይሞክሩ", ctaStudio: "የጥናት ስቱዲዮ",
      snapTitle: "የትምህርት ሁኔታዎ", snapHint: "ትምህርት ሲያጠናቅቁ ይሞላል።", statLessons: "የተጠናቀቁ ትምህርቶች", statQuizzes: "የተወሰዱ ፈተናዎች", statSaved: "የተቀመጡ ትምህርቶች",
      gradesTitle: "ክፍልዎን ይምረጡ", gradesText: "ከደረጃዎ ጋር የተስማሙ ትምህርቶች፣ ማስታወሻዎች እና ፈተናዎች።", openLessons: "ትምህርቶችን ክፈት",
      g9: "ጠንካራ መሠረት ይገንቡ", g10: "ክህሎትዎን ያሳድጉ", g11: "ለሚቀጥለው ይዘጋጁ", g12: "ለፈተና ይዘጋጁ",
      featTitle: "ሁሉም በአንድ የጥናት ቦታ", featText: "ትምህርት፣ ልምምድ፣ ክለሳ እና እድገት በአንድ ላይ።",
      fVideos: "የቪዲዮ ትምህርቶች", fVideosD: "በክፍልና በትምህርት ዓይነት ይፈልጉ፤ ለጥናት በተዘጋጀ ማጫወቻ ይመልከቱ።",
      fExams: "የልምምድ ፈተናዎች", fExamsD: "እውቀትዎን በጊዜ በተገደቡ ጥያቄዎች ይፈትሹ።",
      fNotes: "የጥናት ማስታወሻዎች", fNotesD: "በክፍል፣ በትምህርት እና በምዕራፍ ያንብቡ።",
      fStudio: "የጥናት ስቱዲዮ", fStudioD: "የትኩረት ሰዓት፣ ተግባሮች እና ፍላሽ ካርዶች።",
      fProgress: "የእድገት ክትትል", fProgressD: "የተጠናቀቁ ትምህርቶችንና እንቅስቃሴዎን ይመልከቱ።",
      fFav: "የተቀመጡ ተወዳጆች", fFavD: "ጠቃሚ ትምህርቶችን በቅርብ ያስቀምጡ።",
      fCert: "የምስክር ወረቀቶች", fCertD: "ያጠናቀቁትን የሚያሳይ ወረቀት ያትሙ።",
      fAi: "የAI ጥናት ረዳት", fAiD: "ማብራሪያና የጥናት እቅድ ይጠይቁ።",
      fBoard: "የደረጃ ሰንጠረዥ", fBoardD: "እንቅስቃሴዎ ከሌሎች ጋር እንዴት እንደሚነጻጸር ይመልከቱ።",
      howTitle: "እንዴት ይሰራል",
      s1: "ይመልከቱ", s1d: "በክፍልና በትምህርት ዓይነት ትምህርት ይምረጡ።", s2: "ይለማመዱ", s2d: "በፈተና ጥያቄዎች ራስዎን ይፈትሹ።",
      s3: "ይከልሱ", s3d: "ማስታወሻዎችን ያንብቡ፣ ተወዳጆችን ያስቀምጡ።", s4: "ይከታተሉ", s4d: "እድገትዎን ይመልከቱ፣ የምስክር ወረቀት ያግኙ።",
      subjTitle: "ቀጣይ ርዕስዎን ያግኙ", subjText: "የቪዲዮ ቤተ-መጻሕፍትን በትምህርት ዓይነት ተጣርቶ ይክፈቱ።",
      studioTitle: "እያንዳንዱን ደቂቃ ይጠቀሙ", studioText: "እዚሁ የትኩረት ክፍለ ጊዜ ይጀምሩ፤ ወይም ተግባሮችን ለማቀድና ፍላሽ ካርዶችን ለመስራት የጥናት ስቱዲዮን ይክፈቱ።",
      openStudio: "የጥናት ስቱዲዮን ክፈት", timerStart: "ትኩረት ጀምር", timerPause: "አቁም", timerReset: "ዳግም አስጀምር",
      ctaTitle: "መማር ለመቀጠል ዝግጁ ነዎት?", ctaText: "ትምህርት ይምረጡ፣ ጥያቄ ይለማመዱ፣ በራስዎ ፍጥነት ይራመዱ።", ctaStart: "የቪዲዮ ቤተ-መጻሕፍትን ክፈት"
    }
  };
  var lang = function () { return document.documentElement.lang === "am" ? "am" : "en"; };
  var enCache = {};
  function applyText() {
    var l = lang();
    document.querySelectorAll("[data-hp]").forEach(function (el) {
      var k = el.getAttribute("data-hp");
      if (!(k in enCache)) enCache[k] = el.innerHTML;
      var v = l === "am" && T.am[k] ? T.am[k] : enCache[k];
      if (k === "timerStart" || k === "timerPause") return;
      el.innerHTML = v;
    });
    document.querySelectorAll("[data-hp-ph]").forEach(function (el) {
      var k = el.getAttribute("data-hp-ph");
      if (!el.dataset.en) el.dataset.en = el.placeholder;
      el.placeholder = l === "am" && T.am[k] ? T.am[k] : el.dataset.en;
    });
    setTimerLabel();
  }
  function tr(k, fallback) { return lang() === "am" && T.am[k] ? T.am[k] : fallback; }

  /* ---- sprite ---- */
  function injectSprite() {
    if (document.getElementById("hpSprite")) return;
    var s = '<svg id="hpSprite" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">';
    Object.keys(P).forEach(function (k) { s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + P[k] + "</symbol>"; });
    document.body.insertAdjacentHTML("afterbegin", s + "</svg>");
  }

  /* ---- icons for existing navigation (added next to the existing labels; nothing removed) ---- */
  var MAP = { home: "home", library: "video", exams: "exam", notes: "notes", contact: "chat", favorites: "heart", dashboard: "chart", studio: "timer", accounts: "user", notifications: "bell", leaderboard: "trophy", certificates: "award", ai: "spark", admin: "layers" };
  function addNavIcons() {
    document.querySelectorAll(".side-link[data-page]").forEach(function (b) {
      if (b.querySelector(".hp-nav-ic")) return;
      var first = b.firstElementChild;
      if (first && first.tagName === "SPAN" && !/[A-Za-z]/.test(first.textContent) && first.textContent.trim()) first.remove();
      b.insertAdjacentHTML("afterbegin", ic(MAP[b.dataset.page] || "home"));
    });
    document.querySelectorAll(".mobile-nav button[data-page]").forEach(function (b) {
      if (b.querySelector(".hp-nav-ic")) return;
      var sm = b.querySelector("small");
      if (sm && /^[^A-Za-z]+\s*Studio/.test(sm.textContent)) sm.textContent = "Studio";
      b.insertAdjacentHTML("afterbegin", ic(MAP[b.dataset.page] || "home"));
    });
    var pairs = [["themeButton", "moon"], ["menuButton", "menu"], ["notificationShortcut", "bell"], ["accountShortcut", "user"]];
    pairs.forEach(function (p) {
      var b = document.getElementById(p[0]);
      if (!b || b.querySelector(".hp-nav-ic")) return;
      /* wrap any plain text so it can be hidden on phones while the icon stays */
      Array.prototype.slice.call(b.childNodes).forEach(function (n) {
        if (n.nodeType === 3 && n.textContent.trim()) { var s = document.createElement("span"); s.className = "hp-label"; s.textContent = n.textContent; b.replaceChild(s, n); }
      });
      b.insertAdjacentHTML("afterbegin", ic(p[1]));
    });
  }

  /* ---- progress ring bound to the existing #homeProgress value ---- */
  function syncRing() {
    var el = document.getElementById("homeProgress"), fg = document.getElementById("hpRingFg");
    if (!el || !fg) return;
    var n = parseFloat(el.textContent) || 0; n = Math.max(0, Math.min(100, n));
    fg.style.strokeDashoffset = 326.7 * (1 - n / 100);
  }

  /* ---- hero search -> existing library filter ---- */
  function goLibrary() {
    if (typeof window.showPage === "function") window.showPage("library");
    else { var b = document.querySelector('[data-page="library"]'); if (b) b.click(); }
  }
  function initSearch() {
    var f = document.getElementById("hpSearch"); if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = document.getElementById("hpSearchInput").value.trim();
      var box = document.getElementById("videoSearch");
      if (box) { box.value = q; box.dispatchEvent(new Event("input", { bubbles: true })); }
      goLibrary();
    });
  }

  /* ---- focus timer ---- */
  var total = 25 * 60, left = total, tick = null, CIRC = 565.5;
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r; }
  function paint() {
    var t = document.getElementById("hpTime"), fg = document.getElementById("hpTimerFg");
    if (t) t.textContent = fmt(left);
    if (fg) fg.style.strokeDashoffset = CIRC * (1 - left / total);
  }
  function setTimerLabel() {
    var b = document.getElementById("hpTimerToggle"); if (!b) return;
    b.textContent = tick ? tr("timerPause", "Pause") : tr("timerStart", "Start focus");
    var r = document.getElementById("hpTimerReset"); if (r) r.textContent = tr("timerReset", "Reset");
  }
  function stop() { if (tick) { clearInterval(tick); tick = null; } setTimerLabel(); }
  function initTimer() {
    var toggle = document.getElementById("hpTimerToggle"); if (!toggle) return;
    toggle.addEventListener("click", function () {
      if (tick) { stop(); return; }
      if (left <= 0) left = total;
      tick = setInterval(function () {
        left -= 1; paint();
        if (left <= 0) { stop(); if (typeof window.notify === "function") window.notify(lang() === "am" ? "የትኩረት ክፍለ ጊዜ ተጠናቋል!" : "Focus session complete!"); }
      }, 1000);
      setTimerLabel();
    });
    document.getElementById("hpTimerReset").addEventListener("click", function () { stop(); left = total; paint(); });
    document.querySelectorAll(".hp-presets button").forEach(function (b) {
      b.addEventListener("click", function () {
        stop(); total = left = parseInt(b.dataset.min, 10) * 60;
        document.querySelectorAll(".hp-presets button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        paint();
      });
    });
    paint(); setTimerLabel();
  }

  function init() {
    injectSprite(); addNavIcons(); initSearch(); initTimer(); applyText(); syncRing();
    var hp = document.getElementById("homeProgress");
    if (hp) new MutationObserver(syncRing).observe(hp, { childList: true, characterData: true, subtree: true });
    new MutationObserver(applyText).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    /* script.js re-renders after language changes; re-sync once things settle */
    document.addEventListener("click", function (e) { if (e.target.closest("#languageButton")) setTimeout(function () { applyText(); syncRing(); }, 60); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
