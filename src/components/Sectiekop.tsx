import { TekstOnthul } from "./TekstOnthul";

/**
 * De vaste kop boven elke sectie: klein bovenschrift, grote titel,
 * en optioneel een korte inleiding. Houdt het ritme door de site gelijk.
 */
export function Sectiekop({
  eyebrow,
  titel,
  tekst,
  className = "",
  licht = false,
  gecentreerd = false,
  niveau = "h2",
}: {
  eyebrow?: string;
  titel: string;
  tekst?: string;
  className?: string;
  /** Voor donkere secties. */
  licht?: boolean;
  gecentreerd?: boolean;
  niveau?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={`${gecentreerd ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <p className="reveal t-eyebrow mb-5 flex items-center gap-3">
          {!gecentreerd && (
            <span
              className="reveal-lijn inline-block h-px w-10 bg-taupe"
              aria-hidden="true"
            />
          )}
          {eyebrow}
        </p>
      )}

      <TekstOnthul
        as={niveau}
        tekst={titel}
        className={`t-titel ${licht ? "text-papier" : "text-inkt"}`}
      />

      {tekst && (
        <p
          className={`reveal t-lead mt-6 ${gecentreerd ? "mx-auto" : ""} max-w-[58ch] ${
            licht ? "!text-papier/65" : ""
          }`}
          data-reveal-vertraging="0.15"
        >
          {tekst}
        </p>
      )}
    </div>
  );
}
