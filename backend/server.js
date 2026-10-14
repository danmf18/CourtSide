const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));


let proximoId = 13;

let noticias = [
  {
    id: 1,
    titulo: "Chicago Bulls se prepara para a nova temporada",
    resumo: "Expectativas e desafios para a equipe de Chicago.",
    conteudo: "A equipe do Chicago Bulls se prepara para uma nova temporada da NBA, buscando melhorar seu desempenho e conquistar resultados importantes. Os torcedores esperam evolução coletiva e boas atuações de seus principais jogadores.",
    categoria: "NBA",
    autor: "Redação CourtSide",
    data: "2026-10-10",
    imagem: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    titulo: "Os destaques do basquete brasileiro",
    resumo: "Veja assuntos em destaque nas quadras brasileiras.",
    conteudo: "O basquete brasileiro continua revelando talentos e fortalecendo suas competições nacionais. O NBB reúne equipes tradicionais e jogadores que buscam se destacar no cenário nacional.",
    categoria: "NBB",
    autor: "Redação CourtSide",
    data: "2026-10-11",
    imagem: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    titulo: "Jovens talentos para ficar de olho",
    resumo: "Novos jogadores chamam a atenção dos fãs de basquete.",
    conteudo: "Os jovens jogadores são uma parte importante do futuro do basquete. Com dedicação, treinamento e oportunidades, novos talentos podem conquistar espaço em equipes profissionais.",
    categoria: "Geral",
    autor: "Redação CourtSide",
    data: "2026-10-12",
    imagem: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    titulo: "A história da dinastia do Chicago Bulls",
    resumo: "Relembre uma das épocas mais marcantes da NBA.",
    conteudo: "O Chicago Bulls marcou a história da NBA durante a década de 1990. Liderada por Michael Jordan, Scottie Pippen e outros grandes jogadores, a equipe conquistou seis títulos em oito temporadas, consolidando seu lugar entre as maiores dinastias do esporte.",
    categoria: "NBA",
    autor: "Lucas Martins",
    data: "2026-10-13",
    imagem: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    titulo: "Michael Jordan e seu legado no basquete",
    resumo: "Como Jordan influenciou gerações de jogadores e fãs.",
    conteudo: "Michael Jordan é considerado um dos maiores jogadores da história do basquete. Sua competitividade, habilidade ofensiva e conquistas com o Chicago Bulls ajudaram a popularizar a NBA internacionalmente.",
    categoria: "Lendas",
    autor: "Pedro Almeida",
    data: "2026-10-14",
    imagem: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    titulo: "Como funciona o Draft da NBA",
    resumo: "Entenda como as franquias escolhem novos jogadores.",
    conteudo: "O Draft da NBA é um evento no qual as franquias selecionam jogadores elegíveis, incluindo atletas que vêm do basquete universitário e de ligas internacionais. A ordem de escolha influencia as oportunidades oferecidas aos novos talentos.",
    categoria: "NBA",
    autor: "Mariana Costa",
    data: "2026-10-15",
    imagem: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    titulo: "A importância da defesa no basquete",
    resumo: "Marcação, posicionamento e trabalho coletivo fazem a diferença.",
    conteudo: "Uma boa defesa vai além de bloquear arremessos. Comunicação, posicionamento, leitura das jogadas e colaboração entre os jogadores ajudam uma equipe a dificultar os ataques adversários e recuperar a posse da bola.",
    categoria: "Fundamentos",
    autor: "Rafael Souza",
    data: "2026-10-16",
    imagem: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    titulo: "Armadores: os organizadores do jogo",
    resumo: "Conheça o papel de quem conduz as jogadas da equipe.",
    conteudo: "O armador geralmente organiza o ataque, distribui passes e ajuda a controlar o ritmo da partida. Visão de jogo, tomada de decisão e domínio de bola são habilidades importantes para essa posição.",
    categoria: "Fundamentos",
    autor: "Gabriel Santos",
    data: "2026-10-17",
    imagem: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 9,
    titulo: "O crescimento do basquete feminino",
    resumo: "Competições e atletas ampliam a visibilidade da modalidade.",
    conteudo: "O basquete feminino conta com atletas de alto nível e competições importantes em diferentes países. A ampliação da cobertura esportiva e das oportunidades de formação contribui para aproximar novos públicos da modalidade.",
    categoria: "Basquete Feminino",
    autor: "Ana Ribeiro",
    data: "2026-10-18",
    imagem: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 10,
    titulo: "Treinamento físico para jogadores de basquete",
    resumo: "Força, coordenação e resistência ajudam no desempenho em quadra.",
    conteudo: "O treinamento físico no basquete pode envolver exercícios de força, mobilidade, equilíbrio, coordenação e condicionamento. O planejamento deve respeitar o nível de cada atleta e incluir recuperação adequada.",
    categoria: "Treinamento",
    autor: "Felipe Oliveira",
    data: "2026-10-19",
    imagem: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 11,
    titulo: "Por que o arremesso de três pontos mudou a NBA",
    resumo: "O arremesso de longa distância transformou as estratégias ofensivas.",
    conteudo: "O arremesso de três pontos ganhou importância crescente no basquete moderno. As equipes passaram a valorizar o espaçamento em quadra e a criação de oportunidades de longa distância, modificando a maneira como os ataques são organizados.",
    categoria: "NBA",
    autor: "Bruno Ferreira",
    data: "2026-10-20",
    imagem: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 12,
    titulo: "A importância do trabalho em equipe",
    resumo: "Comunicação e confiança são essenciais dentro de quadra.",
    conteudo: "Embora grandes jogadores possam decidir partidas, o basquete é um esporte coletivo. Passes, movimentação sem a bola, comunicação defensiva e confiança entre companheiros são elementos fundamentais para o sucesso de uma equipe.",
    categoria: "Geral",
    autor: "Redação CourtSide",
    data: "2026-10-21",
    imagem: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"
  }
];

