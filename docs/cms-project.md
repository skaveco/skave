# CMS de projetos

## Funcionamento atual

O arquivo `src/data/projects.ts` funciona como o registro do CMS. Ele define os tipos, reúne os projetos e fornece os dados usados nas páginas.

Cada projeto fica em uma pasta própria dentro de `src/data/projects/`. O `index.ts` guarda os campos compartilhados e os arquivos `pt.ts` e `en.ts` guardam o conteúdo de cada idioma.

Cada projeto possui:

- `slug`: identificador usado na URL;
- `name`: nome do projeto;
- `categories`: categorias usadas nos filtros;
- `services`: serviços em português e inglês;
- `segment`: segmento em português e inglês;
- `publishedAt`: data exibida;
- `image`: caminho da imagem;
- `imageAlt`: descrição da imagem nos dois idiomas.

As funções `projectCards(locale)`, `emphasisProjectCards(locale)` e `getProject(slug, locale)` recebem o idioma da rota e entregam aos componentes somente o texto correspondente.

O arquivo deve ser importado apenas por componentes de servidor. Os componentes visuais recebem o conteúdo já traduzido por propriedades.

Para cadastrar um projeto, crie sua pasta, preencha os dois idiomas e adicione-o ao registro em `projects.ts`. O `slug` deve ser único.

## Decisões

### 1. Conteúdo separado por projeto e idioma

Cada projeto terá uma pasta própria em `src/data/projects/`, com os textos de português e inglês em arquivos separados.

```text
src/data/projects/
└── aurea/
    ├── pt.ts
    ├── en.ts
    └── index.ts
```

Os dicionários gerais serão usados apenas para textos da interface. Essa organização não altera as URLs, o SEO ou a renderização das páginas.

### 2. Campos de cada projeto

#### Dados do projeto

- `slug`
- `name`
- `segment`
- `categories`
- `services`
- `publishedAt`
- `location`
- `capabilities`
- `credits`
- `cover`: imagem principal usada na Hero e nos cards do projeto;
- `status`: controla a publicação geral do projeto;
  - `active`: projeto publicado e acessível;
  - `inactive`: projeto oculto das listas e indisponível pela rota;
- `emphasisProject`: booleano que controla a exibição do projeto na lista da home;
  - `true`: exibe na home;
  - `false`: não exibe na home.

#### Conteúdo do case

- `title`: título principal (`h1`);
- `description`: apresentação do projeto;
- `challenge`: desafio do projeto;
- `solution`: solução desenvolvida.

#### Categorias permitidas

- Desenvolvimento de Marca;
- Experiência Online;
- Produto Digital.

#### Galeria de mídias

Após o conteúdo do case, cada projeto terá uma galeria própria com imagens e vídeos.

Cada mídia terá:

- `type`: imagem ou vídeo;
- `src`: caminho do arquivo;
- `alt`: descrição acessível;
- `poster`: capa do vídeo, quando necessária.

A `cover` não faz parte da galeria. Ela possui `src` e `alt` e é reutilizada na Hero da página interna e no `ProjectItem`.

### 3. Regras dos campos

- `publishedAt` será armazenado no formato ISO (`2026-06-20`) e formatado conforme o idioma.
- `categories` aceitará somente as categorias permitidas.
- `services` informará os serviços contratados; `capabilities`, as competências aplicadas no projeto.
- `credits` será uma lista com `role` e `names`.
- `title` e `description` serão usados nos metadados de SEO.
- Projetos com `status: inactive` não aparecerão nas listas ou no sitemap e retornarão página não encontrada pela rota.
- `emphasisProject` só terá efeito quando o projeto estiver ativo.
