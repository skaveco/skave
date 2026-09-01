---
name: new-section
description: Implementa uma seção inteira de uma página a partir de um frame do Figma, com uma etapa de confirmação antes de codar — lê a árvore de camadas, identifica quais componentes já existem no projeto e quais precisam ser criados, devolve o entendimento para o usuário aprovar, e só então escreve o código. Use sempre que o usuário mandar o link de um frame ou seção do Figma (hero, sobre, projetos, serviços, footer, faixa de logos, CTA, FAQ) ou disser "/new-section", "cria essa seção", "monta esse bloco da home", "implementa essa parte do site". Para uma peça isolada dentro da seção, prefira a skill new-component.
---

# Criar seção a partir do Figma

Uma seção não é um componente grande — é uma **composição**. O trabalho principal não é desenhar pixels, é decidir o que já existe e pode ser reusado, o que vira componente novo, o que é markup local, e onde mora o conteúdo. Essa decisão tomada cedo é o que separa uma seção que aceita mudança de uma que precisa ser reescrita quando o cliente troca o texto.

O fluxo tem um portão no meio, de propósito: **ler → devolver o entendimento → esperar o OK → implementar → entregar para o usuário conferir.** Aqui o portão vale ainda mais que num componente isolado, porque o erro típico de seção é estrutural — reusar o que devia ser novo, ou criar o que já existia — e estrutura errada não se conserta com ajuste, se conserta refazendo.

## Entrada

O usuário aciona com o link do frame no Figma e, se houver, observações (nome da seção, em que página entra, em que posição, comportamento que o design não mostra). As observações mandam mais que a sua leitura do design — se contradisserem o que você deduziu, elas ganham.

## 1. Ler a estrutura antes do detalhe

Comece por `get_metadata`, que traz a árvore de camadas inteira e é barato. Só depois aprofunde com `get_design_context` nas subárvores que importam, e use `get_screenshot` como referência visual do conjunto. As ferramentas MCP do Figma podem aparecer com prefixo do servidor.

Ler a estrutura primeiro evita o erro mais caro aqui: mergulhar no detalhe de um card e só perceber no fim que ele se repete três vezes com dados diferentes — ou que já estava implementado.

Levante:

- **A árvore de camadas** e o agrupamento — é o esqueleto do JSX.
- **Os filhos diretos do frame** e o papel de cada um: cabeçalho da seção, lista, mídia, rodapé de ação.
- **O que é instance** de um componente do Figma e o que é camada solta. Instance é o sinal mais forte de que existe (ou deveria existir) um componente correspondente no código.
- **Conteúdo** — todos os textos, e quais são reais e quais são placeholder do designer.
- **O shell da seção** — fundo, padding externo, largura máxima, alinhamento. É o que envolve tudo.
- **Layout** — auto-layout, direção, gap, e o que é hug/fill/fixed. Determina flex, grid ou largura fixa.
- **Variações de tela**, se o arquivo tiver mais de um frame da mesma seção.

## 2. Descobrir quais componentes já existem no projeto

Este é o passo que diferencia uma seção de um componente, e o que mais economiza trabalho quando feito antes de escrever qualquer linha.

Para cada instance encontrada no passo 1, procure o equivalente no código, em ordem de confiabilidade:

1. **Code Connect**, se o projeto usar — `get_code_connect_map` devolve o vínculo explícito entre componente do Figma e arquivo de código. Quando existe, é resposta definitiva.
2. **Nome** — o nome do componente no Figma costuma sobreviver até o nome do arquivo, com outra convenção de escrita.
3. **Forma** — um card com imagem, título e link já implementado provavelmente serve, mesmo com nome diferente. Vale abrir e comparar a API com o que o design pede.

Classifique cada filho em um de três destinos, porque cada um leva a um trabalho diferente:

- **Já existe** → reusar. Confira se as props atuais cobrem o que o design pede; faltando algo, isso é uma alteração no componente existente e precisa ser dita no portão, porque mexer em componente compartilhado afeta quem já o usa.
- **Repete com dados diferentes e não existe** → componente novo, arquivo próprio, recebendo props.
- **Aparece uma vez e não se repete** → markup local dentro da seção. Extrair isso para arquivo só adiciona um salto de navegação sem ganho.

Aproveite para levantar as convenções do projeto, que não podem ser presumidas: o **CSS global** (quais tokens existem, qual a escala tipográfica, e **se há escala fluida na raiz** — é o que decide entre `rem` e `px`), a **estrutura de pastas**, o padrão de shell de **uma seção já implementada**, como a **página** compõe as seções e a **arquitetura de idioma**. Se houver i18n, leia a documentação correspondente e descubra onde vivem os dicionários, como o servidor resolve o locale, como os componentes recebem recortes tipados e como links internos preservam o idioma.

## 3. Devolver o entendimento e parar

Apresente neste formato e **aguarde a resposta antes de escrever qualquer arquivo**:

