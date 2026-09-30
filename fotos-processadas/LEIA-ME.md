# Fotografias da casa tratadas para o site

Os originais ficam intactos no dossiê. Se a dona enviar as fotos em alta resolução, substituir por essas.

| Ficheiro | Origem | Tratamento | Onde |
|---|---|---|---|
| `vista-01-hd.jpg` | `dossie/marketing/fotos/exterior/vista-01.jpg` (Booking, foto 787726770; 1536×2048) | Ampliada 2× para 3072×4096 | capa |
| `fachada-01-hd.jpg` | enviada pelo cliente em 2026-09-29 (a mesma foto de `dossie/marketing/fotos/exterior/fachada-01.jpg`, em maior resolução: 1682×2528) | Nenhum | cartão final "Escolha as datas" até 2026-09-30; hoje só a fonte de `patio-02` |
| `fachada-03-original.jpg` | enviada pelo cliente em 2026-09-30 (a fachada de frente, do pátio; 1682×2528) | Nenhum | não é usada no site: é a fonte de `fachada-03-hd` |
| `fachada-03-hd.jpg` | recorte de `fachada-03-original.jpg` sem a água-furtada de cima (y=360 até ao fundo; 1682×2168; fica o telhado largo): o cliente pediu para não a mostrar, por não ter a certeza de que a foto é fiel à casa | Só recorte | cartão final "Reserve a sua estadia" |
| `patio-02.jpg` | recorte de `fachada-01-hd.jpg` (parte de baixo: calçada, videira, porta e janela amarela; 1138×1517, x=306 y=1011) | Só recorte | foto pequena da secção "A Casa" (em vez de `patio-01`, desde 2026-09-30) |
| `fachada-02-hd.jpg` | `dossie/marketing/fotos/exterior/fachada-02.jpg` (Booking, foto 785168392, 8.ª da galeria; 1066×1600, o maior tamanho que o Booking serve) | Ampliada 2× para 2132×3200 | secção "A Casa" (foi capa até 2026-09-29) |

**Como foram ampliadas:** Real-ESRGAN x4plus reduzido a 2× (70%), misturado com ampliação Lanczos (30%)
para manter a textura (cal, telhas), e grão leve. Comparado a 100% com a ampliação simples antes de usar.
