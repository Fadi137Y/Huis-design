/**
 * Waar de site staat.
 *
 * Op een eigen domein (f2studio.nl) staat de site in de hoofdmap en is
 * dit leeg. Op GitHub Pages staat hij in een submap
 * (fadi137y.github.io/Huis-design), en dan moet dat stuk voor elk pad.
 *
 * De waarde komt uit NEXT_PUBLIC_BASE_PATH en wordt bij het bouwen
 * ingevuld. Je hoeft hier zelf niets aan te doen.
 */
const ruw = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Bijvoorbeeld "/Huis-design", of "" bij een eigen domein. */
export const basisPad = ruw.replace(/\/+$/, "");

/** Zet het basispad voor een bestand uit de map public/. */
export function bestand(pad: string): string {
  return `${basisPad}${pad.startsWith("/") ? pad : `/${pad}`}`;
}
