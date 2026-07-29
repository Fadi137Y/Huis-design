#!/usr/bin/env python3
"""
Genereert de tijdelijke beelden voor F2studio als SVG.

Deze beelden zijn bewust abstract: warme, onscherpe lichtvlakken met filmkorrel,
in dezelfde kleuren als de site. Ze vullen de plek van de echte foto's totdat
Fadi & Fady hun eigen werk uploaden.

Vervangen? Zie src/lib/media.ts — daar staat per plek welk bestand gebruikt wordt.

Gebruik:  python3 scripts/genereer-beelden.py
"""

import math
import os
import random

UIT = os.path.join(os.path.dirname(__file__), "..", "public", "beelden")

# Warme paletten die aansluiten op de huisstijl (crème / taupe / warm zwart).
PALETTEN = {
    "goud": ["#F6EFE4", "#E4D2B8", "#C9A876", "#9C7A4C", "#5E4630"],
    "roze": ["#F8EFE9", "#EBD5CB", "#D6AC9B", "#A97A6A", "#5C4038"],
    "salie": ["#F2F0E7", "#DCDCC9", "#B4B79C", "#83876C", "#454832"],
    "avond": ["#EDE4D8", "#C9B49A", "#93765A", "#5B4534", "#2A2018"],
    "kaars": ["#FBF4E8", "#F0DDBE", "#DCB878", "#A8834C", "#4E3B24"],
    "steen": ["#F4F1EC", "#E0D9CE", "#BEB2A2", "#8A7D6C", "#463E33"],
}


def blob(rng, breedte, hoogte, kleur, index):
    """Eén zacht, onscherp lichtvlak — de basis van de bokeh-look."""
    cx = rng.uniform(-0.15, 1.15) * breedte
    cy = rng.uniform(-0.15, 1.15) * hoogte
    r = rng.uniform(0.28, 0.72) * max(breedte, hoogte)
    dekking = rng.uniform(0.35, 0.85)
    return (
        f'  <radialGradient id="g{index}" cx="50%" cy="50%" r="50%">\n'
        f'    <stop offset="0%" stop-color="{kleur}" stop-opacity="{dekking:.2f}"/>\n'
        f'    <stop offset="100%" stop-color="{kleur}" stop-opacity="0"/>\n'
        f"  </radialGradient>\n",
        f'  <ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="{r:.0f}" ry="{r * rng.uniform(0.6, 1.1):.0f}" fill="url(#g{index})"/>\n',
    )


def bokeh_stip(rng, breedte, hoogte, kleur):
    """Kleine lichtcirkel, zoals onscherpe lichtjes op de achtergrond."""
    cx = rng.uniform(0, 1) * breedte
    cy = rng.uniform(0, 1) * hoogte
    r = rng.uniform(0.012, 0.06) * max(breedte, hoogte)
    dekking = rng.uniform(0.06, 0.22)
    return (
        f'  <circle cx="{cx:.0f}" cy="{cy:.0f}" r="{r:.0f}" fill="{kleur}" '
        f'opacity="{dekking:.2f}"/>\n'
    )


