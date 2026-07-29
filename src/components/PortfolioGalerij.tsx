"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { portfolio, type Categorie } from "@/lib/media";
import type { Woordenboek } from "@/lib/i18n";

type Filter = Categorie | "alles";

export function PortfolioGalerij({ w }: { w: Woordenboek }) {
  const [filter, setFilter] = useState<Filter>("alles");
  const [open, setOpen] = useState<number | null>(null);

  const zichtbaar = useMemo(
    () =>
      filter === "alles"
        ? portfolio
        : portfolio.filter((p) => p.categorie === filter),
    [filter],
  );

  const knoppen: { sleutel: Filter; label: string }[] = [
    { sleutel: "alles", label: w.portfolio.filters.alles },
    { sleutel: "doopsel", label: w.portfolio.filters.doopsel },
    { sleutel: "communie", label: w.portfolio.filters.communie },
    { sleutel: "verloving", label: w.portfolio.filters.verloving },
    { sleutel: "bruiloft", label: w.portfolio.filters.bruiloft },
    { sleutel: "verjaardag", label: w.portfolio.filters.verjaardag },
  ];

  const sluit = useCallback(() => setOpen(null), []);

  const stap = useCallback(
    (richting: 1 | -1) => {
      setOpen((huidig) => {
        if (huidig === null) return null;
        const volgende = huidig + richting;
        if (volgende < 0) return zichtbaar.length - 1;
        if (volgende >= zichtbaar.length) return 0;
        return volgende;
      });
    },
    [zichtbaar.length],
  );

  // Toetsenbordbediening voor de vergrote weergave.
  useEffect(() => {
    if (open === null) return;

    const opToets = (e: KeyboardEvent) => {
      if (e.key === "Escape") sluit();
      if (e.key === "ArrowRight") stap(1);
      if (e.key === "ArrowLeft") stap(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", opToets);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", opToets);
    };
  }, [open, sluit, stap]);

  const huidig = open !== null ? zichtbaar[open] : null;

  return (
    <>
      {/* Filters */}
      <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-b border-lijn pb-6">
        {knoppen.map(({ sleutel, label }) => {
          const isActief = filter === sleutel;
          return (
            <button
              key={sleutel}
              type="button"
              onClick={() => {
                setFilter(sleutel);
                setOpen(null);
              }}
              aria-pressed={isActief}
              className={`link-lijn text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                isActief ? "text-taupe" : "text-inkt-zacht hover:text-inkt"
              }`}
            >
              {label}
              <span className="ms-1.5 align-super text-[0.6rem] font-normal text-inkt-licht">
                {sleutel === "alles"
                  ? portfolio.length
                  : portfolio.filter((p) => p.categorie === sleutel).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Raster */}
      {zichtbaar.length === 0 ? (
        <p className="t-lead py-24 text-center">{w.portfolio.leeg}</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {zichtbaar.map((item, i) => (
            <button
              key={`${item.beeld.src}-${filter}-${i}`}
              type="button"
              onClick={() => setOpen(i)}
              className="beeld-kader group block w-full text-start"
              style={{
                aspectRatio: String(item.ratio),
                animation: "galerijIn 0.75s cubic-bezier(0.22,1,0.36,1) both",
                animationDelay: `${Math.min(i, 9) * 55}ms`,
              }}
            >
              <img
                src={item.beeld.src}
                alt={item.beeld.alt}
                loading={i < 6 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-nacht/55 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-papier">
                  {w.portfolio.filters[item.categorie]}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Vergrote weergave */}
      {huidig && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={huidig.beeld.alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-nacht/95 p-4 sm:p-8"
          onClick={sluit}
          style={{ animation: "galerijIn 0.35s ease both" }}
        >
          <button
            type="button"
            onClick={sluit}
            className="absolute end-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-papier/25 text-papier transition-colors hover:border-papier"
          >
            <span className="sr-only">{w.nav.sluiten}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stap(-1);
            }}
            className="absolute start-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-papier/25 text-papier transition-colors hover:border-papier sm:start-8"
          >
            <span className="sr-only">‹</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stap(1);
            }}
            className="absolute end-3 bottom-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-papier/25 text-papier transition-colors hover:border-papier sm:bottom-auto sm:end-8"
          >
            <span className="sr-only">›</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <figure
            className="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={huidig.beeld.src}
              alt={huidig.beeld.alt}
              className="max-h-[78vh] w-auto object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-[0.72rem] uppercase tracking-[0.18em] text-papier/60">
              <span>{w.portfolio.filters[huidig.categorie]}</span>
              <span>
                {(open ?? 0) + 1} / {zichtbaar.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}

      <style>{`
        @keyframes galerijIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
