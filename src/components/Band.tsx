/**
 * Een doorlopende tekstband die langzaam langs schuift.
 * Puur decoratief, dus verborgen voor schermlezers.
 */
export function Band({
  woorden,
  licht = false,
  className = "",
}: {
  woorden: string[];
  licht?: boolean;
  className?: string;
}) {
  // De reeks staat er twee keer in, zodat de lus naadloos doorloopt.
  const reeks = [...woorden, ...woorden];

  return (
    <div
      className={`relative overflow-hidden border-y py-6 ${
        licht ? "border-nacht-lijn" : "border-lijn"
      } ${className}`}
      aria-hidden="true"
    >
      <div className="band">
        {reeks.map((woord, i) => (
          <span
            key={`${woord}-${i}`}
            className={`font-display shrink-0 whitespace-nowrap px-8 text-2xl sm:text-3xl ${
              licht ? "text-papier/45" : "text-inkt/35"
            }`}
          >
            {woord}
            <span className="px-8 align-middle text-taupe/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
