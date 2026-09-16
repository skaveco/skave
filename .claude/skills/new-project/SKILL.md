---
name: new-project
description: Adiciona cases ao portfólio Skave com mídias e conteúdo em português e inglês. Use para /new-project, adicionar um case ou cadastrar um novo projeto no site. Não se aplica à criação de um novo aplicativo nem a mudanças de layout.
---

# Adicionar um case

## Estrutura e referências

Confira os tipos em `src/data/projects.ts` e use um case registrado, como `src/data/projects/clickcannabis/`, como referência. Antes de escrever código, leia as instruções do `AGENTS.md` e a documentação local do Next.js pertinente à alteração.

Cada case usa:

- `public/project/<slug>/`: mídias, referenciadas como `/project/<slug>/<arquivo>`.
- `src/data/projects/<slug>/index.ts`: dados compartilhados, com `satisfies ProjectSource`.
- `src/data/projects/<slug>/pt.ts` e `en.ts`: conteúdo traduzido, com `satisfies ProjectLocaleContent`.
- `src/data/projects.ts`: import e registro no array `projects`.

As rotas `/pt/projetos/<slug>` e `/en/projetos/<slug>`, os cards e os metadados derivam desse registro. Não é necessário criar páginas ou editar componentes.

## 1. Reunir os dados

Confira se o slug já existe na pasta de dados ou no registro antes de criar outro. Use minúsculas, sem acentos e com hífens; preserve URLs existentes. Se o pedido conflitar com um case existente, esclareça se é uma atualização.

Reaproveite as informações fornecidas e peça, em uma única mensagem, apenas o que falta para definir o case. Não invente créditos, datas, serviços prestados ou resultados.

| Arquivo | Campos |
|---|---|
| `index.ts` | `slug`, `categories`, `publishedAt` (`YYYY-MM-DD`), `status`, `emphasisProject`, `content: { pt, en }` |
| `pt.ts` / `en.ts` | `name`, `segment`, `services[]`, `location`, `capabilities[]`, `credits[]`, `title`, `description`, `challenge`, `solution`, `cover`, `media[]` |

- `categories`: valores de `ProjectCategory` — atualmente `brand-development`, `online-experience` e `digital-product`.
- `status: "active"`: disponibiliza o case nas rotas e na listagem; `inactive` o exclui dessas consultas.
- `emphasisProject: true`: inclui o case ativo na home.
- A ordem do array determina a ordem de exibição. Preserve a ordem existente e acrescente ao final se o usuário não indicar outra posição; informe a posição escolhida.
- `name`: nome exibido no card e no início do case. `title`: frase de destaque (H1), também usada no título SEO. `description`: apresentação do case e meta description.
- `services`: serviços contratados; `capabilities`: competências aplicadas no projeto. Conteúdo de cases fica nos arquivos do projeto; dicionários gerais guardam textos da interface.
- `credits`: array de `{ role, names: string[] }`. Os quatro acordeões são desafio, solução, capacidades e créditos.
- `solution` aceita parágrafos separados por `\n\n`. Não presuma esse tratamento nos demais campos nem que campos vazios se ocultem.

Prepare os dois idiomas a partir do conteúdo fornecido, traduzindo textos e `alt` sem alterar fatos, nomes próprios ou caminhos de mídia. Se o usuário fornecer traduções, preserve-as. Não cadastre um case ativo com placeholders para preencher depois; resolva as lacunas ou combine um cadastro inativo.

## 2. Mapear e preparar as mídias

Liste os arquivos da pasta do case, confira conteúdo, formato, peso e dimensões. Use `cover.*` como candidato a capa e a sequência numérica (`01`, `02`, …) como ordem inicial da galeria. Os nomes são uma convenção, não um requisito do código: não renomeie fontes existentes sem necessidade nem inclua originais e versões otimizadas em duplicidade.

| Campo | Uso e cuidados |
|---|---|
| `cover: { src, alt, videoSrc? }` | A mesma capa atende ao card, ao hero e à imagem de compartilhamento. Com `videoSrc`, `src` continua sendo a imagem/poster. |
| `media[]` | Galeria de imagens e vídeos: `{ type, src, alt, poster?, width?, height? }`. Use as dimensões reais do arquivo final para preservar sua proporção; forneça poster para vídeos. |

O hero usa proporção `1020/619`; o card usa 16:9 no mobile e 402/238 no desktop. Ambos recortam com `object-cover`. A galeria respeita `width`/`height`, com fallback `1020/619`. Confira o enquadramento da capa nos dois usos. O nome fica acima da mídia: não é necessário exigir fundo escuro.

Otimize somente os arquivos que precisarem, antes de registrar os caminhos finais. Para conversões, consulte [optimize-media](../optimize-media/SKILL.md), restrinja o trabalho às mídias deste case e preserve os originais. Respeite decisões já autorizadas pelo usuário, sem pedir a mesma aprovação novamente.

Se houver ambiguidade na capa, na sequência ou no conteúdo, apresente o mapeamento e pergunte apenas sobre ela. Com os dados definidos e o cadastro solicitado, prossiga sem um OK adicional obrigatório.

## 3. Cadastrar e verificar

Crie os três arquivos de dados e registre o case em `src/data/projects.ts`. Limite as alterações ao conteúdo e às mídias do case; mudanças de layout são uma tarefa separada.

Verifique:

- Slug único e registro com os dois idiomas completos.
- Existência e caixa exata dos caminhos de imagem, vídeo e poster; dimensões correspondentes aos arquivos finais.
- `npm run lint` e `npm run build`; para cases ativos, confirme as duas rotas localizadas na saída do build. Relate bloqueios ou falhas preexistentes sem corrigi-los fora do escopo.
- Capa no hero e nos cards, ordem da galeria, vídeos e quatro acordeões nos dois idiomas. Use o preview disponível; se não houver verificação visual, deixe isso explícito na entrega.

“Veja mais projetos” exibe os três primeiros cases ativos, excluindo o atual; não há rotação que garanta a presença de todo case novo. O sitemap inclui cases ativos apenas quando a indexação está habilitada. O domínio vem de `src/lib/seo.ts`; não depende de `NEXT_PUBLIC_SITE_URL`.

Entregue as URLs locais, os arquivos alterados, o status/destaque/posição escolhidos e o resultado das verificações. Cadastrar no repositório não equivale a fazer deploy; publique somente se isso fizer parte do pedido.
