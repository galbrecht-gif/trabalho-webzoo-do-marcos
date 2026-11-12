# WebZoo — Plataforma de Educação Ambiental

- **Estudante/Equipe:** [preencher]
- **Turma:** [preencher]
- **Disciplina:** Front-End - SENAI "Comendador Santoro Mirone" Indaiatuba/SP
- **Link do site publicado:** [preencher]

## Sobre o projeto

O WebZoo é um site estático, acadêmico e fictício de educação ambiental. Apresenta espécies da fauna brasileira, informações para planejar uma visita e sugestões para a conservação da natureza. Foi desenvolvido com HTML5, CSS3 e JavaScript puro, sem frameworks.

- [Início](index.html): apresentação, destaques e curiosidades.
- [Animais](animais.html): fichas de espécies e filtros.
- [Visite](visite.html): informações para o passeio, consulta de CEP e previsão do tempo.
- [Participe](participe.html): programas de educação ambiental e formulário demonstrativo.

Horários, preços, programas e contatos são fictícios. Não utilize o site para planejar uma visita real sem conferir as informações oficiais.

## Como executar

Abra `index.html` em um navegador moderno ou publique a pasta do projeto em um servidor estático. As consultas de CEP e previsão precisam de acesso à internet e dos serviços disponíveis; a fonte do Google Fonts também precisa de internet, mas possui alternativas locais no navegador.

## APIs

As duas APIs são públicas, gratuitas, acessadas via HTTPS e não exigem chave:

- **ViaCEP** — `https://viacep.com.br/ws/{cep}/json/`: em **Visite**, identifica o endereço associado ao CEP de partida; em **Participe**, ajuda a preencher rua, bairro, cidade e estado. O CEP informado é enviado ao ViaCEP.
- **Open-Meteo** — `https://api.open-meteo.com/v1/forecast?latitude=-23.65&longitude=-46.62&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo`: em **Visite**, fornece temperatura atual, máxima, mínima e chance de chuva para ajudar no planejamento do passeio.

## Interações

- Menu hambúrguer acessível em telas menores, com estado expandido, rótulo atualizado e fechamento pela tecla Escape.
- Filtros combinados por classe, alimentação e bioma, com opção para limpar e aviso quando não há resultados.
- Máscaras para CEP e telefone, consulta de endereço e contador de caracteres da mensagem.
- Validação do formulário de participação, com indicação dos erros e foco no primeiro campo inválido.
- Link para voltar ao topo da página.

**O formulário é apenas uma demonstração:** a validação ocorre no navegador e não envia nem armazena cadastros ou agendamentos. Não informe dados pessoais reais. A busca de CEP, quando usada, envia o CEP ao ViaCEP.

## Créditos

- Imagens ilustrativas criadas por IA para a atividade didática. Ferramenta de geração de imagens: [preencher].
- Desenvolvimento assistido por GitHub Copilot no VS Code. Outras ferramentas de IA utilizadas: [preencher, se houver].
