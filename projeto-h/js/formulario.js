(function () {
  "use strict";

  var form = document.getElementById("formRegistroDose");
  var ok = document.getElementById("formFeedback");
  if (!form) {
    return;
  }

  function hideOk() {
    if (ok) {
      ok.hidden = true;
      ok.classList.remove("is-visible");
      ok.textContent = "";
    }
  }

  function showOk() {
    hideOk();
    if (ok) {
      ok.textContent =
        "Demonstração concluída: em um sistema real, estes dados seriam validados e guardados com segurança. Aqui nada foi enviado nem armazenado.";
      ok.hidden = false;
      ok.classList.add("is-visible");
    }
    form.reset();
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    hideOk();
    if (!form.reportValidity()) {
      return;
    }
    showOk();
  });
})();