def maak_svg(naam, breedte, hoogte, palet_naam, seed, donker=False):
    rng = random.Random(seed)
    palet = PALETTEN[palet_naam]
    basis = palet[4] if donker else palet[0]

    gradienten = []
    vormen = []

    # 5 grote lichtvlakken bouwen de compositie op.
    for i in range(5):
        kleur = palet[rng.randrange(1, 5)]
        g, v = blob(rng, breedte, hoogte, kleur, i)
        gradienten.append(g)
        vormen.append(v)

    # Bokeh-stippen geven diepte.
    stippen = "".join(
        bokeh_stip(rng, breedte, hoogte, palet[rng.randrange(0, 3)])
        for _ in range(rng.randint(14, 26))
    )

    # Diagonale lichtstreep, als een lens flare bij tegenlicht.
    hoek = rng.uniform(0, math.pi)
    x1, y1 = 50 - 50 * math.cos(hoek), 50 - 50 * math.sin(hoek)
    x2, y2 = 50 + 50 * math.cos(hoek), 50 + 50 * math.sin(hoek)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {breedte} {hoogte}" width="{breedte}" height="{hoogte}" role="img" preserveAspectRatio="xMidYMid slice">
  <defs>
{"".join(gradienten)}    <linearGradient id="streep" x1="{x1:.0f}%" y1="{y1:.0f}%" x2="{x2:.0f}%" y2="{y2:.0f}%">
      <stop offset="0%" stop-color="{palet[0]}" stop-opacity="0"/>
      <stop offset="45%" stop-color="{palet[1]}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="{palet[3]}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignet" cx="50%" cy="45%" r="72%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#241C13" stop-opacity="0.38"/>
    </radialGradient>
    <filter id="korrel" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="{seed}" result="ruis"/>
      <feColorMatrix type="saturate" values="0" in="ruis" result="grijs"/>
      <feComponentTransfer in="grijs" result="korrel">
        <feFuncA type="linear" slope="0.16"/>
      </feComponentTransfer>
    </filter>
    <filter id="zacht" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="{max(breedte, hoogte) * 0.035:.0f}"/>
    </filter>
  </defs>

  <rect width="{breedte}" height="{hoogte}" fill="{basis}"/>
  <g filter="url(#zacht)">
{"".join(vormen)}  </g>
  <rect width="{breedte}" height="{hoogte}" fill="url(#streep)"/>
{stippen}  <rect width="{breedte}" height="{hoogte}" fill="url(#vignet)"/>
  <rect width="{breedte}" height="{hoogte}" filter="url(#korrel)" opacity="0.55"/>
</svg>
"""

    os.makedirs(UIT, exist_ok=True)
    pad = os.path.join(UIT, naam)
    with open(pad, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"  {naam}  ({breedte}x{hoogte}, {palet_naam})")


BEELDEN = [
    # naam,                  breedte, hoogte, palet,   seed, donker
    ("hero.svg",                1920, 1200, "kaars",  11, False),
    ("hero-portret.svg",        1200, 1600, "goud",   12, False),
    ("sfeer-breed.svg",         2000,  900, "avond",  13, True),
    ("uitgelicht-1.svg",        1400, 1050, "roze",   21, False),
    ("uitgelicht-2.svg",        1400, 1750, "goud",   22, False),
    ("uitgelicht-3.svg",        1400, 1050, "salie",  23, False),
    ("doopsel-1.svg",           1200,  900, "kaars",  31, False),
    ("doopsel-2.svg",           1200, 1500, "steen",  32, False),
    ("communie-1.svg",          1200,  900, "goud",   33, False),
    ("communie-2.svg",          1200, 1500, "kaars",  34, False),
    ("verloving-1.svg",         1200,  900, "roze",   35, False),
    ("verloving-2.svg",         1200, 1500, "roze",   36, False),
    ("verjaardag-1.svg",        1200,  900, "salie",  37, False),
    ("verjaardag-2.svg",        1200, 1500, "goud",   38, False),
    ("bruiloft-1.svg",          1200,  900, "avond",  39, True),
    ("bruiloft-2.svg",          1200, 1500, "kaars",  40, False),
    ("portret-fadi.svg",         900, 1200, "avond",  51, True),
    ("portret-fady.svg",         900, 1200, "steen",  52, True),
    ("over-ons-breed.svg",      1800, 1000, "goud",   53, False),
    ("contact.svg",             1400, 1200, "kaars",  61, False),
    ("diensten-kop.svg",        2000,  800, "roze",   71, False),
    ("portfolio-kop.svg",       2000,  800, "salie",  72, False),
    ("video-poster.svg",        1920, 1080, "avond",  81, True),
]

if __name__ == "__main__":
    print("Beelden genereren in public/beelden/ ...")
    for naam, b, h, palet, seed, donker in BEELDEN:
        maak_svg(naam, b, h, palet, seed, donker)
    print(f"Klaar: {len(BEELDEN)} beelden.")
