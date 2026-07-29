"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { href, talen, type PadSleutel, type Taal, type Woordenboek } from "@/lib/i18n";
import { nl } from "@/lib/dictionaries/nl";
import { ar } from "@/lib/dictionaries/ar";

const links: { sleutel: PadSleutel; label: (w: Woordenboek) => string }[] = [
  { sleutel: "portfolio", label: (w) => w.nav.portfolio },
  { sleutel: "diensten", label: (w) => w.nav.diensten },
  { sleutel: "overOns", label: (w) => w.nav.overOns },
  { sleutel: "contact", label: (w) => w.nav.contact },
];

const taalNamen: Record<Taal, string> = { nl: nl.taalKort, ar: ar.taalKort };

export function Nav({ taal, w }: { taal: Taal; w: Woordenboek }) {
  const pathname = usePathname();
  const [gescrold, setGescrold] = useState(false);
  const [verborgen, setVerborgen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Balk verbergen bij naar beneden scrollen, terugbrengen bij omhoog.
  useEffect(() => {
    let vorige = window.scrollY;

    const opScroll = () => {
      const nu = window.scrollY;
      setGescrold(nu > 24);
      setVerborgen(nu > 260 && nu > vorige);
      vorige = nu;
    };

    window.addEventListener("scroll", opScroll, { passive: true });
    opScroll();
    return () => window.removeEventListener("scroll", opScroll);
  }, []);

  // Menu sluit zodra je naar een andere pagina gaat.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Achtergrond niet mee laten scrollen als het menu openstaat.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const opToets = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, []);

  /** Zelfde pagina, andere taal. */
  const anderetaalHref = (doel: Taal) => {
    const rest = pathname.replace(/^\/(nl|ar)/, "").replace(/^\/|\/$/g, "");
    return rest ? `/${doel}/${rest}/` : `/${doel}/`;
  };

  const actief = (sleutel: PadSleutel) =>
    pathname.replace(/\/$/, "") === href(taal, sleutel).replace(/\/$/, "");

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,padding] duration-500",
          "border-b",
          verborgen && !menuOpen ? "-translate-y-full" : "translate-y-0",
          gescrold && !menuOpen
            ? "border-lijn bg-papier/85 py-3 backdrop-blur-md"
            : "border-transparent bg-transparent py-5",
        ].join(" ")}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      >
        <nav
          className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8"
          aria-label={w.nav.menu}
        >
          <Link
            href={href(taal, "home")}
            className="shrink-0 transition-opacity hover:opacity-70"
          >
            <Logo
              merkClassName="h-7 w-7 sm:h-8 sm:w-8"
              woordClassName="text-lg sm:text-xl"
            />
            <span className="sr-only">F2studio</span>
          </Link>

          {/* Links — vanaf tablet zichtbaar */}
          <ul className="hidden items-center gap-9 lg:flex">
            {links.map(({ sleutel, label }) => (
              <li key={sleutel}>
                <Link
                  href={href(taal, sleutel)}
                  className={`link-lijn text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                    actief(sleutel) ? "text-taupe" : "text-inkt hover:text-taupe"
                  }`}
                  style={taal === "ar" ? { letterSpacing: 0, fontSize: "0.875rem" } : undefined}
                >
                  {label(w)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Taalwisselaar */}
            <div className="hidden items-center gap-1.5 sm:flex">
              {talen.map((t, i) => (
                <span key={t} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-inkt-licht">·</span>}
                  <Link
                    href={anderetaalHref(t)}
                    hrefLang={t}
                    aria-current={t === taal ? "true" : undefined}
                    className={`text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                      t === taal
                        ? "text-inkt"
                        : "text-inkt-licht hover:text-taupe"
                    }`}
                  >
                    {taalNamen[t]}
                  </Link>
                </span>
              ))}
            </div>

            <Link
              href={href(taal, "contact")}
              className="knop knop-vol hidden !px-6 !py-3 md:inline-flex"
            >
              {w.nav.boek}
            </Link>

            {/* Menuknop — alleen op smallere schermen */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="hoofdmenu"
              className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{menuOpen ? w.nav.sluiten : w.nav.menu}</span>
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-full bg-inkt transition-all duration-400 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-inkt transition-all duration-400 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Schermvullend menu */}
      <div
        id="hoofdmenu"
        className={`fixed inset-0 z-40 bg-papier transition-[opacity,visibility] duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-5 pb-10 pt-28 sm:px-8">
          <ul className="flex flex-col gap-1">
            {[{ sleutel: "home" as PadSleutel, label: () => w.nav.home }, ...links].map(
              ({ sleutel, label }, i) => (
                <li key={sleutel} className="overflow-hidden">
                  <Link
                    href={href(taal, sleutel)}
                    className="t-titel block py-2 transition-[transform,color] duration-500 hover:text-taupe"
                    style={{
                      transform: menuOpen ? "translateY(0)" : "translateY(110%)",
                      transitionDelay: `${menuOpen ? 120 + i * 60 : 0}ms`,
                    }}
                  >
                    {label(w)}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              {talen.map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && <span className="text-inkt-licht">·</span>}
                  <Link
                    href={anderetaalHref(t)}
                    hrefLang={t}
                    className={`text-sm font-bold uppercase tracking-[0.14em] ${
                      t === taal ? "text-inkt" : "text-inkt-licht"
                    }`}
                  >
                    {taalNamen[t]}
                  </Link>
                </span>
              ))}
            </div>

            <Link href={href(taal, "contact")} className="knop knop-vol">
              {w.nav.boek}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
