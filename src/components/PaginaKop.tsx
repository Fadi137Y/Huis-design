import { TekstOnthul } from "./TekstOnthul";

/** De kop bovenaan een binnenpagina: bovenschrift, grote titel, inleiding. */
export function PaginaKop({
  eyebrow,
  titel,
  tekst,
}: {
  eyebrow: string;
  titel: string;
  tekst?: string;
}) {
  return (
    <header className="px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <p className="reveal t-eyebrow mb-6 flex items-center gap-3">
          <span
            className="reveal-lijn inline-block h-px w-12 bg-taupe"
            aria-hidden="true"
          />
          {eyebrow}
        </p>

        <TekstOnthul as="h1" tekst={titel} className="t-display max-w-[16ch]" />

        {tekst && (
          <p
            className="reveal t-lead mt-8 max-w-[54ch]"
            data-reveal-vertraging="0.25"
          >
            {tekst}
          </p>
        )}
      </div>
    </header>
  );
}
