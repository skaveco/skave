# SEO e lançamento

## Arquivos

- `src/lib/seo.ts`: domínio oficial, controle de indexação, lista de páginas prontas e dados estruturados da home.
- `src/app/robots.ts`: gera `/robots.txt`.
- `src/app/sitemap.ts`: gera `/sitemap.xml`, com URLs absolutas e versões de idioma.
- `src/app/[lang]/page.tsx`: insere JSON-LD no HTML das duas homes.
- `src/app/[lang]/layout.tsx`: aplica `noindex, follow` enquanto a indexação estiver desativada.

O JSON-LD descreve Organization (Skave), WebSite (site) e WebPage (home no idioma atual). Contato, redes sociais e descrições vêm dos dicionários usados no conteúdo visível.

## Enquanto o site está em construção

Sem configuração adicional, todas as páginas usam `noindex, follow`. O sitemap está vazio e não é anunciado no robots.txt. O robots.txt permite leitura das páginas para que buscadores possam encontrar o noindex; bloquear o acesso impediria a leitura dessa instrução. Isso não é proteção de acesso: para uma prévia privada, use autenticação na hospedagem.

## No lançamento

1. Revisar quais páginas estão prontas e seus metadados.
2. Configurar `SITE_INDEXING_ENABLED=true` **somente no ambiente de produção** da hospedagem.
3. Gerar um novo build e publicar em `https://skave.co`.
4. Conferir HTML de `/pt` e `/en`, JSON-LD, canonical e a ausência de `noindex`.
5. Conferir `/robots.txt` e `/sitemap.xml` no domínio publicado.
6. Validar dados estruturados no Schema Markup Validator e enviar o sitemap ao Google Search Console.

É necessário um novo build ao mudar a variável, pois as páginas e arquivos são pré-renderizados. Em desenvolvimento local e em previews da Vercel, a indexação permanece desativada. Em outras hospedagens, não definir a variável nos ambientes de preview.

## Novas páginas

Os projetos exibidos atualmente são fictícios. A listagem tem apenas metadados gerais e JSON-LD de CollectionPage, sem nomes, contagens ou URLs dos cases. Antes do lançamento, substituir os placeholders e então avaliar a inclusão de ItemList e dos metadados das páginas individuais. Nenhum case individual está no sitemap.

`sitemapPaths` contém `/` e `/projetos`, gerando as homes e as listagens de projetos em PT/EN quando a indexação estiver ativa. Acrescentar novos caminhos sem idioma apenas depois da revisão. Para projetos individuais, adicionar os caminhos dos projetos aprovados ou integrar uma lista de publicação revisada.

Não incluir âncoras, redirecionamentos ou páginas incompletas. Omitir uma página do sitemap não impede sua indexação: após a liberação global, páginas ainda incompletas precisam de noindex próprio ou devem permanecer indisponíveis. Não há datas de atualização artificiais no sitemap.
