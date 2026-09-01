---
name: new-project
description: Publica um case novo na página de projetos deste site — encontra as mídias pelo prefixo do slug, define o papel de cada uma (capa do card, hero, galeria), otimiza, coleta os textos que faltam e escreve a entrada em src/data/projects.ts. Use sempre que o usuário disser "/new-project", "subir um projeto novo", "adicionar um case", "publicar o projeto X", ou quando ele mandar as mídias de um projeto que ainda não existe em projects.ts. Para mudar o layout da página de case, prefira new-section.
---

# Subir um case novo

Toda a página de case sai de uma única entrada em `src/data/projects.ts`. A rota estática, o card na home, a rotação do "Veja mais projetos", o sitemap, o canonical e as tags de Open Graph derivam dela — não há arquivo de página para criar.

Por isso o trabalho aqui é quase todo de **entrada de dados**, e o que dá errado não é código: é mídia no papel errado e texto faltando. O fluxo tem um portão no meio por causa disso: **inventariar → devolver o mapeamento → esperar o OK → escrever → verificar.**

## 1. Descobrir o slug e as mídias

Cada case tem a própria pasta, nomeada com o slug: **`public/projetos/<slug>/`**. Dentro dela, duas convenções de nome:

- **`cover-<slug>`** — a capa do card. Nome próprio porque o papel é único e a proporção é outra.
- **`<slug>-1`, `<slug>-2`, …** — as imagens do case, em ordem.

Exemplo: `public/projetos/aurea/cover-aurea.webp` e `public/projetos/aurea/aurea-1.webp`.

A pasta delimita o case, então liste o conteúdo dela e ordene as numeradas pelo número — sem risco de um prefixo pegar arquivo de outro projeto.

**Tudo em minúsculo, sem exceção.** O Windows não distingue caixa, mas o servidor de produção é Linux e distingue: um caminho com a caixa errada funciona na máquina do usuário e dá 404 depois do deploy. Se precisar renomear uma pasta só na caixa, o Git no Windows exige dois passos — `git mv pasta tmp` e depois `git mv tmp pasta`. Confira também se o slug já está em `projects.ts` — se estiver, isso é uma atualização de case, não um case novo, e vale confirmar com o usuário antes de sobrescrever.

Regras do slug: minúsculo, sem acento, palavras separadas por hífen. Ele vira a URL `/projetos/<slug>` e não deve mudar depois de publicado, porque links já compartilhados quebram.

## 2. Atribuir o papel de cada mídia

Três papéis, com proporções que **não são intercambiáveis**:

| Campo | Arquivo | Papel | Proporção | Observação |
|---|---|---|---|---|
| `cover` | `cover-<slug>` | capa do card na home e no "Veja mais projetos" | 467/385, retrato leve | |
| `image1` | `<slug>-1` | primeira imagem do case: o hero em tela cheia | 16:9 | **a base precisa ser escura** — o título é branco fixo e não há gradiente atrás dele |
| `media[]` | `<slug>-2` em diante | galeria, na ordem numérica | 16:9 | quantidade livre; aceita imagem e vídeo |

Os caminhos em `projects.ts` são absolutos a partir de `public/`, então incluem a pasta: `/projetos/aurea/aurea-1.webp`.

A nomenclatura resolve o mapeamento sozinha — não pergunte qual arquivo é qual. Pergunte só quando algo não se encaixar: `cover-<slug>` ausente, buraco na numeração, ou uma proporção medida longe da esperada.

Meça as proporções reais dos arquivos em vez de confiar no nome. Uma imagem fora da proporção esperada não quebra o layout — `object-cover` corta — mas o corte aparece, e é melhor avisar antes.

Para vídeo, o tipo é `{ type: "video", src, alt, poster }`. O `poster` evita um retângulo cinza enquanto o arquivo carrega.

## 3. Levantar os textos

Os campos de texto não têm de onde ser inferidos. Liste ao usuário o que falta e peça de uma vez só, em vez de uma pergunta por campo:

- `projectName` — nome com a categoria: "Normedic (SaaS)". Aparece no card.
- `title` — nome curto: "Normedic". Aparece no hero.
- `tags` — as duas tags do card.
- `headline` — a frase de destaque. Vira também a `<meta description>`, então é o que aparece no Google.
- `company` — parágrafo sobre a empresa.
- `challenge`, `solution`, `credits` — o conteúdo dos três acordeões.
- `meta` — `segment`, `date`, `services[]`, `location`.

Textos longos quebram em parágrafos com `\n\n`; o `whitespace-pre-line` já está no lugar.

Campo vazio não quebra a página — os blocos se auto-ocultam. Mas um case sem `headline` sai com meta description vazia e vira página fina para busca, o que é pior do que não publicar. Se o usuário quiser subir incompleto, tudo bem; avise o custo e siga.

## 4. Devolver o mapeamento e parar

Antes de escrever, apresente e **aguarde o OK**:

```
## Slug
O slug e a URL que ele gera.

## Mídias
| Arquivo | Papel | Proporção medida | Observação |
|---|---|---|---|

## Textos
O que o usuário passou, e o que ainda falta.

## Otimização
O que está pesado e o que vai ser convertido.

## Decisões e perguntas
```

O que mais costuma precisar de confirmação: se a base do `image1` é escura o bastante para o título branco, e se a posição do case na home é a certa.

## 5. Otimizar as mídias

Rode a skill `optimize-media` antes de escrever a entrada, para os caminhos já saírem apontando para os arquivos finais. Converter depois obriga a voltar em `projects.ts` para corrigir extensão.

Imagem de capa em PNG acima de 1 MB é o caso mais comum e o que mais pesa: são os arquivos-fonte do LCP da página.

## 6. Escrever a entrada

Um objeto novo no array `projects` de `src/data/projects.ts`. **A ordem do array é a ordem dos cards na home** — pergunte onde o case entra em vez de sempre acrescentar no fim.

Nenhum outro arquivo é tocado. Se a implementação pedir mudança em componente ou rota, isso não é um case novo: é mudança de estrutura, e vale parar e alinhar.

## 7. Verificar

Rode o build e confirme que a rota nova aparece na lista de prerenderizadas:

```bash
npm run build
```

Depois entregue ao usuário apontando o que conferir de específico:

- **o hero** — é onde o erro aparece primeiro, se a base da imagem não for escura o bastante para o título branco
- **o card na home**, na posição combinada
- **o "Veja mais projetos"** nos outros cases, que agora inclui este na rotação
- **os acordeões**, se os textos entraram com as quebras de parágrafo certas

Não suba servidor de desenvolvimento: o usuário confere mais rápido no navegador dele.

## Uma vez só, não a cada case

`NEXT_PUBLIC_SITE_URL` precisa estar definida no ambiente de produção com o domínio real. Sem ela, `og:image`, canonical e sitemap resolvem contra `localhost`. Se o usuário nunca configurou, avise na primeira vez — depois disso, não repita.
