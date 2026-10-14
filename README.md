# CourtSide News — Projeto individual

Portal responsivo de notícias de basquete com Next.js App Router, Bootstrap, Node.js e Express.

## Funcionalidades
- Página inicial que exibe todas as notícias em cards.
- Busca por texto e filtro por categoria.
- Página individual de cada notícia pelo botão **Saiba mais**.
- Cadastro, edição e exclusão de notícias.
- Upload de imagem do computador com pré-visualização (limite de 4 MB).
- Validação dos campos obrigatórios e mensagens de sucesso/erro.
- API REST usando array em memória, conforme a proposta do projeto.

> Importante: as notícias e imagens ficam apenas na memória do servidor. Ao reiniciar o backend, os dados voltam aos exemplos iniciais.

## Como executar no Windows

Abra dois terminais na pasta `ATV_PFEND1_INDIVIDUAL-main`.

### Terminal 1 — API
```powershell
cd backend
npm.cmd install
npm.cmd run dev
```
A API estará em `http://localhost:3001`.

### Terminal 2 — Frontend
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```
Abra `http://localhost:3000`.

## Rotas da API
- `GET /api/noticias` — lista todas as notícias.
- `GET /api/noticias/:id` — consulta uma notícia.
- `POST /api/noticias` — cria uma notícia.
- `PUT /api/noticias/:id` — atualiza uma notícia.
- `DELETE /api/noticias/:id` — exclui uma notícia.

## Campos de uma notícia
Título, resumo, conteúdo completo, categoria, autor, data e imagem.
