import type { Metadata } from "next";
import Link from "next/link";
import { PaginaKop } from "@/components/PaginaKop";
import { PortfolioGalerij } from "@/components/PortfolioGalerij";
import { TekstOnthul } from "@/components/TekstOnthul";
import { getWoordenboek, href, isTaal, talen, type Taal } from "@/lib/i18n";

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
  return { title: w.portfolio.titel, description: w.portfolio.tekst };
}

export default async function Portfolio({
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
        eyebrow={w.portfolio.eyebrow}
        titel={w.portfolio.titel}
        tekst={w.portfolio.tekst}
      />

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <PortfolioGalerij w={w} />
        </div>
      </section>

      {/* Afsluiting */}
      <section className="bg-papier-warm px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px] text-center">
          <TekstOnthul
            as="h2"
            tekst={w.portfolio.cta.titel}
            className="t-titel mx-auto max-w-[18ch]"
          />
          <p className="reveal t-lead mx-auto mt-6 max-w-[44ch]">
            {w.portfolio.cta.tekst}
          </p>
          <div className="reveal mt-9 flex justify-center" data-reveal-vertraging="0.15">
            <Link href={href(taal, "contact")} className="knop knop-vol">
              {w.portfolio.cta.knop}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
