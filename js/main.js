(() => {
  const botao = document.getElementById("btn-menu");
  const menu = document.getElementById("menu-principal");
  if (botao && menu) {
    document.body.classList.add("js-menu");
    const fecharMenu = () => {
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    };

    botao.addEventListener("click", () => {
      const aberto = botao.getAttribute("aria-expanded") !== "true";
      botao.setAttribute("aria-expanded", String(aberto));
      botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
        fecharMenu();
        if (window.matchMedia("(max-width: 767px)").matches) botao.focus();
      }
    });

    window.matchMedia("(min-width: 768px)").addEventListener("change", (evento) => {
      if (evento.matches) fecharMenu();
    });
  }

  const camposCep = document.querySelectorAll("#cep, #cep-visita");
  camposCep.forEach((campo) => {
    campo.addEventListener("input", () => {
      if (!/^\d{0,5}-?\d{0,3}$/.test(campo.value)) return;
      const digitos = campo.value.replace(/\D/g, "").slice(0, 8);
      campo.value = digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos;
    });
  });
})();
