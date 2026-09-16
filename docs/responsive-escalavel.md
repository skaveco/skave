# Responsividade e escala

O site combina escala global em `rem` com mudanças de layout por breakpoint. A fonte de referência é `src/app/globals.css`; os componentes definem seus ajustes locais.

## Escala global

A regra atual da raiz é:

```css
html {
  font-size: clamp(1rem, calc(0.198rem + 1.1679vw), 3rem);
}
```

Com fonte padrão de 16px, a raiz permanece em 16px até aproximadamente 1100px e cresce até 48px perto de 3840px. Valores em `rem` acompanham essa escala; pixels fixos não. Os limites mudam conforme a preferência de fonte do navegador, pois o `rem` nesta regra se refere à fonte inicial.

Ao ajustar a escala, altere os coeficientes e o teto juntos. Confira telas próximas de 1100px, larguras intermediárias e 4K, além de zoom e fonte ampliada. A mudança afeta tipografia, espaços e dimensões de todos os componentes que usam `rem`.

## Convenções

- Use as classes tipográficas `.type-*` de `globals.css`, como `.type-display-md`, `.type-heading-md`, `.type-body-base` e `.type-label-sm`.
- Use utilitários de espaçamento do Tailwind ou valores arbitrários em `rem` para medidas que devem escalar. Reserve pixels fixos para detalhes que realmente precisam deles.
- Use breakpoints para mudanças estruturais: colunas, direção do flex, visibilidade e navegação. O layout mobile é a base.
- Evite adicionar escala fluida por propriedade sem considerar a escala da raiz, para não ampliar a mesma medida duas vezes.

## Breakpoints e ajustes locais

| Variante | Token | Equivalência com fonte padrão de 16px |
|---|---|---|
| Mobile | Estilos-base | Abaixo de 768px |
| `tablet:` | `48rem` | A partir de 768px |
| `desktop:` | `68.75rem` | A partir de 1100px |

Esses tokens estão no `@theme inline`. Media queries em `rem` usam a fonte inicial do navegador, não o tamanho calculado da raiz.

Os componentes já possuem ajustes mobile/tablet/desktop. A tipografia também tem mudanças explícitas em `48rem`: por exemplo, `.type-display-md` passa de `4rem` para `7rem`. Não há uma interpolação individual universal entre mobile e desktop.

O espaçamento lateral recorrente das seções é `1.25rem` no mobile e `2.5rem` a partir de tablet. Confira o componente antes de aplicar esse padrão: existem exceções, como o header desktop com `px-8`.

## Header e verificação visual

`--header-height` vale `4.125rem`, correspondente à altura declarada do header desktop. O header mobile tem estrutura própria; não presuma que esse token descreve todas as suas alturas.

Ao alterar uma seção, confira overflow horizontal, quebras de texto, enquadramento de mídias e sobreposição com o header fixo nos três intervalos. Use os componentes atuais como referência e registre aqui apenas mudanças duradouras das regras de escala, evitando listas de pendências ou resultados de uma sessão específica.
