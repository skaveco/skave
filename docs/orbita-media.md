# Case Órbita

Órbita substitui Smart Pedidos na terceira posição do registro de projetos, com destaque na home. Rotas: `/pt/projetos/orbita` e `/en/projetos/orbita`.

## Conteúdo e mídias

- Textos, serviços, localização, data (20/04/2026), capacidades e créditos transcritos de `Copy.png`, com tradução para inglês.
- H1: “Design de UI/UX e Design System para o gateway de pagamentos Órbita Pay”.
- Capa: vídeo `cover-loop.mp4` e poster `cover-poster.webp`, extraído no segundo 34 para apresentar o dashboard.
- Galeria completa: 13 imagens, de 02 a 14, em ordem. `Copy.png` é a referência editorial e não entra na galeria.
- Originais preservados em `public/project/orbita/`, ao lado dos arquivos otimizados.

## Tamanhos antes/depois

Valores em MB decimais. A capa final inclui vídeo e poster.

| Arquivo original | Antes | Final | Redução |
|---|---:|---:|---:|
| cover.mp4 | 163.796 MB | 5.755 MB | 96.5% |
| 02.png | 0.092 MB | 0.032 MB | 65.2% |
| 03.png | 0.058 MB | 0.017 MB | 70.3% |
| 04.png | 0.182 MB | 0.064 MB | 64.6% |
| 05.png | 0.095 MB | 0.034 MB | 64.0% |
| 06.png | 0.163 MB | 0.051 MB | 69.0% |
| 07.png | 0.121 MB | 0.038 MB | 68.9% |
| 08.png | 1.063 MB | 0.107 MB | 89.9% |
| 09.png | 0.120 MB | 0.042 MB | 64.9% |
| 10.png | 0.632 MB | 0.096 MB | 84.9% |
| 11.png | 0.388 MB | 0.092 MB | 76.4% |
| 12.png | 0.701 MB | 0.119 MB | 83.0% |
| 13.png | 0.108 MB | 0.028 MB | 74.1% |
| 14.png | 1.845 MB | 0.148 MB | 92.0% |
| **Total** | **169.36 MB** | **6.62 MB** | **96.1%** |

Economia nos arquivos usados pelo case: 162.74 MB. O download efetivo depende da viewport e das mídias visualizadas.

## Conversão

- Imagens mantidas em 1920 × 1080. WebP sem perdas nas peças 02, 03, 04, 05, 07, 09 e 13; qualidade 88 nas demais.
- Capa convertida de 3616 × 2034 a 60 fps para 1920 × 1080 a 30 fps, preservando a demonstração completa de aproximadamente 35,6 segundos.
- H.264, CRF 23, preset slow, yuv420p e faststart. O original não contém áudio.
- Poster em WebP qualidade 88, gerado diretamente do original.

## Integração e verificação

- Dados em `src/data/projects/orbita/{index,pt,en}.ts` e registro atualizado em `src/data/projects.ts`.
- Smart Pedidos removido do registro ativo. Seus arquivos anteriores permanecem preservados.
- Componentes existentes reutilizados, incluindo reprodução por visibilidade, preferência de movimento reduzido e proporções da galeria.
- Build com `npm run build -- --webpack` aprovado, incluindo TypeScript. Webpack permite compilar dentro do sandbox sem a porta interna exigida pelo Turbopack.
- Rotas Orbita nos dois idiomas confirmadas no manifesto de prerenderização e no HTML gerado; Smart Pedidos ausente.
- Posição na home/listagem, projetos relacionados, campos obrigatórios e caminhos dos arquivos verificados.
- Lint sem erros; dois avisos preexistentes na skill animate-text.
- Capa decodificada por completo sem erros e índice MP4 verificado antes dos dados de vídeo.
- Comparação visual de imagens com texto pequeno e fotografias (08 e 14), além de um quadro da capa otimizada.

Na revisão visual do site, conferir o recorte da capa no card, o movimento da demonstração e os textos pequenos das peças 08 e 14. Nenhum servidor ou navegador foi iniciado.
