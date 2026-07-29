# F2studio

De website van F2studio — foto & videografie door Fadi & Fady.
Tweetalig (Nederlands en Arabisch), gebouwd met Next.js.

---

## Wat je als eerste moet aanpassen

Er staan nu voorbeeldgegevens in de site. Drie bestanden, meer is het niet.

### 1. Je contactgegevens — `src/lib/site.ts`

```ts
whatsapp: "31612345678",     // <- jullie nummer, zonder + en zonder spaties
email:    "info@f2studio.nl", // <- jullie e-mailadres
instagram: "f2studio",        // <- jullie Instagram-naam, zonder @
telefoon:  "+31 6 12 34 56 78",
```

Het WhatsApp-nummer moet in internationaal formaat, zonder plusteken:
laat bij een 06-nummer de eerste 0 weg en zet er `31` voor.
`06 12 34 56 78` wordt dus `31612345678`.

### 2. Je prijzen — `src/lib/dictionaries/nl.ts`

Zoek op `pakketten`. Daar staan de drie pakketten met hun bedragen.
Vergeet niet dezelfde bedragen aan te passen in `src/lib/dictionaries/ar.ts`.

De bedragen die er nu staan (€295 / €545 / €345) zijn voorbeelden.

### 3. Je foto's — `src/lib/media.ts`

De beelden die er nu staan zijn tijdelijk: warme, onscherpe sfeervlakken
die ik heb gemaakt zodat de site meteen af oogt. Vervangen gaat zo:

1. Zet je foto in de map `public/beelden/`
2. Pas in `src/lib/media.ts` het pad aan:

```ts
hero: b(
  "/beelden/onze-eigen-foto.jpg",  // <- hier
  1920 / 1200,
  "Beschrijving van wat er op de foto staat",
  "...",
),
```

De beschrijving bij `alt` is wat blinde bezoekers horen en wat Google leest.
Pas die dus mee aan.

Bij elk beeld staat een `prompt`: een korte omschrijving van het soort foto
dat op die plek hoort. Handig als je in je archief zoekt.

---

## De Arabische versie

De hele site staat er twee keer op: `/nl/...` en `/ar/...`. De Arabische
kant leest van rechts naar links en gebruikt eigen lettertypen
(Amiri voor de koppen, Cairo voor de lopende tekst).

**Lees `src/lib/dictionaries/ar.ts` na en geef correcties door.** Ik heb de
teksten in modern standaardarabisch geschreven, maar jullie weten beter welke
woorden jullie klanten gebruiken. Vooral bij `المناولة الأولى` (eerste
communie) en `المعمودية` (doopsel) is het handig als jullie bevestigen dat dat
de termen zijn die jullie gemeenschap gebruikt.

---

## De site draaien op je eigen computer

Je hebt [Node.js](https://nodejs.org) nodig (versie 20 of hoger).

```bash
npm install     # eenmalig, haalt alles binnen wat nodig is
npm run dev     # start de site op http://localhost:3000
```

De site draait dan lokaal. Elke wijziging die je opslaat zie je meteen
in je browser.

---

## De site online zetten

De site wordt geëxporteerd naar losse bestanden, dus je hebt geen server nodig.

```bash
npm run build
```

Alles komt in de map `out/` te staan. Die map kun je uploaden naar elke
hosting. Twee gratis opties:

**Vercel** (makkelijkst) — ga naar [vercel.com](https://vercel.com), koppel
deze GitHub-repository, en Vercel bouwt en publiceert automatisch bij elke
wijziging.

**GitHub Pages** — zet in de repository-instellingen onder *Pages* de bron op
GitHub Actions. Werkt ook, maar vraagt iets meer instelwerk.

Vergeet niet je eigen domein te koppelen en `url` in `src/lib/site.ts` aan te
passen naar dat domein.

---

## Hoe de site in elkaar zit

```
src/
├── app/
│   ├── globals.css              alle kleuren, lettertypen en stijlen
│   └── [lang]/                  de pagina's, [lang] is nl of ar
│       ├── layout.tsx           het frame: navigatie, footer, lettertypen
│       ├── page.tsx             home
│       ├── portfolio/
│       ├── diensten/
│       ├── over-ons/
│       └── contact/
├── components/                  de losse bouwstenen
│   ├── Nav.tsx                  navigatiebalk met taalwisselaar
│   ├── Footer.tsx
│   ├── Logo.tsx                 het diafragma-merk en het woordmerk
│   ├── Animaties.tsx            alle scroll-animaties (GSAP)
│   ├── PortfolioGalerij.tsx     galerij met filters en vergroting
│   ├── ContactFormulier.tsx     formulier dat WhatsApp opent
│   └── ...
├── lib/
│   ├── site.ts                  >> je contactgegevens <<
│   ├── media.ts                 >> je foto's <<
│   ├── i18n.ts                  het taalsysteem
│   └── dictionaries/
│       ├── nl.ts                >> alle Nederlandse teksten <<
│       └── ar.ts                >> alle Arabische teksten <<
├── public/
│   └── beelden/                 de foto's
└── scripts/
    └── genereer-beelden.py      maakt de tijdelijke sfeerbeelden opnieuw
```

---

## Het contactformulier

Er wordt niets verstuurd of opgeslagen. Als een bezoeker op verzenden klikt,
bouwt de site een net bericht op en opent WhatsApp met die tekst al ingevuld.
De bezoeker drukt daar zelf op verzenden.

Voordeel: geen server, geen account, geen cookies, en het gesprek komt meteen
in jullie eigen WhatsApp terecht. Wil je later toch e-mail in plaats van
WhatsApp, dan is dat een kleine aanpassing in `ContactFormulier.tsx`.

---

## De showreel

Zodra jullie een showreel hebben, zet je die in `src/lib/media.ts`:

```ts
export const showreel = {
  src: "/showreel.mp4",   // je eigen bestand in de map public/
  embed: "",              // óf een YouTube/Vimeo-embedlink
  poster: beelden.videoPoster.src,
};
```

Vul er één in, niet allebei. Bij een YouTube-link gebruik je de embed-vorm:
`https://www.youtube.com/embed/JOUW_CODE`.

---

## Het ontwerp

| | |
|---|---|
| Achtergrond | `#FAF7F2` crème |
| Tekst | `#2A2622` warm zwart |
| Accent | `#8B7355` taupe |
| Donkere secties | `#1B1714` |
| Koppen | Playfair Display |
| Lopende tekst | Lato |
| Arabische koppen | Amiri |
| Arabische tekst | Cairo |

Alle kleuren en maten staan bovenin `src/app/globals.css`. Wil je de hele
site een andere kleur geven, dan pas je daar één regel aan.

De site houdt rekening met bezoekers die "verminder beweging" aan hebben
staan in hun systeeminstellingen: dan blijven alle animaties uit.
