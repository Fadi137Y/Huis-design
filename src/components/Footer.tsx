import Link from "next/link";
import { Logo } from "./Logo";
import { href, type PadSleutel, type Taal, type Woordenboek } from "@/lib/i18n";
import { instagramLink, mailLink, site, whatsappLink } from "@/lib/site";

const paginas: { sleutel: PadSleutel; label: (w: Woordenboek) => string }[] = [
  { sleutel: "home", label: (w) => w.nav.home },
  { sleutel: "portfolio", label: (w) => w.nav.portfolio },
  { sleutel: "diensten", label: (w) => w.nav.diensten },
  { sleutel: "overOns", label: (w) => w.nav.overOns },
  { sleutel: "contact", label: (w) => w.nav.contact },
];

export function Footer({ taal, w }: { taal: Taal; w: Woordenboek }) {
  const jaar = 2026;

  const kopClass =
    "mb-5 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-inkt-licht";
  const linkClass =
    "link-lijn text-[0.95rem] text-papier/70 transition-colors hover:text-papier";

  return (
    <footer className="bg-nacht text-papier">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        {/* Bovenste blok: logo en slogan */}
        <div className="reveal flex flex-col gap-8 border-b border-nacht-lijn pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo merkClassName="h-10 w-10" woordClassName="text-3xl" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-papier/60">
              {w.footer.slogan}
            </p>
          </div>

          <Link
            href={href(taal, "contact")}
            className="knop knop-licht self-start md:self-auto"
          >
            {w.nav.boek}
          </Link>
        </div>

        {/* Kolommen */}
        <div className="reveal grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-4">
          <div>
            <h2 className={kopClass}>{w.footer.navTitel}</h2>
            <ul className="flex flex-col gap-3">
              {paginas.map(({ sleutel, label }) => (
                <li key={sleutel}>
                  <Link href={href(taal, sleutel)} className={linkClass}>
                    {label(w)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={kopClass}>{w.diensten.eyebrow}</h2>
            <ul className="flex flex-col gap-3">
              {w.diensten.items.slice(0, 5).map((d) => (
                <li key={d.id}>
                  <Link
                    href={`${href(taal, "diensten")}#${d.id}`}
                    className={linkClass}
                  >
                    {d.naam}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={kopClass}>{w.footer.contactTitel}</h2>
            <ul className="flex flex-col gap-3">
              <li>
                {/* bdi + dir="ltr" houdt e-mail en telefoon in de juiste
                    volgorde staan, ook op de Arabische pagina's. */}
                <a href={mailLink} className={linkClass}>
                  <bdi dir="ltr">{site.email}</bdi>
                </a>
              </li>
              {site.telefoon && (
                <li>
                  <a
                    href={`tel:${site.telefoon.replace(/\s/g, "")}`}
                    className={linkClass}
                  >
                    <bdi dir="ltr">{site.telefoon}</bdi>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={whatsappLink(w.contact.berichtSjabloon.opening)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {w.contact.direct.whatsapp}
                </a>
              </li>
              <li className="pt-1 text-[0.95rem] text-papier/45">
                {w.contact.info.werkgebied.waarde}
              </li>
            </ul>
          </div>

          <div>
            <h2 className={kopClass}>{w.footer.volgTitel}</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram
                </a>
              </li>
            </ul>

            <h2 className={`${kopClass} mt-10`}>{w.footer.talenTitel}</h2>
            <ul className="flex gap-4">
              <li>
                <Link href="/nl/" hrefLang="nl" className={linkClass}>
                  Nederlands
                </Link>
              </li>
              <li>
                <Link href="/ar/" hrefLang="ar" className={linkClass}>
                  العربية
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Onderste regel */}
        <div className="flex flex-col gap-3 border-t border-nacht-lijn pt-8 text-[0.8rem] text-papier/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {jaar} F2studio — Fadi &amp; Fady. {w.footer.rechten}
          </p>
          <p>{w.contact.info.levering.label}: {w.contact.info.levering.waarde}</p>
        </div>
      </div>
    </footer>
  );
}
