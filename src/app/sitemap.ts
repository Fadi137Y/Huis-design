import type { MetadataRoute } from "next";
import { paden, talen } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Bij een statische export moet de sitemap één keer bij het bouwen ontstaan. */
export const dynamic = "force-static";

/** Bouwt sitemap.xml voor alle pagina's in beide talen. */
export default function sitemap(): MetadataRoute.Sitemap {
  const sleutels = Object.keys(paden) as (keyof typeof paden)[];

  return talen.flatMap((taal) =>
    sleutels.map((sleutel) => {
      const pad = paden[sleutel];
      const url = pad ? `${site.url}/${taal}/${pad}/` : `${site.url}/${taal}/`;

      return {
        url,
        changeFrequency: "monthly" as const,
        priority: sleutel === "home" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            talen.map((t) => [
              t,
              pad ? `${site.url}/${t}/${pad}/` : `${site.url}/${t}/`,
            ]),
          ),
        },
      };
    }),
  );
}
