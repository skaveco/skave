# Responsivo escalável

Como este site lida com responsividade. A ideia central: **o layout escala de forma fluida**, sem redesenhar cada largura de tela. Em vez de dezenas de breakpoints, usamos interpolação (`clamp()` + `rem`) e reservamos breakpoints só para mudanças estruturais.

---

## Os dois eixos

Responsividade aqui tem **duas direções distintas**, com mecanismos diferentes:

| Direção | Faixa | O que muda | Mecanismo |
|---|---|---|---|
| **Escala para cima** | 1100px → 3840px (4K) | Tudo cresce junto, proporções idênticas | **1 `clamp()` no `font-size` do `<html>`** + tudo em `rem` |
| **Escala para baixo** | ~375px → 1100px | Cada estilo comprime no seu próprio ritmo | `clamp()` por estilo (âncoras do Figma) + breakpoints estruturais |

> Estado atual: o **eixo de subida (1100 → 4K)** está implementado. O eixo de descida (tablet/mobile) será feito seção a seção.

---

## 1. Escala para cima — raiz + `rem`

Existe **um único lugar** com a matemática fluida da subida, em [`src/app/globals.css`](../src/app/globals.css):

```css
html {
  font-size: clamp(1rem, calc(0.759rem + 0.3504vw), 1.6rem);
}
```

- **`1rem`** (mínimo) = o default do navegador/usuário. Vale até 1100px → nas telas pequenas a preferência de fonte do usuário é respeitada (bom p/ acessibilidade e SEO).
- Acima de 1100px cresce linearmente até **`1.6rem`** (= 1,6×) em **3840px (4K)**.
- Como **todo o resto é medido em `rem`**, a página inteira herda essa escala automaticamente. Nenhuma seção precisa de código fluido próprio.

### Por que funciona sem `clamp()` por propriedade

O CSS não permite dividir `vw` por `px`, então uma escala fluida "pura" exigiria um coeficiente pré-calculado por valor — o que poluiria o CSS. Calculando a escala **uma vez na raiz** e deixando o `rem` propagar, esse coeficiente aparece só uma vez.

### Conferido nas pontas

| | @1100px (1×) | @3840px (1,6×) |
|---|---|---|
| root `font-size` | 16px | 25,6px |
| `h1` | 64px | 102,4px |
| `padding-x` do header | 32px | 51,2px |
| ícones | 16px | 25,6px |

Em 1100px bate exatamente com o design original; em 4K, exatamente 1,6×.

---

## 2. Convenções de código

### Sempre em `rem`, nunca `px` cru

Para uma medida participar da escala, ela precisa estar em `rem`. Na prática:

- **Tipografia:** usar as classes do design system (`h1`–`h4`, `.text-xxl` … `.text-sm`), definidas em `rem` em `globals.css`.
- **Espaçamento/tamanho:** usar utilitários padrão do Tailwind (`px-8`, `py-5.5`, `gap-6`, `size-4`, `h-3.5`) — o Tailwind v4 já usa `rem` na escala de spacing.
- **Evitar** valores arbitrários em px (`px-[80px]`, `h-[14px]`, `max-w-[1536px]`) para qualquer coisa que deva escalar. Se precisar de arbitrário, usar `rem` (`max-w-[96rem]`).

Referência de conversão (base 16px): `16px = 1rem`, `24px = 1.5rem`, `32px = 2rem`, `8px = 0.5rem`, `14px = 0.875rem`.

### Altura do header

`--header-height` é `4.4375rem` (= 71px), então também escala. É consumida pelo Hero no `calc(100dvh - var(--header-height))`.

---

## 3. Escala para baixo (tablet/mobile) — como será

Para a direção **mobile → desktop**, estilos diferentes comprimem em ritmos diferentes (um `h1` encolhe mais que o corpo de texto). Então:

- O designer define **2–3 âncoras no Figma** (mobile ~375px, tablet ~768px, desktop ~1440px) — não toda largura.
- Cada estilo tipográfico recebe um **min (mobile)** e **max (desktop)**, virando um `clamp(min, vw, max)`.
- Esses `clamp()` **atingem o máximo em ~1100px**; a partir daí a escala da raiz (seção 1) assume. Assim os dois eixos **compõem sem escalar em dobro**.
- Mudanças **estruturais** (nº de colunas, `flex-direction`, mostrar/esconder, sticky, blur no scroll) usam **breakpoints do Tailwind**, mobile-first — nunca `clamp()`.

### Breakpoints estruturais

Sem `tailwind.config.js` (Tailwind v4 é CSS-first). Os limites oficiais estão declarados via `--breakpoint-*` no `@theme`: `tablet` em 768px e `desktop` em 1100px. Mobile usa os estilos-base, sem variante.

### Padding lateral

- **Mobile (0–767px):** `1.25rem` (20px).
- **Tablet e Desktop (768px+):** `2.5rem` (40px).

---

## 4. Retunar a escala do 4K

Mudar **só** o alvo de 4K: alterar o `1.6rem` (e os termos `0.759rem` / `0.3504vw`) no `clamp()` do `html`. Fórmula da faixa 1100→3840:

```
preferido(vw) = min + (max - min) · (100vw - 1100px) / (3840 - 1100)
```

Para `min = 1rem` e um novo `max`, recalcular os dois termos internos. (Manter o `min` em `1rem` para preservar a preferência do usuário nas telas pequenas.)

---

## 5. Arquivos-chave

| Arquivo | Papel |
|---|---|
| [`src/app/globals.css`](../src/app/globals.css) | `clamp()` da raiz, escala tipográfica em `rem`, `--header-height`, tokens de cor |
| [`src/components/header.tsx`](../src/components/header.tsx) | Header — Tailwind idiomático em `rem` |
| [`src/components/hero.tsx`](../src/components/hero.tsx) | Hero — ainda com paddings em px (migrar p/ `rem`) |

---

## 6. Gotchas

- **Cache de CSS do Turbopack (Next 16):** editar uma **regra existente** em `globals.css` às vezes não faz hot-reload — o chunk compilado continua servindo o valor antigo (regras **novas** aparecem normalmente). Se uma mudança não refletir após reload: `rm -rf .next/cache` e reinicie o dev server. Verificar lendo a regra compilada em `document.styleSheets`, não só o `getComputedStyle`.
- **`rem` no `font-size` do `<html>`:** o `rem` ali resolve contra o default do navegador, não contra o valor sendo calculado — sem recursão. É o que preserva a preferência de fonte do usuário.