```
## A seção
Uma frase sobre o que é e o que ela comunica.

## Estrutura
A árvore enxuta, só o que vira markup.

## Componentes
| Peça | Destino | Observação |
|---|---|---|
| ... | reusa `caminho/do/arquivo` | props cobrem / falta X |
| ... | criar novo | se repete N vezes |
| ... | markup local | peça única |

## Conteúdo
A copy extraída. Marque o que é placeholder e mostre a versão de cada idioma suportado; se o design trouxer apenas um idioma, sinalize quais traduções ainda faltam.

## Idiomas e rotas
As chaves de dicionário que serão criadas ou alteradas, o recorte passado à seção e como links internos preservarão o locale.

## Shell
Fundo, padding, largura máxima, id de âncora.

## Onde entra
Página e posição em relação às seções vizinhas.

## Responsivo
O que o design cobre e o que não cobre.

## Decisões e perguntas
O que assumi e por quê. O que preciso que você responda.

## Arquivos
O que vou criar e o que vou tocar.
```

As perguntas que mais costumam faltar:

- **Componentes novos** — implemento junto agora, ou você prefere passar cada um pela skill de componente, com o portão próprio dele? Sendo um componente complexo, resolvê-lo isolado costuma dar resultado melhor.
- **Alteração em componente existente** — a seção pede uma prop nova numa peça que outras telas já usam. Isso é mudança compartilhada e merece um "pode?" explícito.
- **Copy e tradução** — o texto do Figma é final ou provisório? Existem versões aprovadas em todos os idiomas? Não invente tradução de copy institucional sem autorização; marque a pendência no portão.
- **Âncora** — a seção é destino de link do menu? Nesse caso o `id` precisa bater com o que a navegação já usa.
- **Responsivo** — existe frame para telas menores? Não havendo, implementamos um comportamento razoável agora ou a seção fica só nesta largura?

Dúvida pequena e reversível não vira pergunta: escolha o default conservador, registre em "Decisões" e siga. O portão existe para alinhar estrutura, não para transformar cada detalhe em interrogatório.

## 4. Implementar, depois do OK

Só comece quando o usuário aprovar. Correção que muda a estrutura ou o inventário de componentes merece um entendimento revisado antes de codar.

**Conteúdo fora do componente.** Em projeto com i18n, nenhum texto visível fica em constante local nem escrito no JSX. Adicione as chaves em todos os dicionários suportados, carregue o dicionário no Server Component da rota e passe somente o recorte que a seção consome, tipado conforme o padrão do projeto:

```tsx
type SectionProps = {
  content: Dictionary["sectionName"];
};

export function Section({ content }: SectionProps) {
  return <h2>{content.title}</h2>;
}
```

Isso vale também para placeholders, `aria-label`, textos alternativos e mensagens de estado. O componente recebe texto já resolvido; não importa nem recebe o dicionário inteiro. Se o projeto não tiver i18n, siga o padrão de conteúdo que já existir em vez de introduzir um sistema novo.

**Rotas e links preservam o idioma.** Toda rota nova deve ficar sob o segmento dinâmico de locale usado pelo projeto. Links internos usam o helper de rota no servidor e o hook de locale existente em Client Components. Não traduza slugs nem ids de âncora quando a documentação os define como endereços estáveis.

**O shell separa os papéis.** O elemento `<section>` carrega fundo, padding externo e o `id` de âncora; um contêiner interno carrega largura máxima, centralização e layout. Misturar os dois quebra no dia em que a seção precisa de fundo de ponta a ponta com conteúdo contido. Copie o padrão de uma seção já implementada em vez de inventar outro — consistência entre seções é o que faz a página parecer uma página só.

**Padding lateral menor nas telas estreitas.** O conteúdo não pode encostar na borda do celular.

**Renderização no cliente só se a seção tiver estado próprio** — acordeão, carrossel, filtro. Seção estática fica no default do framework.

**Cor por token, tipografia pelas classes do sistema, unidade conforme o passo 2** — `rem` se há escala fluida na raiz, `px` se não há. Hex solto no meio de uma seção é o vazamento mais comum, porque seção tem muito markup e é fácil um valor escapar.

**Registrar na página localizada** na ordem do design, conferindo contra o frame e não contra a ordem em que as seções foram construídas. Passe o recorte do dicionário a partir do Server Component da rota; não faça o componente buscar ou resolver o idioma sozinho.

**Responsivo:** mudança estrutural pede breakpoint — número de colunas, direção do flex, esconder ou mostrar, sticky. O ponto de troca vem de onde o layout de fato quebra, não de um valor redondo; um breakpoint fora da escala padrão é escolha legítima se o design pedir. Interpolação de tamanho é outra coisa e segue a convenção de escala do projeto. Sem frame de mobile no design, não invente um layout complexo — empilhar em coluna e reduzir padding é o comportamento previsível; qualquer coisa além disso vai ser refeita quando o design chegar.

## 5. Entregar para o usuário conferir

**Não suba servidor de desenvolvimento nem abra o navegador.** O usuário confere mais rápido, porque tem o Figma aberto do lado e reconhece o desvio no olho. Rode o script mais abrangente e seguro entre typecheck, lint e build — além de import quebrado e tipo errado, ele deve detectar chaves ausentes nos idiomas, rotas fora do segmento de locale e incompatibilidades entre dicionário e props.

Entregue assim:

- **arquivos criados e tocados**, com caminho clicável
- **o que conferir**, específico em vez de "dá uma olhada". Numa seção, os pontos que mais falham não estão dentro dela e sim na junção: espaçamento com as seções vizinhas, fundo que deveria alternar e não alterna, âncora do menu caindo no lugar errado, ordem na página
- **pendências** — copy ou tradução provisória, componente que ficou para depois, responsivo não coberto
- **próximo passo**, se ficou algum componente novo na fila
