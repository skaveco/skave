---
name: install-tokens
description: Instala ou atualiza os design tokens de um arquivo do Figma no CSS global — cores, tipografia e, se o projeto usar, escala fluida e breakpoints. Use sempre que o usuário disser "/install-tokens" ou mandar um link do Figma pedindo para "instalar os tokens", "configurar as cores", "puxar a tipografia", "subir o design system", ou quando estiver começando um projeto novo e precisar da base de estilo antes de escrever qualquer componente. Use também quando uma variável ou estilo de texto mudou no Figma e precisa ser propagado para o código.
---

# Instalar tokens do Figma

Esta é a primeira coisa que se faz num projeto novo, logo depois do `create-next-app`. Todo componente escrito depois assume que estes tokens existem e estão certos — se saírem errados aqui, o erro se espalha silenciosamente por cada arquivo seguinte.

O resultado é o CSS global do projeto (tipicamente `src/app/globals.css`). Se ele já tiver tokens, leia antes de mexer: o trabalho passa a ser *atualizar sem quebrar quem consome*, não reescrever do zero.

## 1. Ler o Figma primeiro, decidir depois

Não pergunte nada antes de olhar o arquivo — quase tudo que importa dá para descobrir sozinho, e perguntar o que já está visível desperdiça o tempo de quem responde.

Use as ferramentas MCP do Figma (podem aparecer com prefixo do servidor):

- **`get_variable_defs`** — as variáveis de cor e **quantos modes existem**. Um único mode significa projeto sem tema alternativo. Dois normalmente são claro e escuro. Três ou mais podem ser temas de marca, densidade ou plataforma — nesse caso não presuma nada.
- **`get_metadata`** ou **`get_design_context`** — os text styles, com `font-size`, `line-height`, `letter-spacing` e `font-weight` em px.
- **`get_screenshot`** — a conferência visual. Nome de token engana: o que o Figma chama de "secondary" às vezes é o fundo mais claro, às vezes o mais escuro.

Se o arquivo não usar variáveis, só estilos de cor soltos ou hex cru nas camadas, isso muda o trabalho: não há mapeamento automático possível e o passo 3 vira uma conversa. Diga isso logo, em vez de inventar uma estrutura que o design não tem.

## 2. Confirmar as decisões que mudam o formato do CSS

Depois de ler, relate o que encontrou e confirme os pontos abaixo. São poucos, mas cada um muda o arquivo inteiro — descobrir no meio custa reescrever.

**Temas.** Diga quantos modes achou e o que parecem ser. Com um só, não existe bloco `.dark` nem `@custom-variant`; toda cor mora num lugar só, e o CSS fica bem mais simples. Com dois, confirme qual é claro e qual é escuro antes de escrever — trocar os dois é um erro que só aparece muito depois. Com três ou mais, pergunte como devem ser expostos: alguns temas são classe (`.dark`, `.brand-x`), outros são atributo (`[data-theme="..."]`), e a escolha depende de como o app troca de tema.

**Escala fluida.** Pergunte se o projeto deve escalar em telas grandes — a técnica em que o `font-size` da raiz cresce com a largura e a página inteira acompanha, mantendo as proporções do design até 4K. É ótimo para site institucional e landing page, e costuma ser ruim para app denso, dashboard ou qualquer interface onde o usuário quer mais informação na tela, não a mesma informação maior. Se a resposta for não, o resto do trabalho é bem mais curto: sem `clamp()` na raiz, sem breakpoint casado, sem escala de títulos no mobile.

**Unidade.** Decorre da anterior e não é escolha independente: **`rem` só faz sentido se houver escala fluida**, porque é o `rem` que propaga o crescimento da raiz. Sem escala fluida, `px` é legítimo e mais direto — usar `rem` só por hábito nesse caso adiciona conversão mental sem nenhum ganho. Diga isso ao decidir, para a escolha ficar consciente.

