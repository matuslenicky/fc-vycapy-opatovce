# FC Výčapy-Opatovce – návrh webu

Návrh nového webu futbalového klubu Združenie FC Výčapy-Opatovce. **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/fc-vycapy-opatovce/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/fc-vycapy-opatovce/admin/

## Vzhľad

**„Pás kariet“ (dizajn v2, 18. 11. 2026).** Biela, teplá sivá, červená z erbu, žltá len v detailoch. Písmo Bodoni Moda (titulky, citát) a Schibsted Grotesk (text).

- úvod otvára veľký citát piesne „Majme sa radi, chlapci…“, ktorá sa po zápase s bratislavským Törekvésom v roku 1940 roky spievala po každom zápase,
- pod ním pás s najbližším zápasom áčka a dva pásy kariet, program a výsledky (áčko a žiaci); na telefóne sa karty posúvajú vodorovne, na počítači sú v mriežke,
- tabuľka VI. ligy Stred; história od rokov 1929 – 1930, ročníky, úspechy, ihrisko a obec sú na stránke Klub,
- menu na telefóne je biela plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 6 tímov (áčko, U13, U11 A a B, U9, U7) zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Ročníky áčka 2014/15 – 2025/26 z konečných tabuliek na Sportnete, titul vo VII. lige ObFZ Nitra 2025/26, úspechy dorastu a žiakov (`data/klub.json`).
- História futbalu (1929 – 1999) zo stránky Šport na webe obce, ktorá cituje monografiu Výčapy – Opatovce (kolektív autorov, 1999). Projekty klubu na ihrisku s dotáciami Nitrianskeho kraja 2024 – 2026 z tej istej stránky. Obec podľa webu obce (História obce).
- E-mail zo Sportnetu. Vlastný web ani sociálne siete klubu sme nenašli (18. 11. 2026).
- Erb klubu a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom.
- Písmo Bodoni Moda a Schibsted Grotesk, licencia SIL Open Font License 1.1 (`scripts/fonts.py`, rovné číslice sú zapečené do písma).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby a fontTools na písmo):

```
python C:\Users\lenic\kluby-siet\engine\assemble.py .   # zloží build.js a site.css zo spoločného jadra
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-18 prepíše dnešný dátum)
node scripts/serve.mjs dist 5454 # náhľad na http://127.0.0.1:5454/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`). Ročníky v `data/klub.json` treba po sezóne doplniť ručne.
