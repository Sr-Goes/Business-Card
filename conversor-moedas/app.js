(function () {
  "use strict";

  var btn = document.getElementById("btnConv");
  var reaisEl = document.getElementById("reais");
  var cotEl = document.getElementById("cotacao");
  var out = document.getElementById("result");

  if (!btn || !reaisEl || !cotEl || !out) return;

  function parseNum(s) {
    if (s == null) return NaN;
    var t = String(s).trim().replace(/\s/g, "").replace(",", ".");
    return parseFloat(t);
  }

  function formatUsd(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "USD" });
  }

  function converter() {
    var reais = parseNum(reaisEl.value);
    var cotacao = parseNum(cotEl.value);

    if (Number.isNaN(reais) || Number.isNaN(cotacao)) {
      out.className = "result is-warn";
      out.textContent = "Preencha valor em reais e cotação com números válidos (use vírgula ou ponto).";
      return;
    }

    if (reais < 0 || cotacao <= 0) {
      out.className = "result is-warn";
      out.textContent = "O valor em reais não pode ser negativo e a cotação deve ser maior que zero.";
      return;
    }

    var usd = reais / cotacao;
    out.className = "result";
    out.textContent =
      "Com cotação R$ " +
      cotacao.toFixed(2).replace(".", ",") +
      " por USD, " +
      reais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) +
      " ≈ " +
      formatUsd(usd) +
      " (apenas demonstração — consulte taxas oficiais para transações reais).";
  }

  btn.addEventListener("click", converter);
})();
