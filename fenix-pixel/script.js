(function () {
  "use strict";

  var scene = document.getElementById("scene");
  var phoenix = document.getElementById("phoenix");
  var embersRoot = document.getElementById("embers-root");

  if (!scene || !phoenix || !embersRoot) return;

  var speed = 5.5;
  var speedHome = 4.5;
  var arriveDist = 14;
  var homeX = 0;
  var homeY = 0;
  var px = 0;
  var py = 0;
  var targetX = 0;
  var targetY = 0;
  var pointerDown = false;
  var facing = 1;
  var emberAcc = 0;
  var maxEmbers = 80;

  function layoutHome() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    homeX = w * 0.18;
    homeY = h * 0.42;
    if (!pointerDown) {
      px = homeX;
      py = homeY;
    }
  }

  function setTransform() {
    phoenix.style.transform =
      "translate(" +
      px +
      "px, " +
      py +
      "px) translate(-50%, -50%) scaleX(" +
      facing +
      ")";
  }

  function dist(ax, ay, bx, by) {
    var dx = bx - ax;
    var dy = by - ay;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function moveToward(tx, ty, spd) {
    var d = dist(px, py, tx, ty);
    if (d < 0.5) return true;
    var step = Math.min(spd, d);
    px += ((tx - px) / d) * step;
    py += ((ty - py) / d) * step;
    return false;
  }

  function spawnEmber(intensity) {
    if (embersRoot.children.length >= maxEmbers) {
      embersRoot.removeChild(embersRoot.firstChild);
    }
    var el = document.createElement("span");
    el.className = "ember";
    var rect = phoenix.getBoundingClientRect();
    var cx = rect.left + rect.width * 0.5;
    var tailX = cx - facing * (rect.width * 0.38) + (Math.random() - 0.5) * 20;
    var tailY = rect.top + rect.height * 0.62 + (Math.random() - 0.5) * 14;
    el.style.left = tailX + "px";
    el.style.top = tailY + "px";
    var dx = (-10 - Math.random() * 18) * (facing || 1);
    var dy = 8 + Math.random() * 28;
    if (intensity > 1.2) {
      dy += 10;
      dx *= 1.3;
    }
    el.style.setProperty("--dx", dx + "px");
    el.style.setProperty("--dy", dy + "px");
    embersRoot.appendChild(el);
    window.setTimeout(function () {
      if (el.parentNode === embersRoot) {
        embersRoot.removeChild(el);
      }
    }, 950);
  }

  function onPointerDown(ev) {
    if (ev.target.closest(".back")) return;
    pointerDown = true;
    targetX = ev.clientX;
    targetY = ev.clientY;
    scene.setPointerCapture(ev.pointerId);
  }

  function onPointerMove(ev) {
    if (!pointerDown) return;
    targetX = ev.clientX;
    targetY = ev.clientY;
  }

  function onPointerUp(ev) {
    pointerDown = false;
    phoenix.classList.remove("phoenix--combust");
    try {
      scene.releasePointerCapture(ev.pointerId);
    } catch (_e) {
      /* ignore */
    }
  }

  scene.addEventListener("pointerdown", onPointerDown);
  scene.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("resize", layoutHome);

  layoutHome();
  setTransform();

  function tick() {
    var atTarget = false;
    var combust = false;

    if (pointerDown) {
      atTarget = dist(px, py, targetX, targetY) < arriveDist;
      if (atTarget) {
        combust = true;
        phoenix.classList.add("phoenix--combust");
      } else {
        phoenix.classList.remove("phoenix--combust");
        moveToward(targetX, targetY, speed);
      }
      if (Math.abs(targetX - px) > 2) {
        facing = targetX >= px ? 1 : -1;
      }
    } else {
      phoenix.classList.remove("phoenix--combust");
      moveToward(homeX, homeY, speedHome);
      if (Math.abs(homeX - px) > 2) {
        facing = homeX >= px ? 1 : -1;
      }
    }

    setTransform();

    var rate = combust ? 0.55 : pointerDown ? 0.22 : 0.12;
    emberAcc += rate;
    while (emberAcc >= 1) {
      emberAcc -= 1;
      spawnEmber(combust ? 1.5 : 1);
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
