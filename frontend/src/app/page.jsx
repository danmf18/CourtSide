 "use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const API = "http://localhost:3001/api/noticias";
const formularioVazio = {
  titulo: "", resumo: "", conteudo: "", categoria: "NBA",
  autor: "Redação CourtSide", data: new Date().toISOString().slice(0, 10), imagem: ""
};

function dataFormatada(data) {
  if (!data) return "";
  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("success");
  const [carregando, setCarregando] = useState(true);
  const arquivoRef = useRef(null);

  async function carregarNoticias() {
    try {
      const resposta = await fetch(API);
      if (!resposta.ok) throw new Error("Não foi possível carregar as notícias.");
      setNoticias(await resposta.json());
    } catch {
      setMensagem("Não consegui conectar à API. Confira se o backend está rodando na porta 3001.");
      setTipoMensagem("danger");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregarNoticias(); }, []);

  const categorias = useMemo(
    () => ["Todas", ...new Set(noticias.map((n) => n.categoria).filter(Boolean))],
    [noticias]
  );

  const noticiasFiltradas = noticias.filter((n) => {
    const termo = busca.toLocaleLowerCase("pt-BR");
    const correspondeBusca = `${n.titulo} ${n.resumo} ${n.conteudo}`.toLocaleLowerCase("pt-BR").includes(termo);
    return correspondeBusca && (categoria === "Todas" || n.categoria === categoria);
  });

  function avisar(texto, tipo = "success") {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  function abrirNovo() {
    setFormulario({ ...formularioVazio, data: new Date().toISOString().slice(0, 10) });
    setEditandoId(null);
    setMostrarFormulario(true);
    if (arquivoRef.current) arquivoRef.current.value = "";
    setMensagem("");
  }

  function abrirEdicao(noticia) {
    setFormulario({ ...noticia });
    setEditandoId(noticia.id);
    setMostrarFormulario(true);
    if (arquivoRef.current) arquivoRef.current.value = "";
    setMensagem("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function escolherImagem(evento) {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) {
      avisar("Selecione um arquivo de imagem válido.", "danger");
      evento.target.value = "";
      return;
    }
    if (arquivo.size > 4 * 1024 * 1024) {
      avisar("A imagem deve ter no máximo 4 MB.", "danger");
      evento.target.value = "";
      return;
    }
    const leitor = new FileReader();
    leitor.onload = () => setFormulario((atual) => ({ ...atual, imagem: String(leitor.result) }));
    leitor.onerror = () => avisar("Não foi possível ler essa imagem.", "danger");
    leitor.readAsDataURL(arquivo);
  }

  async function salvarNoticia(evento) {
    evento.preventDefault();
    setMensagem("");
    const metodo = editandoId ? "PUT" : "POST";
    const url = editandoId ? `${API}/${editandoId}` : API;

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario)
      });
      const dados = resposta.status === 204 ? null : await resposta.json();
      if (!resposta.ok) throw new Error(dados?.mensagem || "Não foi possível salvar a notícia.");

      avisar(editandoId ? "Notícia atualizada com sucesso!" : "Notícia publicada com sucesso!");
      setFormulario(formularioVazio);
      setEditandoId(null);
      setMostrarFormulario(false);
      if (arquivoRef.current) arquivoRef.current.value = "";
      await carregarNoticias();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (erro) {
      avisar(erro.message || "Erro ao salvar notícia.", "danger");
    }
  }

  async function excluirNoticia(id) {
    if (!window.confirm("Tem certeza de que deseja excluir esta notícia?")) return;
    try {
      const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!resposta.ok) {
        const dados = await resposta.json();
        throw new Error(dados.mensagem || "Não foi possível excluir.");
      }
      setNoticias((atuais) => atuais.filter((n) => n.id !== id));
      avisar("Notícia excluída com sucesso!");
    } catch (erro) {
      avisar(erro.message || "Erro ao excluir notícia.", "danger");
    }
  }

  function cancelarFormulario() {
    setMostrarFormulario(false);
    setEditandoId(null);
    setFormulario(formularioVazio);
    if (arquivoRef.current) arquivoRef.current.value = "";
  }

  return (
    <main>
      <nav className="navbar navbar-expand-lg navbar-dark courtside-nav">
        <div className="container">
          <Link className="navbar-brand fw-bold" href="/">🏀 COURTSIDE <span>NEWS</span></Link>
          <span className="navbar-text text-white-50 d-none d-md-inline">Tudo sobre o mundo do basquete</span>
          <button className="btn btn-danger ms-auto" onClick={abrirNovo}>+ Publicar notícia</button>
        </div>
      </nav>

      <header className="hero-section">
        <div className="container py-5">
          <span className="eyebrow">NOTÍCIAS • NBA • NBB • BASQUETE</span>
          <h1>O jogo não para.<br /><span>A notícia também não.</span></h1>
          <p>As últimas histórias, destaques e novidades das quadras.</p>
        </div>
      </header>

      <section className="container py-4">
        {mensagem && (
          <div className={`alert alert-${tipoMensagem} alert-dismissible`} role="alert">
            {mensagem}
            <button type="button" className="btn-close" aria-label="Fechar" onClick={() => setMensagem("")}></button>
          </div>
        )}

        {mostrarFormulario && (
          <div className="card form-card mb-5">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="h4 mb-0">{editandoId ? "Editar notícia" : "Publicar nova notícia"}</h2>
              <button type="button" className="btn-close btn-close-white" aria-label="Fechar" onClick={cancelarFormulario}></button>
            </div>
            <div className="card-body">
              <form onSubmit={salvarNoticia}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label" htmlFor="titulo">Título *</label>
                    <input id="titulo" className="form-control" required maxLength={120} value={formulario.titulo} onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="resumo">Resumo *</label>
                    <input id="resumo" className="form-control" required maxLength={220} value={formulario.resumo} onChange={(e) => setFormulario({ ...formulario, resumo: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="categoria">Categoria *</label>
                    <select id="categoria" className="form-select" required value={formulario.categoria} onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })}>
                      <option>NBA</option><option>NBB</option><option>Basquete brasileiro</option><option>Mercado</option><option>Geral</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="autor">Autor *</label>
                    <input id="autor" className="form-control" required value={formulario.autor} onChange={(e) => setFormulario({ ...formulario, autor: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="data">Data *</label>
                    <input id="data" type="date" className="form-control" required value={formulario.data} onChange={(e) => setFormulario({ ...formulario, data: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="conteudo">Conteúdo completo *</label>
                    <textarea id="conteudo" className="form-control" rows="5" required value={formulario.conteudo} onChange={(e) => setFormulario({ ...formulario, conteudo: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="imagem">Imagem da notícia</label>
                    <input ref={arquivoRef} id="imagem" type="file" accept="image/*" className="form-control" onChange={escolherImagem} />
                    <div className="form-text">Escolha uma imagem do computador (JPG, PNG, WebP; até 4 MB). A imagem fica na memória enquanto a API estiver ligada.</div>
                    {formulario.imagem && <img className="image-preview mt-3" src={formulario.imagem} alt="Prévia da imagem selecionada" />}
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <button className="btn btn-danger" type="submit">{editandoId ? "Salvar alterações" : "Publicar notícia"}</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={cancelarFormulario}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
          <div>
            <span className="eyebrow text-danger">FIQUE POR DENTRO</span>
            <h2 className="section-title mb-0">Todas as notícias <span className="count-pill">{noticiasFiltradas.length}</span></h2>
          </div>
          <div className="filters-row">
            <input className="form-control" aria-label="Buscar notícias" placeholder="Buscar notícia..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            <select className="form-select" aria-label="Filtrar por categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categorias.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        {carregando ? (
          <div className="text-center py-5"><div className="spinner-border text-danger" role="status"><span className="visually-hidden">Carregando...</span></div></div>
        ) : noticiasFiltradas.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="display-4">🏀</div>
            <h3>Nenhuma notícia encontrada</h3>
            <p className="text-secondary">Tente mudar sua busca ou publique uma nova notícia.</p>
            <button className="btn btn-danger" onClick={abrirNovo}>Publicar notícia</button>
          </div>
        ) : (
          <div className="row g-4">
            {noticiasFiltradas.map((noticia) => (
              <div className="col-sm-6 col-xl-4" key={noticia.id}>
                <article className="card news-card h-100">
                  {noticia.imagem ? <img className="card-img-top news-image" src={noticia.imagem} alt={noticia.titulo} /> : <div className="news-image image-placeholder">🏀</div>}
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="category-label">{noticia.categoria}</span>
                      <small className="text-secondary">{dataFormatada(noticia.data)}</small>
                    </div>
                    <h3 className="card-title">{noticia.titulo}</h3>
                    <p className="card-text text-secondary">{noticia.resumo}</p>
                    <div className="mt-auto pt-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
                      <Link className="btn btn-danger" href={`/noticias/${noticia.id}`}>Saiba mais ↗</Link>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => abrirEdicao(noticia)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => excluirNoticia(noticia.id)}>Excluir</button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="courtside-footer mt-5">
        <div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-2">
          <strong>🏀 COURTSIDE NEWS</strong>
          <span>Feito para quem vive o basquete.</span>
        </div>
      </footer>
    </main>
  );
}
