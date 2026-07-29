"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Regelt alle scroll-animaties op de site. Werkt op basis van klassen,
 * zodat de pagina's zelf geen animatiecode hoeven te bevatten:
 *
 *   .reveal        blok schuift omhoog en vervaagt in beeld
 *   .onthul        kop rolt woord voor woord omhoog
 *   .reveal-beeld  foto vouwt open van onder naar boven
 *   .reveal-lijn   streep groeit uit vanaf de zijkant
 *   [data-parallax] beeld beweegt trager mee dan de pagina
 *   [data-teller]   getal telt op zodra het in beeld komt
 *
 * Zonder JavaScript of met "verminder beweging" aan blijft alles zichtbaar.
 */
export function Animaties() {
  const pathname = usePathname();
  const houder = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const minderBeweging = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (minderBeweging) {
        gsap.set(
          ".reveal, .onthul > span > span, .reveal-beeld, .reveal-lijn",
          { clearProps: "all" },
        );
        return;
      }

      const inBeeld = (extra = {}) => ({
        scrollTrigger: { start: "top 88%", once: true, ...extra },
      });

      // --- Blokken die omhoog schuiven -----------------------------
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: Number(el.dataset.revealVertraging ?? 0),
          ...inBeeld({ trigger: el }),
        });
      });

      // --- Koppen die woord voor woord omhoog rollen ---------------
      gsap.utils.toArray<HTMLElement>(".onthul").forEach((el) => {
        const woorden = el.querySelectorAll<HTMLElement>(":scope > span > span");
        if (!woorden.length) return;

        gsap.to(woorden, {
          y: "0%",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.055,
          delay: Number(el.dataset.onthulVertraging ?? 0),
          ...inBeeld({ trigger: el }),
        });
      });

      // --- Foto's die openvouwen -----------------------------------
      gsap.utils.toArray<HTMLElement>(".reveal-beeld").forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.inOut",
          ...inBeeld({ trigger: el, start: "top 90%" }),
        });
      });

      // --- Strepen die uitgroeien ----------------------------------
      gsap.utils.toArray<HTMLElement>(".reveal-lijn").forEach((el) => {
        gsap.to(el, {
          scaleX: 1,
          duration: 1.3,
          ease: "power3.inOut",
          ...inBeeld({ trigger: el }),
        });
      });

      // --- Parallax op beelden -------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const afstand = Number(el.dataset.parallax ?? 0);
        if (!afstand) return;

        gsap.fromTo(
          el,
          { y: -afstand },
          {
            y: afstand,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      // --- Tellers -------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-teller]").forEach((el) => {
        const doel = Number(el.dataset.teller ?? 0);
        const obj = { waarde: 0 };

        gsap.to(obj, {
          waarde: doel,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.waarde));
          },
          ...inBeeld({ trigger: el }),
        });
      });

      // --- Secties die licht inzoomen bij het verlaten -------------
      gsap.utils.toArray<HTMLElement>("[data-vastzet]").forEach((el) => {
        gsap.to(el, {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    },
    // Geen "scope": de klassen staan door de hele pagina heen, niet in dit
    // ene element. Bij elke paginawissel draaien we alles terug en opnieuw op.
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return <div ref={houder} hidden />;
}
