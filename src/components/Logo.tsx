/**
 * Het beeldmerk van F2studio: een diafragma (aperture) in dunne lijnen.
 * Zes bladen rond een open midden — het teken dat elke fotograaf herkent,
 * maar dan rustig genoeg voor een elegante huisstijl.
 *
 * Het merk erft zijn kleur van de tekst eromheen (currentColor),
 * dus het werkt op crème én op donkere secties.
 */
export function LogoMerk({ className = "" }: { className?: string }) {
  // Zes bladen, elk 60° gedraaid rond het midden.
  const bladen = [0, 60, 120, 180, 240, 300];

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="27" strokeOpacity="0.55" />
      <g strokeOpacity="0.9">
        {bladen.map((hoek) => (
          <path
            key={hoek}
            d="M32 9.5 L50.5 20.2 L41.2 36.3 Z"
            transform={`rotate(${hoek} 32 32)`}
            strokeOpacity="0.42"
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="8.4" strokeOpacity="0.95" />
    </svg>
  );
}

/**
 * Het woordmerk. Bewust als echte tekst, niet als plaatje:
 * blijft scherp op elk scherm en Google kan het lezen.
 */
export function LogoWoord({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display leading-none ${className}`}
      style={{ letterSpacing: "0.02em" }}
    >
      F
      <span style={{ fontSize: "0.78em", verticalAlign: "0.16em" }}>2</span>
      <span style={{ letterSpacing: "0.12em" }}>studio</span>
    </span>
  );
}

/** Merk en woordmerk naast elkaar, zoals in de navigatie en de footer. */
export function Logo({
  className = "",
  merkClassName = "h-8 w-8",
  woordClassName = "text-xl",
}: {
  className?: string;
  merkClassName?: string;
  woordClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMerk className={merkClassName} />
      <LogoWoord className={woordClassName} />
    </span>
  );
}
