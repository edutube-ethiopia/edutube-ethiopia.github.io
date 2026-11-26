/* Site interaction recovery shim for delegated controls. */
(function () {
  "use strict";
  function page(name) {
    var target = document.getElementById("page-" + name);
    if (!target) return false;
    document.querySelectorAll(".page").forEach(function (p) { p.classList.remove("active"); });
    target.classList.add("active");
    document.querySelectorAll("[data-page]").forEach(function (b) { b.classList.toggle("active", b.dataset.page === name); });
    var side = document.getElementById("sidebar");
    if (side) side.classList.remove("open");
    document.body.classList.remove("menu-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }
  function go(name) { if (typeof window.showPage === "function") window.showPage(name); else page(name); }
  document.addEventListener("click", function (e) {
    var nav = e.target.closest("[data-page]");
    if (nav) { go(nav.dataset.page); e.preventDefault(); e.stopImmediatePropagation(); return; }
    var grade = e.target.closest("[data-grade]");
    if (grade) {
      var select = document.getElementById("videoGrade");
      if (select) select.value = grade.dataset.grade;
      go("library");
      if (typeof window.renderVideos === "function") window.renderVideos();
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    var subject = e.target.closest("[data-home-subject]");
    if (subject) {
      var sub = document.getElementById("videoSubject");
      if (sub) sub.value = subject.dataset.homeSubject;
      go("library");
      if (typeof window.renderVideos === "function") window.renderVideos();
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (e.target.closest("#menuButton")) {
      var sidebar = document.getElementById("sidebar");
      if (sidebar) sidebar.classList.toggle("open");
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (e.target.closest("#themeButton")) {
      document.body.classList.toggle("light");
      try { localStorage.setItem("edutube_v4_theme", document.body.classList.contains("light") ? "light" : "dark"); } catch (_) {}
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (e.target.closest("#languageButton")) {
      if (typeof window.toggleLanguage === "function") window.toggleLanguage();
      else {
        document.documentElement.lang = document.documentElement.lang === "en" ? "am" : "en";
        var b = document.getElementById("languageButton");
        if (b) b.textContent = document.documentElement.lang === "en" ? "አማ" : "EN";
      }
      e.preventDefault(); e.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "hpSearch") {
      e.preventDefault(); e.stopImmediatePropagation();
      var q = document.getElementById("hpSearchInput"), box = document.getElementById("videoSearch");
      if (box && q) { box.value = q.value; box.dispatchEvent(new Event("input", { bubbles: true })); }
      go("library");
    }
  }, true);
})();
