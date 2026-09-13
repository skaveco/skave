# Mídias da Aurea

Galeria integrada em `/pt/projetos/aurea` e `/en/projetos/aurea`, na ordem 02–12. A capa existente continua nos cards e no hero.

## Otimização

Tamanhos em MB decimais. O tamanho final dos vídeos inclui o poster WebP.

| Arquivo original | Antes | Final | Redução |
|---|---:|---:|---:|
| 02.png | 0.066 MB | 0.021 MB | 68.3% |
| 03.png | 0.032 MB | 0.009 MB | 72.8% |
| 04.png | 0.069 MB | 0.023 MB | 66.3% |
| 05.png | 0.369 MB | 0.118 MB | 68.1% |
| 06 - video.mp4 | 7.484 MB | 0.990 MB | 86.8% |
| 07.png | 0.884 MB | 0.122 MB | 86.2% |
| 08.png | 0.973 MB | 0.147 MB | 84.9% |
| 09 - video.mp4 | 4.952 MB | 0.975 MB | 80.3% |
| 10.png | 0.308 MB | 0.120 MB | 61.1% |
| 11 - video.mp4 | 2.715 MB | 0.806 MB | 70.3% |
| 12.png | 1.669 MB | 0.203 MB | 87.9% |
| **Total** | **19.52 MB** | **3.53 MB** | **81.9%** |

Economia: 15.99 MB nos arquivos da galeria. O download efetivo depende do tamanho de tela e das mídias visualizadas.

## Arquivos e qualidade

- Originais preservados em `public/project/aurea/`, ao lado das versões otimizadas.
- Imagens 02–04 em WebP sem perdas; demais imagens em WebP qualidade 88. Resoluções originais preservadas.
- Vídeos em H.264, CRF 23, preset slow, yuv420p e faststart, preservando resolução, duração e 30 fps. Os originais não têm áudio.
- Posters extraídos no segundo 1 dos vídeos originais e convertidos em WebP qualidade 88.
- `Cover.mp4`, `cover-loop.mp4` e `cover-poster.webp` preservados; a capa já usava a versão otimizada.

## Integração

- Galeria e descrições acessíveis cadastradas em `src/data/projects/aurea/pt.ts` e `en.ts`.
- Dimensões opcionais em `ProjectMedia` permitem preservar a proporção real de cada peça. Mídias sem dimensões mantêm a proporção anterior.
- `sizes` reflete a largura real da galeria. Vídeos usam `preload="none"` e o componente existente controla a reprodução pela visibilidade e preferência de movimento reduzido.

## Verificação

- Comparação visual das imagens, incluindo recortes com fotografias e texto pequeno nas peças 08 e 12, e inspeção de quadros dos três vídeos.
- Decodificação completa dos três vídeos sem erros; índice MP4 confirmado antes dos dados de vídeo (faststart).
- Todos os caminhos das mídias em português e inglês existem.
- TypeScript (`tsc --noEmit`) e verificação do diff passaram.
- Quatro testes existentes de reprodução passaram; lint sem erros, com dois avisos preexistentes na skill animate-text.
- Build pendente: o sandbox bloqueou a porta interna do Turbopack e a execução com permissão ampliada foi recusada.

Na revisão visual do site, conferir principalmente os textos pequenos das peças 08 e 12 e o movimento dos vídeos 06, 09 e 11. Nenhum servidor ou navegador foi iniciado.
