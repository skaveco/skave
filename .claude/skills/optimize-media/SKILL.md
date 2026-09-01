---
name: optimize-media
description: Otimiza imagens e vídeos de um projeto web para performance, sem perda visível de qualidade — inventaria os arquivos, escolhe formato, dimensão e compressão por tipo de conteúdo, converte e ajusta o código que consome as mídias. Use sempre que o usuário disser "/optimize-media", "otimiza as mídias", "as imagens estão pesadas", "o vídeo demora pra carregar", "melhora a performance do site", ou quando aparecerem arquivos grandes em public/ ou assets. Use também antes de um deploy, quando o LCP está ruim, ou quando um GIF/MP4 foi adicionado ao projeto.
---

# Otimizar mídias

Mídia é quase sempre a maior parte do peso de um site — e a parte mais fácil de melhorar, porque o ganho vem de decisão, não de esforço. Um vídeo de 40MB vira 4MB sem que ninguém veja diferença; uma foto exportada em 4000px servida num slot de 600px desperdiça 90% do que baixou.

O objetivo é **peso menor com qualidade visualmente idêntica**. "Visualmente" é a palavra que importa: o alvo não é o menor arquivo possível, é o menor arquivo em que a diferença não se percebe no uso real. Compressão agressiva demais que borra a foto do cliente custa mais caro do que os KB que economizou.

O fluxo tem um portão: **inventariar → devolver o plano → esperar o OK → converter → entregar para conferir.** Aqui o portão não é só alinhamento, é segurança — a operação reescreve arquivos binários, e original perdido não volta.

## 1. Inventariar antes de tocar em nada

Liste as mídias com **peso, dimensões e formato**, ordenadas por tamanho. Procure em `public/`, `assets/`, `static/` ou onde o projeto guardar.

Ordenar por peso é o que direciona o trabalho: quase sempre 3 ou 4 arquivos respondem pela maior parte do problema, e mexer nos outros quarenta rende quase nada. Um SVG de 8KB não precisa de atenção.

Para vídeos, `ffprobe` dá o que importa:

```bash
ffprobe -v error -show_entries format=duration,bit_rate:stream=width,height,codec_name -of default=noprint_wrappers=1 arquivo.mp4
```

**Descubra também onde cada arquivo é usado no código.** É isso que revela o desperdício real: uma imagem de 3000px de largura renderizada num contêiner de 400px é o achado mais comum, e nenhuma compressão conserta isso — só redimensionar.

## 2. Checar as ferramentas

- **`ffmpeg`** para vídeo. Não estando instalado, é bloqueio real. No Windows: `winget install Gyan.FFmpeg`. No macOS: `brew install ffmpeg`.
- **`sharp`** para imagem. Projetos Next costumam já ter na árvore de dependências; senão, `npm i -D sharp` resolve, e um script curto usando a API é mais confiável que decorar flags de CLI.
- **`svgo`** para SVG, via `npx svgo`.

Verifique antes de prometer. Descobrir a ausência no meio da conversão deixa o trabalho pela metade.

## 3. Decidir por arquivo

Não existe formato "melhor" — existe formato certo para cada tipo de conteúdo.

**Foto / imagem com gradiente** → AVIF, com WebP como alternativa. AVIF comprime melhor que WebP na mesma qualidade percebida, e ambos batem JPEG com folga. Custo: AVIF codifica devagar, o que importa em lote grande, não no resultado.

**Ilustração, ícone, logo** → SVG, otimizado com SVGO. Logo em PNG é erro puro: pesa mais e borra quando a tela escala. Se o SVG vier do Figma com metadado e grupos vazios, o SVGO tira metade do peso sem tocar no desenho.

**Imagem com áreas chapadas e poucas cores** (gráfico, captura de UI) → WebP lossless costuma ganhar do PNG. Vale medir os dois, é rápido.

**Transparência** → WebP e AVIF suportam. PNG só se houver requisito de compatibilidade antiga.

**Qualquer coisa animada** → **vídeo, nunca GIF.** GIF é o pior formato em uso na web: sem compressão temporal, sem áudio, paleta de 256 cores. O mesmo conteúdo em MP4 costuma ficar entre 10 e 20 vezes menor *e* com mais qualidade. Se houver GIF no projeto, converter é o maior ganho isolado disponível.

**Dimensão importa mais que compressão.** Antes de escolher qualidade, defina a largura alvo: o maior tamanho em que a imagem é realmente exibida, multiplicado por 2 para telas de alta densidade. Passar de 2x rende diferença que ninguém enxerga e peso que todo mundo baixa.

### Faixas de qualidade que costumam funcionar

Ponto de partida, não regra — o conteúdo manda:

| Formato | Faixa | Observação |
|---|---|---|
| AVIF | 50–65 | escala diferente do JPEG; 50 aqui não é "metade da qualidade" |
| WebP | 75–82 | abaixo de 70 começa a aparecer em gradiente |
| JPEG | 80–85 | usar codificador moderno (mozjpeg) quando disponível |
| H.264 (CRF) | 23–28 | menor = melhor e mais pesado |
| VP9 / AV1 (CRF) | 30–35 | escala diferente do H.264, não comparar os números |

Duas regras que protegem a qualidade:

**Sempre partir do original.** Recomprimir um arquivo já comprimido acumula perda a cada rodada, e o resultado piora mesmo com qualidade alta. Se o original não existe mais, diga — é limitação real, não detalhe.

