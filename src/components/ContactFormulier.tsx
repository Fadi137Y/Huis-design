"use client";

import { useState } from "react";
import type { Woordenboek } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

/**
 * Het aanvraagformulier. Er wordt niets verstuurd of opgeslagen:
 * bij verzenden bouwt de pagina een net bericht op en opent WhatsApp
 * met die tekst al ingevuld. De bezoeker drukt daar zelf op verzenden.
 *
 * Voordeel: geen server, geen account, geen cookies, en het gesprek
 * staat meteen in jullie eigen WhatsApp.
 */
export function ContactFormulier({ w }: { w: Woordenboek }) {
  const f = w.contact.formulier;
  const s = w.contact.berichtSjabloon;

  const [velden, setVelden] = useState({
    naam: "",
    soort: f.soortOpties[0],
    datum: "",
    plaats: "",
    pakket: f.pakketOpties[0],
    bericht: "",
  });
  const [fout, setFout] = useState(false);

  const wijzig =
    (sleutel: keyof typeof velden) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setVelden((v) => ({ ...v, [sleutel]: e.target.value }));
      if (fout) setFout(false);
    };

  const verzend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!velden.naam.trim()) {
      setFout(true);
      return;
    }

    const regels = [
      s.opening,
      "",
      `${s.naam}: ${velden.naam.trim()}`,
      `${s.soort}: ${velden.soort}`,
      velden.datum ? `${s.datum}: ${velden.datum}` : null,
      velden.plaats.trim() ? `${s.plaats}: ${velden.plaats.trim()}` : null,
      `${s.pakket}: ${velden.pakket}`,
      velden.bericht.trim() ? `\n${s.bericht}: ${velden.bericht.trim()}` : null,
    ].filter(Boolean);

    window.open(whatsappLink(regels.join("\n")), "_blank", "noopener");
  };

  return (
    <form onSubmit={verzend} className="flex flex-col gap-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className="veld-label" htmlFor="naam">
            {f.naam}
          </label>
          <input
            id="naam"
            name="naam"
            type="text"
            className="veld"
            placeholder={f.naamPlaceholder}
            value={velden.naam}
            onChange={wijzig("naam")}
            aria-invalid={fout}
            aria-describedby={fout ? "naam-fout" : undefined}
            autoComplete="name"
          />
          {fout && (
            <p id="naam-fout" role="alert" className="mt-2 text-sm text-taupe">
              {f.verplicht}
            </p>
          )}
        </div>

        <div>
          <label className="veld-label" htmlFor="soort">
            {f.soort}
          </label>
          <select
            id="soort"
            name="soort"
            className="veld"
            value={velden.soort}
            onChange={wijzig("soort")}
          >
            {f.soortOpties.map((optie) => (
              <option key={optie} value={optie}>
                {optie}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="veld-label" htmlFor="datum">
            {f.datum}
          </label>
          <input
            id="datum"
            name="datum"
            type="date"
            className="veld"
            value={velden.datum}
            onChange={wijzig("datum")}
          />
          <p className="mt-2 text-[0.8rem] text-inkt-licht">{f.datumHint}</p>
        </div>

        <div>
          <label className="veld-label" htmlFor="plaats">
            {f.plaats}
          </label>
          <input
            id="plaats"
            name="plaats"
            type="text"
            className="veld"
            placeholder={f.plaatsPlaceholder}
            value={velden.plaats}
            onChange={wijzig("plaats")}
            autoComplete="address-level2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="veld-label" htmlFor="pakket">
            {f.pakket}
          </label>
          <select
            id="pakket"
            name="pakket"
            className="veld"
            value={velden.pakket}
            onChange={wijzig("pakket")}
          >
            {f.pakketOpties.map((optie) => (
              <option key={optie} value={optie}>
                {optie}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="veld-label" htmlFor="bericht">
            {f.bericht}
          </label>
          <textarea
            id="bericht"
            name="bericht"
            rows={4}
            className="veld resize-y"
            placeholder={f.berichtPlaceholder}
            value={velden.bericht}
            onChange={wijzig("bericht")}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="knop knop-vol">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.65 4.2 3.71.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
          </svg>
          {f.verstuur}
        </button>
        <p className="max-w-xs text-[0.8rem] leading-relaxed text-inkt-licht">
          {f.verstuurUitleg}
        </p>
      </div>
    </form>
  );
}
