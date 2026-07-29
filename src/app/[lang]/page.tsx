import Link from "next/link";
import { Band } from "@/components/Band";
import { Beeld } from "@/components/Beeld";
import { Sectiekop } from "@/components/Sectiekop";
import { TekstOnthul } from "@/components/TekstOnthul";
import { getWoordenboek, href, isTaal, type Taal } from "@/lib/i18n";
import { beelden, showreel } from "@/lib/media";
import { talen } from "@/lib/i18n";

export function generateStaticParams() {
  return talen.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const taal: Taal = isTaal(lang) ? lang : "nl";
  const w = getWoordenboek(taal);

  const uitgelicht = [
    { beeld: beelden.uitgelicht1, ratio: 4 / 3 },
    { beeld: beelden.uitgelicht2, ratio: 4 / 5 },
    { beeld: beelden.uitgelicht3, ratio: 4 / 3 },
  ];

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:pt-48">
        <div className="mx-auto grid max-w-[1400px] items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="reveal t-eyebrow mb-7 flex items-center gap-3">
              <span
                className="reveal-lijn inline-block h-px w-12 bg-taupe"
                aria-hidden="true"
              />
              {w.home.hero.eyebrow}
            </p>

            <h1 className="t-display">
              <TekstOnthul as="span" tekst={w.home.hero.titel} className="block" />
              <TekstOnthul
                as="span"
                tekst={w.home.hero.titelCursief}
                className="cursief block text-taupe"
                vertraging={0.18}
              />
            </h1>

            <p
              className="reveal t-lead mt-8 max-w-[52ch]"
              data-reveal-vertraging="0.35"
            >
              {w.home.hero.tekst}
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center gap-4"
              data-reveal-vertraging="0.5"
            >
              <Link href={href(taal, "contact")} className="knop knop-vol">
                {w.home.hero.primair}
              </Link>
              <Link href={href(taal, "portfolio")} className="knop knop-lijn">
                {w.home.hero.secundair}
              </Link>
            </div>
          </div>

          {/* Staand beeld naast de kop */}
          <div className="lg:col-span-5">
            <Beeld
              beeld={beelden.heroPortret}
              ratio={4 / 5}
              parallax={18}
              prioriteit
              className="w-full"
            />
          </div>
        </div>

        {/* Scroll-hint */}
        <div className="scroll-hint mt-16 hidden justify-center lg:flex" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* Doorlopende band met de gelegenheden */}
      <Band woorden={w.diensten.items.map((d) => d.naam)} />

      {/* ============================================================
          BREED SFEERBEELD
          ============================================================ */}
      <section className="relative overflow-hidden">
        <div data-vastzet>
          <Beeld
            beeld={beelden.sfeerBreed}
            ratio={2000 / 900}
            parallax={40}
            className="w-full"
            zoom={false}
          />
        </div>
      </section>

      {/* ============================================================
          INTRO — wie wij zijn
          ============================================================ */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Beeld beeld={beelden.overOnsBreed} ratio={4 / 5} parallax={22} />
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Sectiekop eyebrow={w.home.intro.eyebrow} titel={w.home.intro.titel} />

            <div className="reveal mt-8 flex flex-col gap-5" data-reveal-vertraging="0.15">
              {w.home.intro.tekst.map((alinea, i) => (
                <p key={i} className="t-lead">
                  {alinea}
                </p>
              ))}
            </div>

            <div className="reveal mt-10" data-reveal-vertraging="0.25">
              <Link href={href(taal, "overOns")} className="knop knop-lijn">
                {w.home.intro.knop}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DIENSTEN
          ============================================================ */}
      <section className="bg-papier-warm px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Sectiekop
              eyebrow={w.home.diensten.eyebrow}
              titel={w.home.diensten.titel}
              tekst={w.home.diensten.tekst}
            />
            <div className="reveal shrink-0">
              <Link href={href(taal, "diensten")} className="knop knop-lijn">
                {w.home.diensten.knop}
              </Link>
            </div>
          </div>

          <ul className="mt-16 border-t border-lijn">
            {w.diensten.items.map((dienst, i) => (
              <li key={dienst.id} className="reveal border-b border-lijn">
                <Link
                  href={`${href(taal, "diensten")}#${dienst.id}`}
                  className="group flex items-baseline gap-5 py-7 transition-colors hover:text-taupe sm:gap-10"
                >
                  <span className="w-8 shrink-0 font-display text-sm text-inkt-licht">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-kop flex-1">{dienst.naam}</span>
                  <span className="hidden max-w-sm flex-1 text-[0.95rem] text-inkt-zacht lg:block">
                    {dienst.kort}
                  </span>
                  <span
                    className="shrink-0 text-taupe transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    aria-hidden="true"
                  >
                    {taal === "ar" ? "←" : "→"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          UITGELICHT WERK
          ============================================================ */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Sectiekop
            eyebrow={w.home.uitgelicht.eyebrow}
            titel={w.home.uitgelicht.titel}
            tekst={w.home.uitgelicht.tekst}
          />

          {/* Bewust ongelijk raster: het middelste beeld zakt omlaag */}
          <div className="mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
            {uitgelicht.map((item, i) => (
              <div key={i} className={i === 1 ? "md:mt-20" : ""}>
                <Beeld beeld={item.beeld} ratio={item.ratio} parallax={14} />
                <p className="mt-4 text-[0.8rem] uppercase tracking-[0.16em] text-inkt-licht">
                  {w.home.uitgelicht.bijschriften[i]}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal mt-16 flex justify-center">
            <Link href={href(taal, "portfolio")} className="knop knop-lijn">
              {w.home.uitgelicht.knop}
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SHOWREEL — donkere sectie
          ============================================================ */}
      <section className="bg-nacht px-5 py-24 text-papier sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="flex flex-col justify-center lg:col-span-4">
              <Sectiekop
                eyebrow={w.home.video.eyebrow}
                titel={w.home.video.titel}
                tekst={w.home.video.tekst}
                licht
              />
            </div>

            <div className="lg:col-span-8">
              <div className="reveal-beeld relative overflow-hidden">
                {showreel.embed ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={showreel.embed}
                      title={w.home.video.titel}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  </div>
                ) : showreel.src ? (
                  <video
                    className="aspect-video w-full object-cover"
                    poster={showreel.poster}
                    controls
                    playsInline
                    preload="none"
                  >
                    <source src={showreel.src} type="video/mp4" />
                  </video>
                ) : (
                  <div className="relative aspect-video w-full">
                    <img
                      src={beelden.videoPoster.src}
                      alt={beelden.videoPoster.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-nacht/45 text-center">
                      <span
                        className="flex h-20 w-20 items-center justify-center rounded-full border border-papier/40 text-papier transition-colors hover:border-papier"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-px fill-current rtl:-scale-x-100">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <p className="max-w-xs px-6 text-sm text-papier/70">
                        {w.home.video.binnenkort}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WERKWIJZE
          ============================================================ */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Sectiekop
            eyebrow={w.home.werkwijze.eyebrow}
            titel={w.home.werkwijze.titel}
          />

          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {w.home.werkwijze.stappen.map((stap, i) => (
              <li
                key={stap.nummer}
                className="reveal"
                data-reveal-vertraging={String(i * 0.1)}
              >
                <div className="reveal-lijn mb-6 h-px w-full bg-lijn" />
                <span className="font-display text-sm text-taupe">{stap.nummer}</span>
                <h3 className="t-sub mt-3">{stap.titel}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-inkt-zacht">
                  {stap.tekst}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================
          REVIEWS
          ============================================================ */}
      <section className="bg-papier-warm px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Sectiekop
            eyebrow={w.home.reviews.eyebrow}
            titel={w.home.reviews.titel}
          />

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {w.home.reviews.items.map((review, i) => (
              <figure
                key={i}
                className="reveal flex flex-col"
                data-reveal-vertraging={String(i * 0.12)}
              >
                <span
                  className="font-display text-5xl leading-none text-taupe/40"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="t-sub mt-2 flex-1 text-inkt">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-lijn pt-4">
                  <span className="block text-[0.95rem] font-bold">{review.naam}</span>
                  <span className="block text-[0.8rem] uppercase tracking-[0.16em] text-inkt-licht">
                    {review.soort}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          AFSLUITENDE OPROEP
          ============================================================ */}
      <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
        <div className="absolute inset-0 -z-10">
          <img
            src={beelden.contact.src}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-35"
            loading="lazy"
          />
        </div>

        <div className="mx-auto max-w-[1400px] text-center">
          <p className="reveal t-eyebrow mb-5">{w.home.cta.eyebrow}</p>
          <TekstOnthul as="h2" tekst={w.home.cta.titel} className="t-display" />
          <p className="reveal t-lead mx-auto mt-7 max-w-[46ch]" data-reveal-vertraging="0.2">
            {w.home.cta.tekst}
          </p>
          <div
            className="reveal mt-10 flex flex-wrap justify-center gap-4"
            data-reveal-vertraging="0.3"
          >
            <Link href={href(taal, "contact")} className="knop knop-vol">
              {w.home.cta.primair}
            </Link>
            <Link href={href(taal, "diensten")} className="knop knop-lijn">
              {w.home.cta.secundair}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