**Largura de referência.** Em que largura o design foi feito (1440px, 1512px, 1920px são comuns). É contra ela que o CSS deve bater 1:1, e é dela que sai a matemática da escala fluida, se houver.

## 3. Mapear os nomes

O padrão base é **espelhar a estrutura do Figma**: barra vira hífen, com o prefixo que o Tailwind espera. `bg/primary` vira `--color-bg-primary`, `text/support` vira `--color-text-support`.

Nomes de papel (`bg-primary`, `text-support`, `divider`) envelhecem melhor que nomes de aparência (`cinza-claro`, `azul-2`) — o token que se chama `cinza-claro` mente no dia em que o dark mode o torna escuro. Se o Figma usar nomes de aparência, vale propor a tradução para papel; mas é proposta, não decisão sua, porque quem mantém o Figma precisa reconhecer os nomes.

Papéis que aparecem na maioria dos projetos, como hipótese inicial:

| Papel | Uso típico |
|---|---|
| fundo padrão | página e seções |
| fundo elevado | card, superfície destacada |
| texto principal | corpo e títulos |
| texto de apoio | secundário, legenda |
| divisor | linhas de 1px |
| cores fixas | as que **não** invertem com o tema |

**Qualquer token que não encaixar claramente num papel, pergunte para que serve.** Essa é a regra que mais protege o arquivo a longo prazo: um token adivinhado vira duplicata em três meses, porque ninguém sabe se deve reusar aquele ou criar outro. Perguntar custa uma frase; a duplicata custa uma refatoração.

## 4. Escrever as cores

Confira a major do Tailwind no `package.json` antes — v4 é CSS-first (`@theme` no CSS) e v3 usa `tailwind.config.js`. As instruções abaixo são v4.

**Com um único tema**, dois blocos bastam:

```css
:root {
  --color-bg-primary: #FFFFFF;
}

@theme inline {
  --color-bg-primary: var(--color-bg-primary);
}
```

**Com claro e escuro**, entra um terceiro:

```css
@custom-variant dark (&:is(.dark *));

:root  { --color-bg-primary: #FFFFFF; }
.dark  { --color-bg-primary: #000000; }

@theme inline {
  --color-bg-primary: var(--color-bg-primary);
}
```

O bloco `@theme inline` é o que faz o Tailwind gerar as classes (`bg-bg-primary`, `text-text-primary`, `border-divider`). Sem ele o token existe mas nenhuma classe funciona — e o sintoma engana, porque a classe simplesmente não tem efeito em vez de dar erro. É o passo mais esquecido dos três.

Só as cores que **invertem** entram no bloco de tema. Cores fixas ficam apenas no `:root`.

## 5. Escrever a tipografia

Títulos usam as tags (`h1`–`h4`). Os demais estilos viram classes utilitárias — `.text-xl`, `.text-base`, `.text-sm` e o que o design pedir — porque um parágrafo de destaque não deveria virar `<h3>` só para pegar o tamanho certo. Nomeie do maior para o menor e mantenha a escala contínua mesmo que o Figma tenha buracos.

**Se o projeto usa escala fluida**, converta os px do Figma para `rem` dividindo por 16, e mantenha o px em comentário — é o que permite conferir contra o design depois sem refazer conta:

```css
h1 {
  font-size: 4rem;      /* 64px */
  line-height: 4.5rem;  /* 72px */
  letter-spacing: -0.1rem;
  font-weight: 600;
}
```

**Se não usa**, escreva em px direto. Sem raiz fluida o `rem` não propaga nada, e a conversão só adiciona ruído.

## 6. Escala fluida — só se foi decidida no passo 2

Toda a matemática mora num lugar só — uma única regra na tag `html`:

```css
html {
  font-size: clamp(1rem, calc(A rem + B vw), M rem);
}
```

