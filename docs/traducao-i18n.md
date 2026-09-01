# Tradução (i18n)

Como este site fala dois idiomas. A ideia central: **o idioma mora na URL, e o texto mora fora do componente**. Nenhum componente tem frase escrita dentro dele; cada um recebe o texto já resolvido no servidor.

Sem biblioteca de i18n. O padrão é o nativo do App Router — dicionários JSON carregados por `import()` dinâmico. `next-i18next` **não serve**: é Pages Router.

---

## O mapa

| Arquivo | Papel |
|---|---|
| [`src/lib/i18n.ts`](../src/lib/i18n.ts) | Fonte única da configuração: `locales`, `defaultLocale`, helpers `localePath()`, `languageAlternates()` e o `Translatable`/`translate()` do conteúdo. Sem `server-only` — o `proxy` também importa daqui. |
| [`src/proxy.ts`](../src/proxy.ts) | Garante idioma no 1º segmento de toda URL. `/projetos/x` → 307 → `/pt/projetos/x`. |
| [`src/app/[lang]/dictionaries/*.json`](../src/app/%5Blang%5D/dictionaries) | Os textos, um arquivo por idioma. `pt.json` é a referência de chaves. |
| [`src/app/[lang]/dictionaries.ts`](../src/app/%5Blang%5D/dictionaries.ts) | Entrega o dicionário do idioma. `server-only`. |
| [`src/lib/use-locale.ts`](../src/lib/use-locale.ts) | Hook client: lê o idioma da rota. Só para montar links, não para texto. |

Toda rota vive sob `src/app/[lang]/`. Fora dele ficam só `globals.css`, `sitemap.ts` e `robots.ts` — arquivos sem idioma.

---

## Como o texto chega na tela

```
visita → proxy.ts (decide o idioma) → [lang]/layout.tsx (carrega o dicionário)
       → componente recebe `dict` por prop → HTML já traduzido
```

Como tudo acima é Server Component, **nenhum dicionário chega ao navegador** — só o texto final. Verificado: `grep "Talk to Seifert" .next/static/` não retorna nada.

---

## A regra de idioma

Decidida pelo `Accept-Language` do navegador, **não pelo IP**:

- navegador em `pt-*` → `/pt`
- qualquer outro idioma, ou nenhum → `/en` (`defaultLocale`)

Geografia erra justamente em quem mais importa (brasileiro viajando, VPN); a preferência do navegador é a intenção declarada pela pessoa.

`defaultLocale = "en"` significa "o que mostrar a quem não pediu português" — não que o site seja em inglês.

---

## Receita: traduzir um componente

1. Adicione as chaves em **`pt.json` e `en.json`** (as duas — o tipo `Dictionary` é derivado do `pt.json`, então esquecer o par quebra o build).
2. No Server Component pai, `const dict = await getDictionary(lang)`.
3. Passe o **recorte** que o componente usa (`dict.header`), nunca o dicionário inteiro.
4. No componente, tipe com `Dictionary["header"]` e troque a string literal pela chave.

O [`header.tsx`](../src/components/header.tsx) é o exemplo de referência — copie o padrão dele.

---

## Regras que não são óbvias

**Links internos passam por `localePath()`.** `href="/projetos/x"` sem prefixo funciona, mas custa um redirect e joga quem está em `/en` de volta pro português. Em componente client, pegue o idioma com `useLocale()` em vez de arrastar `lang` por props.

**Os `id` de âncora ficam em português nos dois idiomas** (`#projetos`, `#sobre`, `#especialidades`). Âncora é endereço: traduzir quebraria todo link já compartilhado. O que muda é o caminho — `/pt#projetos` vs `/en#projetos`.

**O slug `/projetos/` também não é traduzido.** Traduzir exigiria um mapa de rotas e complicaria o seletor de idioma; o ganho de SEO num portfólio é marginal.

**`hreflang` sai de `languageAlternates()`.** Três lugares declaram as mesmas URLs alternativas (layout, página de case, sitemap). Todos chamam o mesmo helper — não escreva os endereços à mão.

**Nunca importe `projects` num client component.** O `import` arrasta o texto de todos os cases — headline, desafio, solução, alts — para o bundle de quem só abriu a home. Quem monta o recorte é o servidor, via `projectCards()`.

---

## Conteúdo de projeto

Texto de case **não vai pros dicionários**: fica em [`projects.ts`](../src/data/projects.ts), junto do resto do case, para não editar um projeto em dois arquivos. A regra lá é o `Translatable`:

```ts
projectName: "Aurea (Website)",                          // igual nos dois idiomas
tags: { pt: ["Desenvolvimento"], en: ["Development"] },   // muda
```

String simples vale para os dois idiomas. É o oposto do dicionário — que exige par em tudo, porque é interface — e a razão é que a maior parte deste arquivo é nome de marca ou jargão que já está em inglês (`UI/UX Design`, `Fintech`, `Handoff`).

Nenhum componente vê isso. Duas funções resolvem o idioma no servidor e entregam texto puro:

| Função | Devolve |
|---|---|
| `projectCards(locale)` | Só os 5 campos do card, para a home |
| `getProject(slug, locale)` | O case inteiro, para `/[lang]/projetos/[slug]` |

Os tipos acompanham: `Project` é o que se **escreve** no arquivo (com os pares), `LocalizedProject` é o que os componentes **recebem**.

---

## Estado atual

**A home está inteira traduzida.** Header, hero (+ `clock.tsx`, que formata a data no idioma da página), projetos, sobre, empresas, escopo, especialidades, rodapé, os cards de projeto e o seletor de idioma.

O case **Aurea** também está bilíngue por inteiro — prosa, datas, localização e os 12 `alt` da galeria.

Pendente: os cases ainda `em-breve`. `corretor-clube` e `floricultura-dona-flor` estão com os textos vazios, e a `normedic` está marcada no arquivo como conteúdo fictício — não vale traduzir texto que vai ser substituído. Cada um recebe os pares `{ pt, en }` quando o conteúdo real entrar.

---

## Acrescentar um idioma

1. `locales` em `i18n.ts`, mais as entradas em `localeLabels` e `htmlLang`.
2. Novo JSON em `dictionaries/`, e a linha correspondente no objeto `dictionaries`.

`generateStaticParams`, sitemap, `hreflang` e o seletor derivam de `locales` — se atualizam sozinhos.

> O seletor de idioma alterna entre **dois** idiomas (`locales.find(l => l !== current)`). Com um terceiro, ele precisa virar um menu.
