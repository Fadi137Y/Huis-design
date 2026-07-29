/**
 * ============================================================
 *  F2STUDIO — INSTELLINGEN
 * ============================================================
 *  Dit is het enige bestand dat je hoeft aan te passen om je
 *  contactgegevens en prijzen te wijzigen. Alles op de site
 *  leest hieruit.
 * ============================================================
 */

export const site = {
  naam: "F2studio",

  /**
   * WhatsApp-nummer in internationaal formaat, zonder + en zonder spaties.
   * Nederlands 06-nummer: laat de 0 weg en zet er 31 voor.
   *    06 12 34 56 78  ->  31612345678
   *
   * >>> VERVANG DIT DOOR JULLIE ECHTE NUMMER <<<
   */
  whatsapp: "31638647085",

  /** >>> VERVANG DIT DOOR JULLIE ECHTE E-MAILADRES <<< */
  email: "info@f2studio.nl",

  /** >>> VERVANG DIT DOOR JULLIE INSTAGRAM-NAAM (zonder @) <<< */
  instagram: "f2studio",

  /** Optioneel: laat leeg ("") om de telefoonknop te verbergen. */
  telefoon: "+31 6 12 34 56 78",

  /** Domein van de site. Wordt gebruikt voor SEO en deelbare links. */
  url: "https://f2studio.nl",
} as const;

/** Bouwt een WhatsApp-link met een kant-en-klaar bericht. */
export function whatsappLink(bericht: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(bericht)}`;
}

export const instagramLink = `https://instagram.com/${site.instagram}`;
export const mailLink = `mailto:${site.email}`;
