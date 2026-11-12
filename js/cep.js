(() => {
  const campoVisita = document.getElementById("cep-visita");
  const campoCadastro = document.getElementById("cep");
  const campo = campoVisita || campoCadastro;

  if (!campo) return;

  const isVisita = Boolean(campoVisita);
  const status = document.getElementById(isVisita ? "resultado-cep-visita" : "status-cep");
  const botao = isVisita ? document.getElementById("btn-buscar-cep-visita") : null;
  const camposEndereco = isVisita ? {} : {
    logradouro: document.getElementById("rua"),
    bairro: document.getElementById("bairro"),
    localidade: document.getElementById("cidade"),
    uf: document.getElementById("estado")
  };
  let requisicao = null;
  let cepEmConsulta = "";
  let ultimoCepConsultado = "";
  let preenchidos = {};

  function atualizarStatus(mensagem, estado) {
    status.textContent = mensagem;
    status.classList.remove("carregando", "sucesso", "erro");
    if (estado) status.classList.add(estado);
  }

  function cancelarConsulta() {
    if (requisicao) requisicao.abort();
    requisicao = null;
    cepEmConsulta = "";
    if (botao) botao.disabled = false;
  }

  function limparEnderecoPreenchido() {
    for (const [chave, valor] of Object.entries(preenchidos)) {
      if (camposEndereco[chave].value === valor) camposEndereco[chave].value = "";
    }
    preenchidos = {};
  }

  function cepNormalizado() {
    const valor = campo.value.trim();
    return /^\d{5}-?\d{3}$/.test(valor) ? valor.replace("-", "") : "";
  }

  async function consultarCep() {
    const cep = cepNormalizado();

    if (!cep) {
      cancelarConsulta();
      campo.setAttribute("aria-invalid", "true");
      atualizarStatus("Digite um CEP com 8 números.", "erro");
      return;
    }

    if (cep === cepEmConsulta || cep === ultimoCepConsultado) return;
    cancelarConsulta();
    const controlador = new AbortController();
    requisicao = controlador;
    cepEmConsulta = cep;
    const valoresIniciais = Object.fromEntries(
      Object.entries(camposEndereco).map(([chave, elemento]) => [chave, elemento.value])
    );
    campo.removeAttribute("aria-invalid");
    atualizarStatus("Buscando endereço...", "carregando");
    if (botao) botao.disabled = true;

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        signal: controlador.signal
      });
      if (!resposta.ok) throw new Error(`ViaCEP: HTTP ${resposta.status}`);
      const dados = await resposta.json();
      if (requisicao !== controlador) return;
      if (dados && dados.erro === true) {
        campo.setAttribute("aria-invalid", "true");
        atualizarStatus("Não encontramos esse CEP. Confira os números e tente novamente.", "erro");
        return;
      }
      if (!dados || typeof dados.localidade !== "string" || !dados.localidade.trim() ||
          typeof dados.uf !== "string" || !dados.uf.trim() ||
          typeof dados.logradouro !== "string" || typeof dados.bairro !== "string") {
        throw new Error("ViaCEP retornou um endereço incompleto.");
      }

      if (isVisita) {
        const rua = dados.logradouro.trim() || "logradouro não informado";
        const bairro = dados.bairro.trim() || "bairro não informado";
        atualizarStatus(`Você vai sair de ${rua}, ${bairro} - ${dados.localidade}/${dados.uf}.`, "sucesso");
      } else {
        for (const [chave, elemento] of Object.entries(camposEndereco)) {
          if (elemento.value === valoresIniciais[chave]) {
            elemento.value = dados[chave];
            preenchidos[chave] = dados[chave];
          }
        }
        atualizarStatus("Endereço encontrado.", "sucesso");
      }
      ultimoCepConsultado = cep;
    } catch (erro) {
      if (controlador.signal.aborted) return;
      console.error("Erro ao consultar o ViaCEP:", erro);
      atualizarStatus("Não foi possível consultar o CEP agora. Tente novamente em instantes.", "erro");
    } finally {
      if (requisicao === controlador) {
        requisicao = null;
        cepEmConsulta = "";
        if (botao) botao.disabled = false;
      }
    }
  }

  campo.addEventListener("input", () => {
    cancelarConsulta();
    ultimoCepConsultado = "";
    limparEnderecoPreenchido();
    campo.removeAttribute("aria-invalid");
    atualizarStatus("", "");
    if (!isVisita && cepNormalizado()) consultarCep();
  });

  if (isVisita) {
    botao.addEventListener("click", consultarCep);
    document.getElementById("formulario-cep-visita").addEventListener("submit", (evento) => {
      evento.preventDefault();
      consultarCep();
    });
  } else {
    campo.addEventListener("blur", () => {
      if (campo.value.trim()) consultarCep();
    });
  }
})();
