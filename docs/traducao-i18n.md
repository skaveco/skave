# Tradução (i18n)

O idioma fica na URL (`/pt` ou `/en`). Páginas e layouts resolvem o conteúdo no servidor e passam aos componentes apenas o recorte necessário.

## Arquivos de referência

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/i18n.ts` | `locales`, `defaultLocale`, `htmlLang`, `hasLocale()`, `localePath()` e `alternateLocale()` |
| `src/proxy.ts` | Redirecionamento de URLs sem idioma |
| `src/app/[lang]/dictionaries.ts` | Carregamento dos dicionários no servidor e tipo `Dictionary` |
| `src/app/[lang]/dictionaries/pt.json` e `en.json` | Textos da interface |
| `src/data/projects/<slug>/pt.ts` e `en.ts` | Conteúdo dos cases por idioma |

## Escolha e troca de idioma

Uma URL que já começa com um idioma suportado mantém esse idioma. Nas demais, o proxy verifica se `Accept-Language` contém `pt`: se contiver, redireciona para `/pt`; caso contrário, usa `defaultLocale` (`en`). Essa implementação não ordena idiomas por prioridade do cabeçalho. APIs, recursos internos do Next e caminhos com ponto ficam fora desse redirecionamento.

Use `localePath(path, lang)` para links internos, inclusive âncoras da home. Links sem idioma passam novamente pela negociação do proxy e podem perder o idioma escolhido pelo visitante. Os segmentos de rota e IDs de âncora permanecem iguais nos dois idiomas.

O header recebe `lang` por propriedade e usa `alternateLocale()` para alternar entre os dois idiomas. Atualmente, o seletor leva à home do idioma de destino.

## Adicionar textos

1. Adicione as mesmas chaves em `pt.json` e `en.json`. O tipo `Dictionary` deriva de `pt.json`; o carregador exige uma estrutura compatível nos dois idiomas.
2. Na página ou layout de servidor, carregue `getDictionary(lang)` após validar o idioma com `hasLocale()`.
3. Passe apenas o trecho usado pelo componente, tipado com `Dictionary["nomeDaSecao"]`.

O módulo de dicionários usa `server-only`. Componentes client podem receber textos serializados por propriedades; isso não significa que todo texto fique fora do bundle ou dos dados enviados ao navegador.

## Conteúdo de projetos

O cadastro e os campos estão documentados na [skill new-project](../.claude/skills/new-project/SKILL.md). Use os tipos de `src/data/projects.ts` como contrato e mantenha os textos dos cases fora dos dicionários de interface.

`projectCards(lang)`, `emphasisProjectCards(lang)`, `relatedProjectCards(slug, lang)` e `getProject(slug, lang)` resolvem o conteúdo do idioma no servidor. Componentes client devem receber o recorte necessário por propriedades e usar `import type` quando precisarem apenas dos tipos.

## SEO e novos idiomas

O layout define `html lang` e `metadataBase`. As páginas definem canonical e alternâncias de idioma; o sitemap também gera essas alternâncias. Consulte [SEO e lançamento](seo.md) ao mudar rotas.

Para adicionar um idioma:

- Atualize `locales`, `htmlLang` e, se necessário, a negociação em `src/proxy.ts`.
- Adicione o JSON e seu carregador em `dictionaries.ts`, além do conteúdo de cada case em `content`.
- Revise metadados com condições específicas de PT/EN e o seletor: `alternateLocale()` escolhe apenas o primeiro idioma diferente do atual, portanto três ou mais idiomas exigem outra interface.
- Verifique links, traduções, rotas geradas e alternâncias no HTML e no sitemap.