Abaixo da largura onde a escala começa, a raiz fica travada em `1rem` — o default do navegador, o que preserva a preferência de tamanho de fonte do usuário e ajuda em acessibilidade. Acima disso cresce linearmente até o alvo máximo. Como tudo mais é medido em `rem`, a página inteira herda a escala sem nenhum `clamp()` por propriedade. É a regra mais importante do arquivo e vale um comentário dizendo isso.

### Calcular A e B

O CSS não permite dividir `vw` por `px`, então os dois coeficientes precisam vir pré-calculados. Com `L1` = largura onde a escala começa (a de referência do design), `L2` = largura máxima alvo (3840 para 4K) e `M` = multiplicador nessa ponta, em `rem`:

```
A = 1 − (M − 1) · L1 / (L2 − L1)
B = 1600 · (M − 1) / (L2 − L1)
```

Ambas assumem `min = 1rem`; mantenha assim, é o que preserva a preferência do usuário nas telas pequenas. Use 4 casas decimais — arredondar demais desloca visivelmente a ponta de cima.

Exemplo com `L1 = 1100`, `L2 = 3840`, `M = 3`:

```
A = 1 − 2 · 1100 / 2740 = 0.1971
B = 1600 · 2 / 2740     = 1.1679

html { font-size: clamp(1rem, calc(0.1971rem + 1.1679vw), 3rem); }
```

**Confira as duas pontas antes de seguir**, porque um erro de álgebra aqui produz um valor que continua parecendo plausível: em `L1` a raiz computada tem que dar exatamente `16px`, e em `L2` exatamente `16 · M px` (no exemplo, 48px). Se bater nas duas, a reta inteira está certa. Vale medir no navegador, não só na conta.

Uma sutileza que confunde: o `1rem` dentro do `font-size` do próprio `html` resolve contra o default do navegador, não contra o valor sendo calculado. Não há recursão — é justamente isso que faz a preferência de fonte do usuário sobreviver à escala.

**O breakpoint precisa casar com o início da escala.** Se o projeto define um breakpoint para "desktop", ele deve valer exatamente a largura onde o `clamp()` começa a crescer:

```css
@theme {
  --breakpoint-lg: 1100px;
}
```

Se os dois divergirem, existe uma faixa onde o layout troca de estrutura mas a escala ainda não começou — e o salto visual resultante é difícil de diagnosticar, porque cada metade está certa isoladamente.

**Títulos no mobile.** Como a raiz fica travada em `1rem` abaixo do ponto de início, um `h1` de `4rem` chega ao celular com 64px. Só os títulos encolhem, num único bloco:

```css
@media (width < 40rem) {
  h1 { font-size: 2.5rem; /* 40px */ }
  /* ... */
}
```

O corpo de texto não entra aqui: já está num tamanho legível, e reduzi-lo desrespeita a preferência de fonte do usuário.

## 7. Conferir

Suba o preview e verifique na largura de referência — deve bater 1:1 com o Figma. Se houver escala fluida, confira também no alvo máximo, onde os valores devem ser o múltiplo exato. Havendo mais de um tema, alterne e confirme que nenhuma cor ficou presa.

**Pegadinha do Turbopack (Next 15+):** editar uma regra *existente* no CSS global às vezes não faz hot-reload, e o chunk compilado continua servindo o valor antigo — regras novas aparecem normalmente. Se a mudança não refletir depois do reload, apague `.next/cache` e reinicie. Confira lendo a regra compilada em `document.styleSheets`, não só o `getComputedStyle`.

## Depois de instalar

Deixe explícita a regra que passa a valer: **nenhum hex em componente** — um `#666` solto não inverte com o tema e é o vazamento mais comum depois desta etapa. Havendo escala fluida, some a ela **nenhum px em medida que deva escalar**.

Se o projeto tiver escala fluida, ofereça registrar as decisões numa doc curta (`docs/responsive-escalavel.md` ou equivalente): a largura de referência, o alvo máximo, o ponto de início e o porquê. É a informação que ninguém consegue reconstruir olhando só o `clamp()` seis meses depois.
