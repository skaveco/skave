---
name: new-component
description: Implementa um componente de UI a partir de um node do Figma, com uma etapa de confirmação antes de codar — lê camadas, variants, propriedades e tokens, devolve o entendimento para o usuário aprovar, e só então escreve o código. Use sempre que o usuário mandar um link ou node do Figma de um componente (card, botão, input, item de lista, badge, avatar, menu), ou disser "/new-component", "cria esse componente", "implementa esse card", "transforma isso em código". Use também quando ele descrever um componente novo sem link, para garantir tokens e convenções corretos.
---

# Criar componente a partir do Figma

O objetivo não é transcrever pixels — é traduzir a **intenção** do design para um componente que continue certo quando o texto for maior, a tela for maior e o tema mudar. O Figma mostra um estado congelado numa largura; o código precisa dar conta de todos.

O fluxo tem um portão no meio, de propósito: **ler → devolver o entendimento → esperar o OK → implementar → entregar para o usuário conferir.** Corrigir um entendimento errado custa uma frase. Corrigir uma implementação errada custa reescrever o arquivo. Por isso a confirmação vem antes do código, e não depois.

## Entrada

O usuário aciona com o link do componente no Figma e, se houver, observações (nome desejado, onde vai ser usado, comportamento que o design não mostra). As observações são as instruções mais fortes que existem — se elas contradisserem o que você deduziu do design, elas ganham.

Sem link, pergunte antes de qualquer coisa. Descrição em texto funciona, mas aí o passo 1 vira uma conversa em vez de leitura, e o entendimento do passo 3 fica mais importante ainda.

## 1. Ler o componente inteiro

Use as ferramentas MCP do Figma (podem aparecer com prefixo do servidor). Vale começar por `get_metadata`, que traz a árvore de camadas barata, e só então aprofundar com `get_design_context` no que importa. `get_variable_defs` traz os tokens consumidos, e `get_screenshot` é a referência visual para conferir no fim.

Levante tudo isto antes de formar opinião:

- **Estrutura de camadas** — a hierarquia e o que aninha o quê. É o esqueleto do JSX.
- **Variants** — cada eixo de variação (tipo, tamanho, ênfase) e seus valores possíveis.
- **States** — default, hover, pressed, focus, disabled, selected, loading. Anote também os que **não** existem: a ausência é informação, e vira pergunta no passo 3.
- **Component properties** — boolean, text, instance swap. São a pista mais forte da API: variant vira prop de união, boolean vira prop booleana, text property vira prop de conteúdo, instance swap vira `children` ou prop de ícone.
- **Elementos** — textos, ícones, imagens, containers, divisores. Quais são fixos e quais são conteúdo.
- **Tokens aplicados** — cor, tipografia, espaçamento, radius, sombra, borda. Registre o **nome da variável**, não o valor resolvido: é o nome que vira classe no código, e o hex literal é justamente o que não pode vazar.
- **Layout** — auto-layout (direção, gap, padding, alinhamento), comportamento de resize (hug, fill, fixed) e constraints. É o que determina se vira `flex`, `grid`, largura fixa ou fluida.
- **Medidas** — tamanhos e espaçamentos em px, para converter depois conforme a convenção do projeto.

Anote o **node ID** (ex.: `1080:11643`). Ele entra no comentário do arquivo e é o que permite voltar ao design meses depois.

## 2. Ler as convenções do projeto

Isto muda de projeto para projeto e não pode ser presumido. Antes de propor qualquer coisa, descubra:

- **O CSS global** (tipicamente `src/app/globals.css`) — quais tokens de cor existem e com que nome, qual a escala tipográfica disponível, e **se há escala fluida na raiz**. A presença de um `clamp()` no `font-size` do `html` é o que decide a unidade: com escala fluida, medidas em `rem`; sem ela, `px` é o correto e usar `rem` só adiciona conversão sem ganho.
- **A estrutura de pastas** — onde moram os primitivos genéricos e onde moram os componentes específicos do site. Siga o que já existe em vez de impor uma organização nova.
- **Um ou dois componentes parecidos já escritos** — é a referência de estilo mais confiável que existe, melhor que qualquer regra escrita: mostra densidade de comentário, idioma, como as classes são agrupadas, se usa `cn()` ou equivalente.
- **Se o componente já existe** — muita coisa que parece nova é variante do que já tem, e duas implementações do mesmo card divergem na primeira mudança de design. Sendo um primitivo padrão (dialog, tooltip, dropdown), prefira a biblioteca já instalada no projeto a reimplementar do zero.
- **A arquitetura de idioma**, se o projeto for traduzido — leia a documentação de i18n antes de propor a API. Descubra onde vivem os dicionários, como o servidor resolve o idioma, qual recorte de conteúdo os componentes recebem e como links internos preservam o locale. Nenhuma string visível ou rota pode ser presumida.

## 3. Devolver o entendimento e parar

Apresente o que entendeu neste formato, e **aguarde a resposta antes de escrever qualquer arquivo**:

