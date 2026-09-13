# Case Click Cannabis

Click Cannabis substitui Normedic na primeira posição do registro, com destaque na home. Rotas: `/pt/projetos/clickcannabis` e `/en/projetos/clickcannabis`.

## Conteúdo e mídias

- Textos, serviços, localização, data (01/02/2026), capacidades e créditos transcritos de `Copy.png`, com tradução para inglês.
- H1: “Identidade visual para a Click Cannabis: expansão de uma marca de telemedicina”.
- Categoria: Desenvolvimento de Marca.
- Capa: `cover.webp`, usada nos cards e no hero.
- Galeria completa: animação 01 e imagens 02–10, em ordem. `Copy.png` permanece como referência editorial.
- Originais preservados em `public/project/clickcannabis/`, ao lado das versões otimizadas.

## Tamanhos antes/depois

Valores em MB decimais. A animação final inclui vídeo e poster.

| Arquivo original | Antes | Final | Redução |
|---|---:|---:|---:|
| 01.gif | 0.021 MB | 0.041 MB | aumento de 100.3% |
| 02.png | 0.058 MB | 0.017 MB | 70.6% |
| 03.png | 3.782 MB | 0.354 MB | 90.6% |
| 04.png | 0.085 MB | 0.029 MB | 66.4% |
| 05.jpg | 1.686 MB | 0.304 MB | 82.0% |
| 06.png | 0.287 MB | 0.078 MB | 72.6% |
| 07.jpg | 2.442 MB | 0.437 MB | 82.1% |
| 08.jpg | 0.361 MB | 0.055 MB | 84.8% |
| 09.png | 3.708 MB | 0.416 MB | 88.8% |
| 10.png | 1.678 MB | 0.065 MB | 96.1% |
| cover.jpg | 1.303 MB | 0.200 MB | 84.7% |
| **Total** | **15.41 MB** | **2.00 MB** | **87.0%** |

Economia: 13.41 MB nos arquivos usados pelo case. O download efetivo depende da viewport e das mídias visualizadas.

## Conversão

- Peças 02 e 04 em WebP sem perdas. Demais imagens e capa em WebP qualidade 88, mantendo as dimensões originais.
- A peça 02 mede 1920 × 1088; as demais imagens, 1920 × 1080. A galeria usa a proporção de cada arquivo.
- GIF 01 convertido para MP4 H.264, CRF 18, preset slow, yuv420p e faststart, com os quatro estados de cor e duração de quatro segundos.
- Animação ajustada de 960 × 575 para 960 × 576 para compatibilidade com H.264; poster WebP sem perdas gerado do GIF original.
- O GIF original já era pequeno. Vídeo e poster juntos ficam cerca de 20 KB maiores, mas permitem pausar fora da viewport e respeitar a preferência por movimento reduzido através do componente existente.

## Integração e verificação

- Dados em `src/data/projects/clickcannabis/{index,pt,en}.ts` e registro atualizado em `src/data/projects.ts`.
- Normedic removido do registro ativo; arquivos anteriores preservados.
- Componentes existentes reutilizados, incluindo lazy loading de imagens e reprodução dos vídeos por visibilidade.
- Build com `npm run build -- --webpack` e TypeScript aprovados.
- Páginas nos dois idiomas confirmadas no manifesto de prerenderização e no HTML gerado; Normedic ausente.
- Posição na home/listagem, presença nos projetos relacionados, textos e caminhos das dez mídias verificados.
- Lint sem erros; dois avisos preexistentes na skill animate-text.
- Animação decodificada por completo sem erros; faststart verificado; quatro estados de cor inspecionados.
- Comparação visual da fotografia 03 e da capa, incluindo pele, tecido e detalhes de fundo.

Na revisão visual do site, conferir o recorte da capa no card, as quatro cores da animação 01 e os detalhes das fotografias 03, 07 e 09. Nenhum servidor ou navegador foi iniciado.
