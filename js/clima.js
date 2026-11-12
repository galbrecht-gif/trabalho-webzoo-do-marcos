(() => {
  const status = document.getElementById("previsao-webzoo");
  if (!status) return;

  const url = "https://api.open-meteo.com/v1/forecast?latitude=-23.65&longitude=-46.62&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo";

  function atualizarStatus(mensagem, estado) {
    status.textContent = mensagem;
    status.classList.remove("carregando", "sucesso", "erro");
    status.classList.add(estado);
  }

  async function consultarClima() {
    atualizarStatus("Consultando a previsão do tempo...", "carregando");

    try {
      const resposta = await fetch(url);
      if (!resposta.ok) throw new Error(`Open-Meteo: HTTP ${resposta.status}`);
      const dados = await resposta.json();
      const atual = dados?.current?.temperature_2m;
      const maxima = dados?.daily?.temperature_2m_max?.[0];
      const minima = dados?.daily?.temperature_2m_min?.[0];
      const chuva = dados?.daily?.precipitation_probability_max?.[0];

      if (![atual, maxima, minima, chuva].every(Number.isFinite) || chuva < 0 || chuva > 100) {
        throw new Error("Open-Meteo retornou uma previsão incompleta.");
      }

      let dica;
      if (chuva >= 50) {
        dica = "Dia chuvoso: leve capa de chuva. Alguns animais ficam mais ativos depois da chuva.";
      } else if (atual >= 28) {
        dica = "Dia quente: use protetor solar e boné e leve uma garrafa de água.";
      } else if (atual <= 17) {
        dica = "Dia frio: leve um agasalho. Vários animais gostam de tomar sol nas manhãs frias.";
      } else {
        dica = "Tempo firme: ótimo dia para percorrer todas as trilhas com calma.";
      }

      const formatar = (numero) => numero.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
      atualizarStatus(`Agora: ${formatar(atual)} °C. Máxima de ${formatar(maxima)} °C e mínima de ${formatar(minima)} °C. Chance de chuva: ${formatar(chuva)}%.`, "sucesso");
      status.append(document.createElement("br"), document.createTextNode(dica));
    } catch (erro) {
      console.error("Erro ao consultar o Open-Meteo:", erro);
      atualizarStatus("A previsão do tempo não está disponível no momento.", "erro");
    }
  }

  consultarClima();
})();
