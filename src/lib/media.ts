/**
 * ============================================================
 *  F2STUDIO — BEELDEN
 * ============================================================
 *  Elke foto op de site staat hieronder. Wil je een beeld
 *  vervangen door eigen werk?
 *
 *    1. Zet je foto in de map  public/beelden/
 *    2. Pas hieronder alleen het pad aan, bijvoorbeeld:
 *         hero: { src: "/beelden/onze-hero-foto.jpg", ... }
 *
 *  De teksten bij "alt" beschrijven wat er op de foto staat.
 *  Die zijn belangrijk voor Google en voor blinde bezoekers,
 *  dus pas ze mee aan als je de foto verwisselt.
 *
 *  Het veld "prompt" is de beschrijving van het beeld dat hier
 *  hoort. Handig als je zoekt naar de juiste foto in je archief.
 * ============================================================
 */

import { bestand } from "./pad";

export type Beeld = {
  src: string;
  alt: string;
  prompt: string;
  /** Verhouding breedte/hoogte, gebruikt om ruimte te reserveren. */
  ratio: number;
};

// bestand() zorgt dat de paden ook kloppen als de site in een submap
// staat, zoals op GitHub Pages.
const b = (
  src: string,
  ratio: number,
  alt: string,
  prompt: string,
): Beeld => ({ src: bestand(src), ratio, alt, prompt });

export const beelden = {
  hero: b(
    "/beelden/foto.png,
    1920 / 1200,
    "Een familie tijdens een feest, gefotografeerd in warm avondlicht",
    "Familie tijdens een feest in gouden avondlicht, ongeposeerd, warme tonen",
  ),
  heroPortret: b(
    ''/beelden/foto.png'',
    1200 / 1600,
    "Portret van een bruidspaar tijdens het gouden uur",
    "Verticaal portret van een paar tijdens het gouden uur, zachte achtergrond",
  ),
  sfeerBreed: b(
    "/beelden/sfeer-breed.svg",
    2000 / 900,
    "Kaarslicht in een kerk tijdens een ceremonie",
    "Kaarslicht in een kerk, donker, sfeervol, breed beeld",
  ),

  uitgelicht1: b(
    "/beelden/uitgelicht-1.svg",
    1400 / 1050,
    "Handen van een bruidspaar met ringen",
    "Detail van handen met verlovingsringen, zacht licht",
  ),
  uitgelicht2: b(
    "/beelden/uitgelicht-2.svg",
    1400 / 1750,
    "Kind in doopjurk in de armen van een ouder",
    "Baby in witte doopjurk, tegenlicht bij een raam",
  ),
  uitgelicht3: b(
    "/beelden/uitgelicht-3.svg",
    1400 / 1050,
    "Gedekte feesttafel met bloemen en kaarsen",
    "Gedekte feesttafel met bloemen en kaarsen, warme tonen",
  ),

  doopsel1: b("/beelden/doopsel-1.svg", 4 / 3, "Doopvont met water en kaarslicht", "Doopvont, water, kaarslicht"),
  doopsel2: b("/beelden/doopsel-2.svg", 4 / 5, "Ouders met hun kind bij het doopsel", "Ouders houden hun baby vast bij het doopsel"),
  communie1: b("/beelden/communie-1.svg", 4 / 3, "Kind in communiekleding voor het altaar", "Kind in witte communiekleding, kerkinterieur"),
  communie2: b("/beelden/communie-2.svg", 4 / 5, "Familie samen na de communieviering", "Familieportret na de communie, buiten"),
  verloving1: b("/beelden/verloving-1.svg", 4 / 3, "Paar dat elkaar aankijkt tijdens de verloving", "Verloofd paar, lachend, ongeposeerd"),
  verloving2: b("/beelden/verloving-2.svg", 4 / 5, "Detail van een verlovingsring", "Close-up verlovingsring in de hand"),
  verjaardag1: b("/beelden/verjaardag-1.svg", 4 / 3, "Taart met kaarsjes op een verjaardagsfeest", "Verjaardagstaart met kaarsjes, feestlicht"),
  verjaardag2: b("/beelden/verjaardag-2.svg", 4 / 5, "Gasten die dansen op een feest", "Dansende gasten op een feest, beweging in het beeld"),
  bruiloft1: b("/beelden/bruiloft-1.svg", 4 / 3, "Bruidspaar tijdens de eerste dans", "Eerste dans van het bruidspaar, avond"),
  bruiloft2: b("/beelden/bruiloft-2.svg", 4 / 5, "Bruidsboeket in de hand van de bruid", "Bruidsboeket, zacht daglicht"),

  portretFadi: b("/beelden/portret-fadi.svg", 3 / 4, "Portret van Fadi", "Portret van Fadi met camera, natuurlijk licht"),
  portretFady: b("/beelden/portret-fady.svg", 3 / 4, "Portret van Fady", "Portret van Fady met videocamera, natuurlijk licht"),
  overOnsBreed: b("/beelden/over-ons-breed.svg", 1800 / 1000, "Fadi en Fady aan het werk tijdens een shoot", "Twee fotografen aan het werk tijdens een feest"),

  contact: b("/beelden/contact.svg", 1400 / 1200, "Sfeerbeeld van een feest in warm licht", "Warm sfeerbeeld van een feest, onscherpe achtergrond"),
  dienstenKop: b("/beelden/diensten-kop.svg", 2000 / 800, "Sfeerbeeld bij de diensten", "Breed sfeerbeeld, zachte kleuren"),
  portfolioKop: b("/beelden/portfolio-kop.svg", 2000 / 800, "Sfeerbeeld bij het portfolio", "Breed sfeerbeeld, zachte kleuren"),
  videoPoster: b("/beelden/video-poster.svg", 16 / 9, "Stilstaand beeld uit een aftermovie", "Filmisch stilstaand beeld uit een aftermovie"),
} as const;

