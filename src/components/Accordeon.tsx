"use client";

import { useState } from "react";

/**
 * Uitklapbare vragen. Eén vraag tegelijk open — dat houdt de pagina
 * rustig en scheelt scrollen.
 */
export function Accordeon({
  items,
}: {
  items: { vraag: string; antwoord: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-lijn">
      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <div key={i} className="border-b border-lijn">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`antwoord-${i}`}
                className="flex w-full items-center justify-between gap-6 py-6 text-start transition-colors hover:text-taupe"
              >
                <span className="t-sub">{item.vraag}</span>
                <span
                  className="relative flex h-6 w-6 shrink-0 items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="absolute h-px w-4 bg-current" />
                  <span
                    className={`absolute h-px w-4 bg-current transition-transform duration-500 ${
                      isOpen ? "rotate-0" : "rotate-90"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                  />
                </span>
              </button>
            </h3>

            <div
              id={`antwoord-${i}`}
              className="grid transition-[grid-template-rows] duration-500"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 text-[0.98rem] leading-relaxed text-inkt-zacht">
                  {item.antwoord}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