```
## O componente
Uma frase sobre o que é e para que serve.

## Estrutura
A árvore de camadas, enxuta, só o que vira markup.

## Variants e states
O que o design traz. E, separado, o que o design NÃO traz.

## API proposta
As props, com tipo e valor padrão. Um bloco de uso mostrando como fica chamado.

## Tokens
Nome no Figma → nome no código. Marque o que não achou correspondente.

## Idiomas e conteúdo
De onde vem cada texto visível, como será tipado e como links internos preservarão o idioma. Liste as chaves novas ou alteradas em cada idioma.

## Decisões e perguntas
O que assumi e por quê. O que preciso que você responda.

## Onde vai
Caminho do arquivo.
```

As perguntas que mais costumam faltar, e que valem levantar aqui em vez de descobrir no meio da implementação:

- **Estados não desenhados** — hover, foco por teclado, disabled, loading, ativo.
- **Texto que estoura** — título longo trunca ou quebra em várias linhas? Muda a altura do componente e, em layout lado a lado, empurra o resto.
- **Área clicável** — o bloco inteiro é clicável ou só o link dentro dele? Sendo o bloco inteiro *e* havendo link dentro, é preciso resolver o aninhamento (não se aninha `<a>` dentro de `<a>` nem botão dentro de botão).
- **Reuso** — se repete com dados diferentes, ou é peça única? Decide se recebe props ou se o conteúdo mora dentro.
- **Movimento** — tem transição? Duração e easing vêm do design ou do padrão do projeto?
- **Responsivo** — existe versão desenhada para telas menores, ou implementamos só esta agora?

Se o usuário já respondeu algo nas observações da entrada, não repergunte — mostre que absorveu.

Não trave o trabalho por dúvida pequena: sendo algo de baixo impacto e fácil de mudar depois, escolha o default conservador, registre em "Decisões" e siga. O portão existe para alinhar o entendimento, não para transformar cada detalhe em pergunta.

## 4. Implementar, depois do OK

Só comece quando o usuário aprovar. Se ele responder com correções, incorpore — e sendo uma correção que muda a estrutura ou a API, vale devolver o entendimento revisado antes de codar.

As convenções que valem em qualquer projeto:

**Cor sempre por token, nunca hex.** Um hex literal não acompanha troca de tema. Se o Figma trouxer uma cor sem variável correspondente, isso já deveria ter virado pergunta no passo 3 — a resposta certa costuma ser adicionar o token no CSS global, não hardcodar no componente.

**Tipografia pelas classes do design system**, não redefinindo `font-size` no componente. Se o tamanho do Figma não existe na escala, ou o design escapou do sistema ou falta um degrau; nos dois casos é pergunta, não improviso.

**Unidade conforme o passo 2** — `rem` se o projeto tem escala fluida, `px` se não tem. Misturar as duas num projeto fluido é o bug mais comum: a parte em px congela enquanto o resto cresce, e só aparece em tela grande.

**Renderização no cliente só quando necessário** — estado, efeito, event handler, API de browser. Componente estático deve ficar no default do framework, que é o mais barato.

**Texto visível segue a arquitetura de i18n do projeto.** Nunca escreva copy, placeholder, `aria-label`, `alt` ou mensagem de estado diretamente no componente quando o projeto usa dicionários. Crie a chave em todos os idiomas suportados, resolva o dicionário no Server Component pai e passe apenas o recorte necessário por props, tipado conforme o padrão existente. O componente recebe texto pronto; não recebe nem importa o dicionário inteiro.

**Links internos preservam o idioma.** Use o helper de rota do projeto no servidor. Em Client Components, use o hook de locale existente em vez de arrastar o idioma por props. Mantenha slugs e ids de âncora estáveis quando a documentação do projeto disser que eles não são traduzidos.

**Acessibilidade junto, não depois:** `aria-expanded` em toggle, `aria-label` em botão sem texto, `aria-hidden` em decoração, `inert` em conteúdo colapsado — senão o Tab e o leitor de tela entram em coisa invisível. Estado visual nunca pode ser a única informação.

**Comentários explicam o porquê, não o quê.** O código já diz o que faz. O comentário registra a decisão que não é óbvia — por que aquela técnica de animação em vez da altura fixa, por que o corte de texto só vale acima de certa largura. Cite o node do Figma no topo e escreva no idioma do resto do projeto.

## 5. Entregar para o usuário conferir

**Não suba servidor de desenvolvimento nem abra o navegador.** O usuário confere mais rápido do que você, porque ele já tem o Figma aberto do lado e reconhece o desvio no olho. Automatizar essa parte gasta minutos para produzir uma opinião pior.

Havendo script de typecheck, lint ou build no projeto, rode o mais abrangente e seguro — além de import quebrado e tipo errado, ele deve detectar chaves ausentes nos idiomas, rotas fora do segmento de locale e incompatibilidades entre o recorte do dicionário e as props. Ver o resultado visual é trabalho do usuário.

Entregue assim:

- **arquivo criado**, com caminho clicável
- **como usar**, um bloco curto de código pronto para colar
- **o que conferir**, uma lista curta e específica em vez de "dá uma olhada": os estados que o design não mostrava, o comportamento com texto longo, a troca de tema, o que você assumiu
- **pendências** — o que ficou de fora e por quê

Sendo o componente parte de uma seção maior, aponte o próximo passo em vez de deixar solto.
