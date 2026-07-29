import { nl } from "./dictionaries/nl";
import { ar } from "./dictionaries/ar";

export const talen = ["nl", "ar"] as const;
export type Taal = (typeof talen)[number];
export const standaardTaal: Taal = "nl";

export type Woordenboek = typeof nl;

const woordenboeken: Record<Taal, Woordenboek> = { nl, ar };

export function getWoordenboek(taal: Taal): Woordenboek {
  return woordenboeken[taal] ?? nl;
}

export function isTaal(waarde: string): waarde is Taal {
  return (talen as readonly string[]).includes(waarde);
}

/** Leesrichting per taal. Arabisch leest van rechts naar links. */
export function richting(taal: Taal): "ltr" | "rtl" {
  return taal === "ar" ? "rtl" : "ltr";
}

/**
 * De URL-paden zijn in beide talen gelijk (/nl/portfolio, /ar/portfolio).
 * Dat houdt links deelbaar en voorkomt kapotte verwijzingen.
 */
export const paden = {
  home: "",
  portfolio: "portfolio",
  diensten: "diensten",
  overOns: "over-ons",
  contact: "contact",
} as const;

export type PadSleutel = keyof typeof paden;

export function href(taal: Taal, sleutel: PadSleutel): string {
  const pad = paden[sleutel];
  return pad ? `/${taal}/${pad}/` : `/${taal}/`;
}
