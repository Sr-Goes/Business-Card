(function () {
  "use strict";

  var STORAGE_KEY = "jpgoes-theme";
  var body = document.body;
  var btn = document.getElementById("temaBtn");

  function setDark(on) {
    body.classList.toggle("dark", on);
    if (btn) {
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
    try {
      localStorage.setItem(STORAGE_KEY, on ? "dark" : "light");
    } catch (_e) {
      /* ignore quota / private mode */
    }
  }

  function initTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (_e) {
      stored = null;
    }
    if (stored === "dark" || stored === "light") {
      setDark(stored === "dark");
      return;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
    }
  }

  function toggleTheme() {
    setDark(!body.classList.contains("dark"));
  }

  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }

  initTheme();

  (function initConquistasSlider() {
    var track = document.getElementById("conquistasTrack");
    var prev = document.getElementById("conquistasPrev");
    var next = document.getElementById("conquistasNext");
    if (!track || !prev || !next) {
      return;
    }

    var slides = track.querySelectorAll(".conquista-slide");
    if (!slides.length) {
      return;
    }

    function gapPx() {
      var g = window.getComputedStyle(track).gap;
      var n = parseFloat(g);
      return Number.isFinite(n) ? n : 16;
    }

    function step() {
      return slides[0].getBoundingClientRect().width + gapPx();
    }

    function updateButtons() {
      var max = track.scrollWidth - track.clientWidth;
      var left = track.scrollLeft;
      var slack = 4;
      prev.disabled = left <= slack;
      next.disabled = left >= max - slack;
    }

    function scrollByDir(dir) {
      var reduceMotion =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollBy({
        left: dir * step(),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    prev.addEventListener("click", function () {
      scrollByDir(-1);
    });

    next.addEventListener("click", function () {
      scrollByDir(1);
    });

    track.addEventListener("scroll", function () {
      window.requestAnimationFrame(updateButtons);
    });

    window.addEventListener("resize", function () {
      window.requestAnimationFrame(updateButtons);
    });

    track.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        scrollByDir(-1);
      } else if (ev.key === "ArrowRight") {
        ev.preventDefault();
        scrollByDir(1);
      }
    });

    updateButtons();
  })();
})();
