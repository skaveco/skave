# SEO e lançamento

## Arquivos

- `src/lib/seo.ts`: domínio oficial, controle de indexação, lista de páginas prontas e dados estruturados da home.
- `src/app/robots.ts`: gera `/robots.txt`.
- `src/app/sitemap.ts`: gera `/sitemap.xml`, com URLs absolutas e versões de idioma.
- `src/app/[lang]/page.tsx`: insere JSON-LD no HTML das duas homes.
- `src/app/[lang]/layout.tsx`: aplica `noindex, follow` enquanto a indexação estiver desativada.
- `src/app/[lang]/projetos/[slug]/page.tsx`: gera título, descrição, canonical, alternâncias de idioma e metadados sociais com a capa de cada projeto ativo.

O JSON-LD descreve Organization (Skave), WebSite (site) e WebPage (home no idioma atual). Contato, redes sociais e descrições vêm dos dicionários usados no conteúdo visível.

## Enquanto o site está em construção

Sem configuração adicional, todas as páginas usam `noindex, follow`. O sitemap está vazio e não é anunciado no robots.txt. O robots.txt permite leitura das páginas para que buscadores possam encontrar o noindex; bloquear o acesso impediria a leitura dessa instrução. Isso não é proteção de acesso: para uma prévia privada, use autenticação na hospedagem.

## No lançamento

1. Revisar quais páginas estão prontas e seus metadados.
2. Configurar `SITE_INDEXING_ENABLED=true` **somente no ambiente de produção** da hospedagem.
3. Gerar um novo build e publicar em `https://skave.co`.
4. Conferir HTML das páginas públicas nos dois idiomas, JSON-LD, canonical e a ausência de `noindex`. As páginas de agradecimento devem continuar com `noindex, follow`.
5. Conferir `/robots.txt` e `/sitemap.xml` no domínio publicado.
6. Validar dados estruturados no Schema Markup Validator e enviar o sitemap ao Google Search Console.

É necessário um novo build ao mudar a variável, pois as páginas e arquivos são pré-renderizados. Em desenvolvimento local e em previews da Vercel, a indexação permanece desativada. Em outras hospedagens, não definir a variável nos ambientes de preview.

## Novas páginas

O sitemap usa o mesmo registro de projetos das páginas (`src/data/projects.ts`), por meio de `activeProjectSlugs()`. Cada projeto registrado com `status: active` entra automaticamente nos dois idiomas após um novo build. Projetos inativos ou não registrados não entram e suas rotas retornam 404. `emphasisProject` controla apenas o destaque na home.

`sitemapPaths`, em `src/lib/seo.ts`, define as páginas institucionais incluídas. Quando a indexação está ativa, o sitemap gera uma URL por idioma para cada uma dessas páginas e cada case ativo; a quantidade acompanha o registro, sem manutenção manual. Todas incluem alternâncias `pt-BR`, `en` e `x-default`, consistentes com os metadados HTML. `x-default` aponta para a rota sem idioma, que redireciona conforme a preferência do visitante; essas rotas não entram como entradas `<loc>`.

`/pt/obrigado` e `/en/obrigado` ficam fora do sitemap e mantêm `noindex, follow` mesmo no lançamento. O robots.txt permite seu rastreamento para que os buscadores possam ler essa instrução. APIs, arquivos estáticos e URLs inexistentes também não são entradas do sitemap.

Não incluir âncoras, redirecionamentos ou páginas incompletas. Omitir uma página do sitemap não impede sua indexação: após a liberação global, páginas ainda incompletas precisam de noindex próprio ou devem permanecer indisponíveis. Não há datas de atualização artificiais no sitemap.

## Domínio e hospedagem

Antes do lançamento, confira se o domínio canônico definido em `siteUrl` serve esta aplicação e se o domínio alternativo redireciona para ele. Caso haja uma versão anterior do site em outra hospedagem, confira também a troca de destino do domínio e os redirecionamentos das URLs antigas. Se o domínio escolhido mudar, atualize `siteUrl` antes do build. Valide o sitemap público após a publicação e só então envie-o ao Search Console.
