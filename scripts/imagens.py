# Gera versões webp responsivas das fotos do dossiê em public/img/ e o manifesto src/shared/fotos.json.
# Correr: python scripts/imagens.py
import json
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parents[1]
ORIGEM = RAIZ / "dossie/marketing/fotos"
DESTINO = RAIZ / "public/img"
LARGURAS = [480, 800, 1200, 1600]
FOTOS = [
    "exterior/vista-01", "exterior/fachada-01", "exterior/fachada-02", "exterior/patio-01",
    "interior/sala-01", "interior/sala-02", "interior/refeicoes-01", "interior/cozinha-01",
    "interior/quarto-16", "interior/quarto-22", "interior/quarto-02", "interior/quarto-23",
    "interior/corredor-01", "interior/detalhe-01", "interior/quarto-10", "interior/quarto-05",
    "interior/quarto-01", "interior/quarto-09", "interior/quarto-30", "interior/quarto-18",
    "interior/quarto-24", "interior/quarto-14", "interior/quarto-06", "interior/quarto-31",
    "interior/casa-de-banho-02", "interior/casa-de-banho-06",
    # galerias de cada tipo de quarto no Booking (quartos.md, fotos.md)
    "interior/casa-de-banho-03", "interior/casa-de-banho-04", "interior/quarto-08", "interior/quarto-11", "interior/quarto-12", "interior/quarto-13", "interior/quarto-15", "interior/casa-de-banho-05", "interior/quarto-17", "interior/quarto-19", "interior/quarto-20", "interior/quarto-21", "interior/casa-de-banho-07", "interior/casa-de-banho-08", "interior/quarto-25", "interior/quarto-26", "interior/quarto-27", "interior/quarto-03", "interior/casa-de-banho-01", "interior/quarto-28", "interior/quarto-29", "interior/quarto-04", "interior/quarto-07", "interior/quarto-32", "interior/casa-de-banho-09",
    # galeria dos espaços comuns
    "interior/cozinha-02", "interior/cozinha-03",
]
# Fotos que não são da casa (licença e crédito em fotos-externas/CREDITOS.md). A capa precisa de
# larguras maiores: ocupa o ecrã todo, e no telemóvel o corte vertical amplia a foto.
EXTERNAS = {
    "alta-mondego-01": [640, 1024, 1600, 2400, 3200],
    # secção "Por perto"
    "perto-museu": [640, 1024, 1600, 2400], "perto-universidade": [640, 1024, 1600, 2400],
    "perto-universidade-02": [640, 1024, 1600, 2296], "perto-universidade-03": [640, 1024, 1600, 2400],
    # capa
    "coimbra-entardecer": [640, 1024, 1600, 2400, 3168], "coimbra-entardecer-02": [640, 1024, 1600, 2400, 2730],
    "perto-aqueduto": [640, 1024, 1600, 2400], "perto-santa-clara": [640, 1024, 1600, 2400],
    "perto-museu-02": [640, 1024, 1200], "perto-santa-clara-02": [640, 1024, 1600, 2400], "perto-aqueduto-02": [640, 1024, 1600, 2400],
}
# Fotos da casa tratadas (fotos-processadas/LEIA-ME.md): a fachada ampliada para a capa.
PROCESSADAS = {"fachada-01-hd": [640, 1024, 1600, 1682], "fachada-03-hd": [640, 1024, 1600, 1682], "patio-02": [640, 1024, 1138], "fachada-02-hd": [640, 1024, 1600, 2132], "vista-01-hd": [640, 1024, 1600, 2400, 3072]}
DESTINO.mkdir(parents=True, exist_ok=True)
manifesto = {}
for f in FOTOS:
    nome = f.split("/")[1]
    im = Image.open(ORIGEM / f"{f}.jpg").convert("RGB")
    w, h = im.size
    tamanhos = sorted({min(l, w) for l in LARGURAS})
    for l in tamanhos:
        im.resize((l, round(h * l / w)), Image.LANCZOS).save(DESTINO / f"{nome}-{l}.webp", "WEBP", quality=78, method=6)
    manifesto[nome] = {"w": w, "h": h, "larguras": tamanhos, "origem": f"dossie/marketing/fotos/{f}.jpg"}
for pasta, fotos in (("fotos-externas", EXTERNAS), ("fotos-processadas", PROCESSADAS)):
  for nome, larguras in fotos.items():
    im = Image.open(RAIZ / f"{pasta}/{nome}.jpg").convert("RGB")
    w, h = im.size
    tamanhos = sorted({min(l, w) for l in larguras})
    for l in tamanhos:
        im.resize((l, round(h * l / w)), Image.LANCZOS).save(DESTINO / f"{nome}-{l}.webp", "WEBP", quality=80, method=6)
    manifesto[nome] = {"w": w, "h": h, "larguras": tamanhos, "origem": f"{pasta}/{nome}.jpg"}
(RAIZ / "src/shared/fotos.json").write_text(json.dumps(manifesto, indent=1), encoding="utf-8")
print(len(manifesto), "fotos,", sum(p.stat().st_size for p in DESTINO.glob("*.webp")) // 1024, "KB")