**Conferir com o olho, não com o número.** Foto de pele, céu, gradiente e textura fina são onde o artefato aparece primeiro. O número de qualidade é chute inicial; a decisão é visual.

## 4. Devolver o plano e parar

Apresente assim e **aguarde o OK antes de converter**:

```
## Inventário
| Arquivo | Hoje | Usado em | Exibido a | Proposta | Estimativa |
|---|---|---|---|---|---|
| hero.png | 4,2 MB · 3840px | hero.tsx | ~800px | AVIF 1600px | ~180 KB |

## Total
Peso atual → peso estimado.

## Onde vou mexer no código
Os arquivos que apontam para as mídias trocadas.

## Decisões e perguntas
O que assumi. O que preciso que você responda.

## Originais
Onde ficam guardados.
```

Perguntas que costumam ser necessárias:

- **Substituir ou gerar ao lado?** Trocar no lugar é mais limpo mas descarta o original; gerar ao lado deixa você comparar antes de decidir.
- **Vídeo tem áudio relevante?** Vídeo decorativo ou de fundo não deveria ter faixa de áudio — ela pesa e impede o autoplay em qualquer navegador moderno.
- **Alguma imagem é institucional?** Foto de produto, retrato de pessoa e material de cliente pedem margem de qualidade maior que uma textura de fundo.

## 5. Converter

**Nunca sobrescreva o original sem cópia.** Guarde numa pasta fora do que é servido (ex.: `.originais/`, no `.gitignore`) ou trabalhe gerando ao lado. É o único passo irreversível de toda a skill.

Imagem, com sharp — redimensiona e codifica numa passada:

```js
await sharp(entrada)
  .resize({ width: 1600, withoutEnlargement: true })
  .avif({ quality: 55 })
  .toFile(saida);
```

`withoutEnlargement` evita o erro silencioso de ampliar uma imagem pequena, que só adiciona peso e borra.

SVG:

```bash
npx svgo entrada.svg -o saida.svg
```

Vídeo, H.264 para compatibilidade universal:

```bash
ffmpeg -i entrada.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an saida.mp4
```

Cada flag resolve um problema concreto:

- **`-movflags +faststart`** move o índice do arquivo para o início. Sem ele o navegador precisa baixar quase tudo antes do primeiro quadro — é a causa mais comum de "o vídeo demora a começar", e não tem nada a ver com o tamanho.
- **`-pix_fmt yuv420p`** garante que toca em todo lugar; sem isso alguns encodes ficam pretos no Safari.
- **`-preset slow`** gasta mais tempo de máquina para gerar arquivo menor na mesma qualidade. É tempo seu, não do usuário.
- **`scale=1920:-2`** preserva a proporção e mantém a altura par, que o codec exige.
- **`-an`** remove o áudio.

GIF para vídeo:

```bash
ffmpeg -i entrada.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 \
  -crf 23 -pix_fmt yuv420p -movflags +faststart -an saida.mp4
```

Poster (o primeiro quadro, exibido enquanto o vídeo carrega):

```bash
ffmpeg -i saida.mp4 -ss 00:00:01 -frames:v 1 poster.jpg
```

## 6. Ajustar o código

Converter sem mexer no código entrega metade do ganho.

**Com `next/image`**, boa parte do trabalho já é automática: ele redimensiona e serve AVIF/WebP sob demanda. Então o que importa é o **original ter resolução suficiente** e o consumo estar certo — `sizes` descrevendo o espaço real que a imagem ocupa, `priority` **apenas** na imagem que é o LCP (colocar em várias anula o efeito, porque tudo vira prioritário e nada é), e `width`/`height` ou `fill` com contêiner dimensionado, para não haver salto de layout.

**Fora do `next/image`** — imagem em CSS, `<img>` cru, ou qualquer framework sem otimizador — a conversão manual é o único ganho, e vale servir mais de um formato com `<picture>`.

**Vídeo não passa por otimizador nenhum.** É sempre manual, e é onde a skill mais rende:

```html
<video autoplay muted loop playsinline preload="metadata" poster="/poster.jpg">
  <source src="/video.webm" type="video/webm" />
  <source src="/video.mp4" type="video/mp4" />
</video>
```

`muted` e `playsinline` não são estilo — sem os dois o autoplay simplesmente não acontece no iOS. `preload="metadata"` baixa só o cabeçalho em vez do vídeo inteiro; `auto` num vídeo de fundo consome a banda que a página precisa para renderizar.

Vídeo decorativo merece ainda: não carregar em conexão lenta ou tela pequena, e respeitar `prefers-reduced-motion` — movimento de fundo causa desconforto real em quem tem sensibilidade vestibular.

## 7. Entregar para conferir

Não suba servidor nem abra navegador. Entregue:

- **tabela antes/depois** com peso por arquivo e o total economizado, em MB e em porcentagem
- **o que conferir com o olho**, nomeando os arquivos de risco: fotos com pele, céu, gradiente ou texto pequeno são onde o artefato aparece primeiro
- **onde estão os originais**
- **o que mudou no código**
- **pendências** — arquivo que ficou de fora e por quê

Se alguma peça ficou ruim, o conserto é subir a qualidade daquele arquivo e reconverter **a partir do original** — nunca a partir do já convertido.
