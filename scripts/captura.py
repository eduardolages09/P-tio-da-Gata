# Capturas de ecrã para rever o protótipo: python scripts/captura.py a [largura ...]
import sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
pag = sys.argv[1]
larguras = [int(x) for x in sys.argv[2:]] or [1440, 390]
out = Path("C:/Users/UTILIZ~1/AppData/Local/Temp/claude/c--Users-Utilizador-Desktop-SITES-P-tio-da-Gata/f301767e-163e-4058-8390-e8b255f0809c/scratchpad")
with sync_playwright() as p:
    b = p.chromium.launch()
    for w in larguras:
        pg = b.new_page(viewport={"width": w, "height": 900 if w > 800 else 844}, device_scale_factor=1)
        erros = []
        pg.on("console", lambda m: m.type in ("error", "warning") and erros.append(m.text))
        pg.on("pageerror", lambda e: erros.append(str(e)))
        pg.goto(f"http://localhost:5188/{pag}.html", wait_until="networkidle")
        time.sleep(2)
        pg.screenshot(path=str(out / f"{pag}-{w}-topo.png"))
        # percorre a página para disparar as revelações
        h = pg.evaluate("document.body.scrollHeight")
        for y in range(0, h, 400):
            pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.12)
        time.sleep(1.2)
        pg.evaluate("window.scrollTo(0,0)"); time.sleep(0.3)
        pg.screenshot(path=str(out / f"{pag}-{w}-full.png"), full_page=True)
        print(w, "altura", h, "erros:", erros[:5])
    b.close()
