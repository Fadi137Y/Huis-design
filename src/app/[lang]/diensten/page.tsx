import type { Metadata } from "next";
import Link from "next/link";
import { Accordeon } from "@/components/Accordeon";
import { Beeld } from "@/components/Beeld";
import { PaginaKop } from "@/components/PaginaKop";
import { Sectiekop } from "@/components/Sectiekop";
import { getWoordenboek, href, isTaal, talen, type Taal } from "@/lib/i18n";
import { beelden } from "@/lib/media";

export function generateStaticParams() {
  return talen.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const w = getWoordenboek(isTaal(lang) ? lang : "nl");
  return { title: w.diensten.titel, description: w.diensten.tekst };
}

/** Bij elke dienst hoort een beeld. */
const dienstBeelden = [
  beelden.doopsel2,
  beelden.communie2,
  beelden.verloving2,
  beelden.bruiloft2,
  beelden.verjaardag2,
  beelden.uitgelicht2,
];

export default async function Diensten({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const taal: Taal = isTaal(lang) ? lang : "nl";
  const w = getWoordenboek(taal);

  return (
    <>
      <PaginaKop
        eyebrow={w.diensten.eyebrow}
        titel={w.diensten.titel}
        tekst={w.diensten.tekst}
      />

      {/* ============================================================
          DE DIENSTEN — om en om links/rechts
          ============================================================ */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-24 sm:gap-32">
          {w.diensten.items.map((dienst, i) => {
            const beeldLinks = i % 2 === 0;

            return (
              <article
                key={dienst.id}
                id={dienst.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <div
                  className={`lg:col-span-5 ${
                    beeldLinks ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Beeld
                    beeld={dienstBeelden[i] ?? beelden.uitgelicht1}
                    ratio={4 / 5}
                    parallax={18}
                  />
                </div>

                <div
                  className={`lg:col-span-7 ${
                    beeldLinks ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <p className="reveal t-eyebrow mb-4">
                    {String(i + 1).padStart(2, "0")} — {dienst.kort}
                  </p>

                  <Sectiekop titel={dienst.naam} niveau="h2" />

                  <p className="reveal t-lead mt-6" data-reveal-vertraging="0.15">
                    {dienst.tekst}
                  </p>

                  <ul className="reveal mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2" data-reveal-vertraging="0.2">
                    {dienst.punten.map((punt) => (
                      <li
                        key={punt}
                        className="flex items-start gap-3 border-t border-lijn pt-3 text-[0.95rem] text-inkt-zacht"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-taupe" aria-hidden="true" />
                        {punt}
                      </li>
                    ))}
                  </ul>

                  <div className="reveal mt-9" data-reveal-vertraging="0.25">
                    <Link href={href(taal, "contact")} className="knop knop-lijn">
                      {w.nav.boek}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          PAKKETTEN
          ============================================================ */}
      <section
        id="pakketten"
        className="mt-24 scroll-mt-24 bg-nacht px-5 py-24 text-papier sm:mt-32 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <Sectiekop
            eyebrow={w.diensten.pakketten.eyebrow}
            titel={w.diensten.pakketten.titel}
            tekst={w.diensten.pakketten.tekst}
            licht
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {w.diensten.pakketten.items.map((pakket, i) => (
              <div
                key={pakket.naam}
                className={`reveal flex flex-col border p-8 sm:p-10 ${
                  pakket.uitgelicht
                    ? "border-taupe bg-nacht-zacht"
                    : "border-nacht-lijn"
                }`}
                data-reveal-vertraging={String(i * 0.12)}
              >
                {pakket.uitgelicht && (
                  <span className="mb-6 self-start rounded-full border border-taupe px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-taupe-licht">
                    {w.ui.meest}
                  </span>
                )}

                <h3 className="t-kop">{pakket.naam}</h3>
                <p className="mt-2 text-[0.95rem] text-papier/55">
                  {pakket.samenvatting}
                </p>

                <p className="mt-7 flex items-baseline gap-2">
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] text-papier/45">
                    {pakket.eenheid}
                  </span>
                  <span className="font-display text-5xl text-papier">
                    €{pakket.prijs}
                  </span>
                </p>

                <ul className="mt-8 flex flex-1 flex-col gap-3 border-t border-nacht-lijn pt-6">
                  {pakket.punten.map((punt) => (
                    <li
                      key={punt}
                      className="flex items-start gap-3 text-[0.95rem] text-papier/70"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-taupe"
                        aria-hidden="true"
                      />
                      {punt}
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <Link
                    href={href(taal, "contact")}
                    className={`knop w-full ${
                      pakket.uitgelicht ? "knop-vol !bg-papier !text-nacht" : "knop-licht"
                    }`}
                  >
                    {pakket.knop}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="reveal mt-10 max-w-[64ch] text-[0.9rem] leading-relaxed text-papier/45">
            {w.diensten.pakketten.voetnoot}
          </p>
        </div>
      </section>

      {/* ============================================================
          VEELGESTELDE VRAGEN
          ============================================================ */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Sectiekop
              eyebrow={w.diensten.veelgevraagd.eyebrow}
              titel={w.diensten.veelgevraagd.titel}
            />
          </div>

          <div className="lg:col-span-8">
            <Accordeon items={w.diensten.veelgevraagd.items} />
          </div>
        </div>
      </section>
    </>
  );
}
