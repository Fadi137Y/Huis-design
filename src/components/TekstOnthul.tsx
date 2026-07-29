import { Fragment } from "react";

/**
 * Splitst een kop in losse woorden, elk in een "venster" met verborgen
 * overloop. GSAP schuift de woorden er daarna één voor één in.
 *
 * De tekst blijft één doorlopende zin voor schermlezers en voor Google —
 * de opsplitsing zit alleen in de opmaak.
 */
export function TekstOnthul({
  tekst,
  className = "",
  as: Tag = "span",
  vertraging = 0,
}: {
  tekst: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  vertraging?: number;
}) {
  const woorden = tekst.split(" ").filter(Boolean);

  return (
    <Tag className={`onthul ${className}`} data-onthul-vertraging={vertraging}>
      {woorden.map((woord, i) => (
        <Fragment key={`${woord}-${i}`}>
          {/* De extra ruimte onderaan geeft staarten van letters als j, g en
              y de plek die ze nodig hebben; de negatieve marge haalt die
              ruimte weer weg zodat de regelafstand niet verandert. */}
          <span className="inline-block overflow-hidden align-bottom pb-[0.22em] -mb-[0.22em]">
            <span className="inline-block will-change-transform">{woord}</span>
          </span>
          {i < woorden.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
