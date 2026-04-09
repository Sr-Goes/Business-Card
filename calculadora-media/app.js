(function () {
  "use strict";

  var btn = document.getElementById("btnCalc");
  var out = document.getElementById("result");
  if (!btn || !out) return;

  function readNote(id) {
    var el = document.getElementById(id);
    if (!el || el.value === "") return NaN;
    var v = parseFloat(String(el.value).replace(",", "."));
    return v;
  }

  function calcular() {
    var n1 = readNote("n1");
    var n2 = readNote("n2");
    var n3 = readNote("n3");
    var n4 = readNote("n4");

    if ([n1, n2, n3, n4].some(function (x) { return Number.isNaN(x); })) {
      out.className = "result is-fail";
      out.textContent = "Preencha as quatro notas com números válidos.";
      return;
    }

    if ([n1, n2, n3, n4].some(function (x) { return x < 0 || x > 10; })) {
      out.className = "result is-fail";
      out.textContent = "As notas devem estar entre 0 e 10.";
      return;
    }

    var media = (n1 + n2 + n3 + n4) / 4;
    var fixa = media.toFixed(1);

    if (media >= 6) {
      out.className = "result is-ok";
      out.textContent = "Parabéns, você foi aprovado! Sua média é " + fixa + ".";
    } else {
      out.className = "result is-fail";
      out.textContent =
        "Ainda não atingiu a média. Sua média é " + fixa + ". Na próxima você consegue!";
    }
  }

  btn.addEventListener("click", calcular);
})();
