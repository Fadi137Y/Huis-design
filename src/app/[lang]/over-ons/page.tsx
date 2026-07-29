import type { Metadata } from "next";
import Link from "next/link";
import { Band } from "@/components/Band";
import { Beeld } from "@/components/Beeld";
import { PaginaKop } from "@/components/PaginaKop";
import { Sectiekop } from "@/components/Sectiekop";
import { TekstOnthul } from "@/components/TekstOnthul";
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
  return { title: w.overOns.titel, description: w.overOns.intro };
}

export default async function OverOns({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const taal: Taal = isTaal(lang) ? lang : "nl";
  const w = getWoordenboek(taal);

  const portretten = [beelden.portretFadi, beelden.portretFady];

  return (
    <>
      <PaginaKop
        eyebrow={w.overOns.eyebrow}
        titel={w.overOns.titel}
        tekst={w.overOns.intro}
      />

      {/* Breed beeld */}
      <section className="overflow-hidden px-5 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <Beeld
            beeld={beelden.overOnsBreed}
            ratio={1800 / 1000}
            parallax={30}
            zoom={false}
          />
        </div>
      </section>

      {/* Het verhaal */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="reveal t-eyebrow flex items-center gap-3">
              <span
                className="reveal-lijn inline-block h-px w-12 bg-taupe"
                aria-hidden="true"
              />
              F2studio
            </p>
          </div>

          <div className="flex flex-col gap-7 lg:col-span-8">
            {w.overOns.tekst.map((alinea, i) => (
              <p
                key={i}
                className={`reveal ${i === 0 ? "t-sub !leading-relaxed text-inkt" : "t-lead"}`}
                data-reveal-vertraging={String(i * 0.1)}
              >
                {alinea}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* De twee */}
      <section className="bg-papier-warm px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:gap-14">
          {w.overOns.personen.map((persoon, i) => (
            <article key={i} className="flex flex-col">
              <Beeld beeld={portretten[i]} ratio={3 / 4} parallax={14} />

              <div className="mt-7">
                <TekstOnthul as="h2" tekst={persoon.naam} className="t-kop" />
                <p className="t-eyebrow mt-2">{persoon.rol}</p>
                <p className="reveal mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed text-inkt-zacht">
                  {persoon.tekst}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Band woorden={w.overOns.waarden.items.map((v) => v.titel)} />

      {/* Waarden */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Sectiekop
            eyebrow={w.overOns.waarden.eyebrow}
            titel={w.overOns.waarden.titel}
          />

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {w.overOns.waarden.items.map((item, i) => (
              <div
                key={item.titel}
                className="reveal"
                data-reveal-vertraging={String(i * 0.1)}
              >
                <div className="reveal-lijn mb-6 h-px w-full bg-lijn" />
                <span className="font-display text-sm text-taupe">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-sub mt-3">{item.titel}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-inkt-zacht">
                  {item.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Afsluiting */}
      <section className="bg-nacht px-5 py-24 text-papier sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px] text-center">
          <TekstOnthul
            as="h2"
            tekst={w.home.cta.titel}
            className="t-titel mx-auto max-w-[20ch] text-papier"
          />
          <p className="reveal t-lead mx-auto mt-6 max-w-[44ch] !text-papier/60">
            {w.home.cta.tekst}
          </p>
          <div className="reveal mt-9 flex justify-center" data-reveal-vertraging="0.15">
            <Link href={href(taal, "contact")} className="knop knop-licht">
              {w.home.cta.primair}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
