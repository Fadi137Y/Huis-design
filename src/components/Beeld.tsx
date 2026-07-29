import type { Beeld as BeeldType } from "@/lib/media";

/**
 * Eén beeld in een kader met vaste verhouding.
 *
 * - "onthul" laat het beeld van onder naar boven openvouwen bij het scrollen
 * - "parallax" laat het beeld langzamer meebewegen dan de pagina
 * - de ruimte wordt vooraf gereserveerd, zodat de pagina niet verspringt
 */
export function Beeld({
  beeld,
  className = "",
  ratio,
  parallax = 0,
  onthul = true,
  prioriteit = false,
  zoom = true,
}: {
  beeld: BeeldType;
  className?: string;
  /** Overschrijft de verhouding uit media.ts, bijvoorbeeld 4/5. */
  ratio?: number;
  /** 0 = stil. 10 tot 30 geeft een rustige parallax. */
  parallax?: number;
  onthul?: boolean;
  prioriteit?: boolean;
  zoom?: boolean;
}) {
  const verhouding = ratio ?? beeld.ratio;

  return (
    <figure
      className={`beeld-kader ${zoom ? "" : "pointer-events-none"} ${
        onthul ? "reveal-beeld" : ""
      } ${className}`}
      style={{ aspectRatio: String(verhouding) }}
    >
      <img
        src={beeld.src}
        alt={beeld.alt}
        loading={prioriteit ? "eager" : "lazy"}
        decoding={prioriteit ? "sync" : "async"}
        fetchPriority={prioriteit ? "high" : "auto"}
        data-parallax={parallax || undefined}
        style={parallax ? { height: `calc(100% + ${parallax * 2}px)` } : undefined}
      />
    </figure>
  );
}
