(() => {
  const formulario = document.getElementById("filtros-animais");
  if (!formulario) return;

  const classe = document.getElementById("filtro-classe");
  const alimentacao = document.getElementById("filtro-alimentacao");
  const bioma = document.getElementById("filtro-bioma");
  const animais = document.querySelectorAll("#lista-animais article[data-classe]");
  const aviso = document.getElementById("aviso-filtro-vazio");

  function atualizarFiltros() {
    let encontrados = 0;
    animais.forEach((animal) => {
      const corresponde =
        (classe.value === "todos" || animal.dataset.classe === classe.value) &&
        (alimentacao.value === "todos" || animal.dataset.alimentacao === alimentacao.value) &&
        (bioma.value === "todos" || animal.dataset.bioma.split(" ").includes(bioma.value));
      animal.hidden = !corresponde;
      if (corresponde) encontrados += 1;
    });
    aviso.textContent = encontrados ? "" : "Nenhum animal encontrado com esses filtros.";
  }

  formulario.addEventListener("change", atualizarFiltros);
  formulario.addEventListener("submit", (evento) => evento.preventDefault());
  formulario.addEventListener("reset", () => {
    window.setTimeout(atualizarFiltros, 0);
  });
  atualizarFiltros();
})();