const camposObrigatorios = ["titulo", "resumo", "conteudo", "categoria", "autor", "data"];

function validarNoticia(dados) {
  if (!dados || typeof dados !== "object") return "Envie os dados da notícia.";
  for (const campo of camposObrigatorios) {
    if (typeof dados[campo] !== "string" || !dados[campo].trim()) {
      return `O campo "${campo}" é obrigatório.`;
    }
  }
  if (dados.imagem && typeof dados.imagem !== "string") {
    return "A imagem enviada é inválida.";
  }
  return null;
}

function normalizarNoticia(dados, id, imagemAnterior = "") {
  return {
    id,
    titulo: dados.titulo.trim(),
    resumo: dados.resumo.trim(),
    conteudo: dados.conteudo.trim(),
    categoria: dados.categoria.trim(),
    autor: dados.autor.trim(),
    data: dados.data.trim(),
    imagem: typeof dados.imagem === "string" ? dados.imagem : imagemAnterior
  };
}

app.get("/api/noticias", (req, res) => {
  res.json([...noticias].sort((a, b) => b.data.localeCompare(a.data)));
});

app.get("/api/noticias/:id", (req, res) => {
  const noticia = noticias.find((item) => item.id === Number(req.params.id));
  if (!noticia) return res.status(404).json({ mensagem: "Notícia não encontrada." });
  res.json(noticia);
});

app.post("/api/noticias", (req, res) => {
  const erro = validarNoticia(req.body);
  if (erro) return res.status(400).json({ mensagem: erro });

  const noticia = normalizarNoticia(req.body, proximoId++);
  noticias.push(noticia);
  res.status(201).json(noticia);
});

app.put("/api/noticias/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = noticias.findIndex((item) => item.id === id);
  if (indice === -1) return res.status(404).json({ mensagem: "Notícia não encontrada." });

  const erro = validarNoticia(req.body);
  if (erro) return res.status(400).json({ mensagem: erro });

  noticias[indice] = normalizarNoticia(req.body, id, noticias[indice].imagem);
  res.json(noticias[indice]);
});

app.delete("/api/noticias/:id", (req, res) => {
  const tamanhoAnterior = noticias.length;
  noticias = noticias.filter((item) => item.id !== Number(req.params.id));

  if (noticias.length === tamanhoAnterior) {
    return res.status(404).json({ mensagem: "Notícia não encontrada." });
  }
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`CourtSide News API disponível em http://localhost:${PORT}`);
});
