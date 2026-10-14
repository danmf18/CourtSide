 "use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API = "http://localhost:3001/api/noticias";

function dataFormatada(data) {
  if (!data) return "";
  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}

export default function PaginaNoticia() {
  const params = useParams();
  const id = params?.id;
  const [noticia, setNoticia] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id) return;
    let ativa = true;
    fetch(`${API}/${id}`)
      .then(async (resposta) => {
        const dados = await resposta.json();
        if (!resposta.ok) throw new Error(dados.mensagem || "Notícia não encontrada.");
        return dados;
      })
      .then((dados) => { if (ativa) setNoticia(dados); })
      .catch((e) => { if (ativa) setErro(e.message); })
      .finally(() => { if (ativa) setCarregando(false); });
    return () => { ativa = false; };
  }, [id]);

  return (
    <main className="detail-page">
      <nav className="navbar navbar-dark courtside-nav">
        <div className="container">
          <Link className="navbar-brand fw-bold" href="/">🏀 COURTSIDE <span>NEWS</span></Link>
          <Link className="btn btn-outline-light btn-sm" href="/">← Todas as notícias</Link>
        </div>
      </nav>
      <div className="container py-5">
        {carregando ? (
          <div className="text-center py-5"><div className="spinner-border text-danger" role="status"><span className="visually-hidden">Carregando...</span></div></div>
        ) : erro ? (
          <div className="alert alert-danger">
            <h1 className="h4">Não foi possível abrir esta notícia</h1>
            <p>{erro}. Confira se o backend está ligado e tente novamente.</p>
            <Link className="btn btn-danger" href="/">Voltar para as notícias</Link>
          </div>
        ) : noticia && (
          <article className="detail-article mx-auto">
            <Link href="/" className="back-link">← Voltar para todas as notícias</Link>
            <div className="mt-4 mb-3"><span className="category-label">{noticia.categoria}</span></div>
            <h1 className="detail-title">{noticia.titulo}</h1>
            <p className="detail-summary">{noticia.resumo}</p>
            <div className="detail-meta mb-4">Por <strong>{noticia.autor}</strong> · {dataFormatada(noticia.data)}</div>
            {noticia.imagem && <img className="detail-image" src={noticia.imagem} alt={noticia.titulo} />}
            <div className="detail-content">{noticia.conteudo.split(/\n+/).map((paragrafo, indice) => <p key={indice}>{paragrafo}</p>)}</div>
            <hr className="my-5" />
            <Link className="btn btn-danger" href="/">← Ver outras notícias</Link>
          </article>
        )}
      </div>
      <footer className="courtside-footer mt-5">
        <div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-2">
          <strong>🏀 COURTSIDE NEWS</strong><span>Feito para quem vive o basquete.</span>
        </div>
      </footer>
    </main>
  );
}
