(() => {
  const formulario = document.getElementById("formulario-cadastro");
  if (!formulario) return;

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");
  const assunto = document.getElementById("assunto");
  const mensagem = document.getElementById("mensagem");
  const contador = document.getElementById("contador-mensagem");
  const feedback = document.getElementById("feedback-cadastro");
  formulario.querySelector('button[type="submit"]').disabled = false;

  telefone.addEventListener("input", () => {
    if (!/^[\d() -]*$/.test(telefone.value)) return;
    const digitos = telefone.value.replace(/\D/g, "").slice(0, 11);
    if (digitos.length <= 2) {
      telefone.value = digitos ? `(${digitos}` : "";
    } else {
      const ddd = digitos.slice(0, 2);
      const numero = digitos.slice(2);
      const divisao = numero.length > 8 ? 5 : 4;
      telefone.value = `(${ddd}) ${numero.slice(0, divisao)}${numero.length > divisao ? `-${numero.slice(divisao)}` : ""}`;
    }
  });

  function atualizarContador() {
    contador.textContent = `${mensagem.value.length} ${mensagem.value.length === 1 ? "caractere" : "caracteres"}`;
  }
  mensagem.addEventListener("input", atualizarContador);
  atualizarContador();

  function erro(campo, texto) {
    document.getElementById(`erro-${campo.id}`).textContent = texto;
    if (texto) campo.setAttribute("aria-invalid", "true");
    else campo.removeAttribute("aria-invalid");
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    feedback.textContent = "";
    feedback.classList.remove("sucesso", "erro");

    const verificacoes = [
      [nome, nome.value.trim() ? "" : "Informe seu nome completo."],
      [email, email.validity.valid && email.value.trim() ? "" : "Informe um e-mail válido."],
      [telefone, !telefone.value || /^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone.value) ? "" : "Informe um telefone com DDD."],
      [cep, !cep.value || /^\d{5}-?\d{3}$/.test(cep.value) ? "" : "Digite um CEP com 8 números."],
      [assunto, assunto.value ? "" : "Selecione um assunto."]
    ];

    verificacoes.forEach(([campo, texto]) => {
      if (campo === cep && !texto) {
        document.getElementById("erro-cep").textContent = "";
      } else {
        erro(campo, texto);
      }
    });
    const primeiroErro = verificacoes.find(([, texto]) => texto);
    if (primeiroErro) {
      feedback.textContent = "Confira os campos indicados antes de continuar.";
      feedback.classList.add("erro");
      primeiroErro[0].focus();
      return;
    }

    feedback.textContent = "Formulário validado para demonstração. Nenhum dado foi enviado ou armazenado.";
    feedback.classList.add("sucesso");
  });

  formulario.addEventListener("input", (evento) => {
    const campo = evento.target;
    if (campo.id && document.getElementById(`erro-${campo.id}`)) {
      if (campo === cep) document.getElementById("erro-cep").textContent = "";
      else erro(campo, "");
    }
    feedback.textContent = "";
    feedback.classList.remove("sucesso", "erro");
  });
})();
