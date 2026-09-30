# Capturas do ecrã em vários pontos do scroll: python scripts/captura_scroll.py b 1440 0.2 0.35 0.5
import sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
pag, w, fr = sys.argv[1], int(sys.argv[2]), [float(x) for x in sys.argv[3:]]
out = Path("C:/Users/UTILIZ~1/AppData/Local/Temp/claude/c--Users-Utilizador-Desktop-SITES-P-tio-da-Gata/f301767e-163e-4058-8390-e8b255f0809c/scratchpad")
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": w, "height": 900 if w > 800 else 844})
    pg.goto(f"http://localhost:5188/{pag}.html", wait_until="networkidle"); time.sleep(1.5)
    h = pg.evaluate("document.body.scrollHeight")
    for f in fr:
        alvo = int(h * f)
        y = pg.evaluate("window.scrollY")
        while y < alvo:  # scroll gradual, como uma pessoa
            y = min(alvo, y + 250); pg.evaluate(f"window.scrollTo(0,{y})"); time.sleep(0.05)
        time.sleep(1.6)
        pg.screenshot(path=str(out / f"{pag}-{w}-s{int(f*100)}.png"))
    b.close()
