(function () {
  "use strict";

  var numeroSecreto;
  var btnChutar = document.getElementById("btnChutar");
  var btnNovo = document.getElementById("btnNovo");
  var input = document.getElementById("valor");
  var el = document.getElementById("resultado");

  if (!btnChutar || !btnNovo || !input || !el) return;

  function sortear() {
    numeroSecreto = Math.floor(Math.random() * 14);
  }

  function chutar() {
    var raw = input.value.trim();
    var chute = parseInt(raw, 10);

    if (raw === "" || Number.isNaN(chute)) {
      el.textContent = "Digite um número inteiro.";
      return;
    }

    if (chute < 0 || chute > 13) {
      el.textContent = "O palpite precisa estar entre 0 e 13.";
      return;
    }

    if (chute === numeroSecreto) {
      el.textContent = "Você acertou! Era o " + numeroSecreto + ".";
      return;
    }

    if (chute < numeroSecreto) {
      el.textContent = "Errou — o número é maior que " + chute + ".";
    } else {
      el.textContent = "Errou — o número é menor que " + chute + ".";
    }
  }

  function novoJogo() {
    sortear();
    input.value = "";
    el.textContent = "Novo número sorteado. Boa sorte!";
  }

  sortear();
  btnChutar.addEventListener("click", chutar);
  btnNovo.addEventListener("click", novoJogo);
})();