/** De categorieën waarop het portfolio te filteren is. */
export type Categorie =
  | "doopsel"
  | "communie"
  | "verloving"
  | "bruiloft"
  | "verjaardag";

export type PortfolioItem = {
  beeld: Beeld;
  categorie: Categorie;
  /** Verhouding in het raster. Staand (4/5) en liggend (4/3) wisselen elkaar af. */
  ratio: number;
};

/**
 * Het portfolio. Voeg hier een regel toe voor elke nieuwe foto.
 * De volgorde bepaalt de volgorde op de pagina.
 */
export const portfolio: PortfolioItem[] = [
  { beeld: beelden.verloving1, categorie: "verloving", ratio: 4 / 3 },
  { beeld: beelden.doopsel2, categorie: "doopsel", ratio: 4 / 5 },
  { beeld: beelden.communie1, categorie: "communie", ratio: 4 / 3 },
  { beeld: beelden.bruiloft2, categorie: "bruiloft", ratio: 4 / 5 },
  { beeld: beelden.verjaardag1, categorie: "verjaardag", ratio: 4 / 3 },
  { beeld: beelden.verloving2, categorie: "verloving", ratio: 4 / 5 },
  { beeld: beelden.doopsel1, categorie: "doopsel", ratio: 4 / 3 },
  { beeld: beelden.communie2, categorie: "communie", ratio: 4 / 5 },
  { beeld: beelden.bruiloft1, categorie: "bruiloft", ratio: 4 / 3 },
  { beeld: beelden.verjaardag2, categorie: "verjaardag", ratio: 4 / 5 },
  { beeld: beelden.uitgelicht1, categorie: "verloving", ratio: 4 / 3 },
  { beeld: beelden.uitgelicht2, categorie: "doopsel", ratio: 4 / 5 },
];

/**
 * De showreel-video. Zet je eigen bestand in public/ en pas het
 * pad aan, of vul een YouTube- of Vimeo-link in bij "embed".
 * Laat "src" leeg ("") als je alleen een posterbeeld wilt tonen.
 */
export const showreel = {
  src: "",
  embed: "",
  poster: beelden.videoPoster.src,
};
