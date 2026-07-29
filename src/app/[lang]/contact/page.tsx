import type { Metadata } from "next";
import { ContactFormulier } from "@/components/ContactFormulier";
import { PaginaKop } from "@/components/PaginaKop";
import { getWoordenboek, isTaal, talen } from "@/lib/i18n";
import { beelden } from "@/lib/media";
import { instagramLink, mailLink, site, whatsappLink } from "@/lib/site";

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
  return { title: w.contact.titel, description: w.contact.tekst };
}

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const taal = isTaal(lang) ? lang : "nl";
  const w = getWoordenboek(taal);

  // In het Arabisch wijst de pijl mee met de leesrichting.
  const pijl = taal === "ar" ? "←" : "→";

  const infoRijen = [
    w.contact.info.werkgebied,
    w.contact.info.reactie,
    w.contact.info.levering,
    w.contact.info.talen,
  ];

  const directLinks = [
    {
      label: w.contact.direct.whatsapp,
      waarde: site.telefoon || w.contact.direct.whatsapp,
      href: whatsappLink(w.contact.berichtSjabloon.opening),
      extern: true,
    },
    { label: w.contact.direct.email, waarde: site.email, href: mailLink, extern: false },
    {
      label: w.contact.direct.instagram,
      waarde: `@${site.instagram}`,
      href: instagramLink,
      extern: true,
    },
  ];

  return (
    <>
      <PaginaKop
        eyebrow={w.contact.eyebrow}
        titel={w.contact.titel}
        tekst={w.contact.tekst}
      />

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Formulier */}
          <div className="reveal lg:col-span-7">
            <ContactFormulier w={w} />
          </div>

          {/* Zijkolom */}
          <aside className="flex flex-col gap-12 lg:col-span-5">
            <div className="reveal">
              <h2 className="t-eyebrow mb-6">{w.contact.direct.titel}</h2>

              <ul className="border-t border-lijn">
                {directLinks.map((item) => (
                  <li key={item.label} className="border-b border-lijn">
                    <a
                      href={item.href}
                      target={item.extern ? "_blank" : undefined}
                      rel={item.extern ? "noopener noreferrer" : undefined}
                      className="group flex items-baseline justify-between gap-5 py-5 transition-colors hover:text-taupe"
                    >
                      <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-inkt-licht">
                        {item.label}
                      </span>
                      <span className="flex items-baseline gap-3 text-[1.02rem]">
                        {/* E-mail, telefoon en @-naam blijven altijd van
                            links naar rechts staan. */}
                        <bdi dir="ltr">{item.waarde}</bdi>
                        <span
                          className="text-taupe transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                          aria-hidden="true"
                        >
                          {pijl}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" data-reveal-vertraging="0.1">
              <dl className="border-t border-lijn">
                {infoRijen.map((rij) => (
                  <div
                    key={rij.label}
                    className="flex items-baseline justify-between gap-5 border-b border-lijn py-4"
                  >
                    <dt className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-inkt-licht">
                      {rij.label}
                    </dt>
                    <dd className="text-end text-[0.95rem] text-inkt-zacht">
                      {rij.waarde}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal-beeld" data-reveal-vertraging="0.15">
              <img
                src={beelden.contact.src}
                alt={beelden.contact.alt}
                className="w-full object-cover"
                style={{ aspectRatio: "4 / 3" }}
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
