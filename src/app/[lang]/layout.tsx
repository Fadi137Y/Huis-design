import type { Metadata } from "next";
import { Amiri, Cairo, Lato, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { Animaties } from "@/components/Animaties";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  getWoordenboek,
  isTaal,
  richting,
  talen,
  type Taal,
} from "@/lib/i18n";
import { site } from "@/lib/site";

/* ---------- Lettertypen ---------- */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600"],
  variable: "--font-cairo",
  display: "swap",
});

/* ---------- Statische routes ---------- */

export function generateStaticParams() {
  return talen.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const taal: Taal = isTaal(lang) ? lang : "nl";
  const w = getWoordenboek(taal);

  return {
    metadataBase: new URL(site.url),
    title: { default: w.meta.titel, template: `%s — F2studio` },
    description: w.meta.beschrijving,
    alternates: {
      canonical: `/${taal}/`,
      languages: { nl: "/nl/", ar: "/ar/" },
    },
    openGraph: {
      title: w.meta.titel,
      description: w.meta.beschrijving,
      locale: taal === "ar" ? "ar_NL" : "nl_NL",
      type: "website",
      siteName: "F2studio",
    },
    icons: {
      icon: [{ url: "/merk.svg", type: "image/svg+xml" }],
    },
  };
}

/* ---------- Layout ---------- */

export default async function TaalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isTaal(lang)) notFound();

  const taal: Taal = lang;
  const w = getWoordenboek(taal);
  const dir = richting(taal);

  return (
    <html
      lang={taal}
      dir={dir}
      className={`${playfair.variable} ${lato.variable} ${amiri.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Zet de js-vlag vóór de eerste weergave, zodat elementen niet
            eerst zichtbaar zijn en daarna alsnog wegspringen. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="korrel">
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-inkt focus:px-5 focus:py-3 focus:text-sm focus:text-papier"
        >
          {taal === "ar" ? "انتقل إلى المحتوى" : "Naar de inhoud"}
        </a>

        <Nav taal={taal} w={w} />

        <main id="inhoud">{children}</main>

        <Footer taal={taal} w={w} />

        <Animaties />
      </body>
    </html>
  );
}
