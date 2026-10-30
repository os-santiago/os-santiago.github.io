import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";
import { events } from "@/data/events";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/adev",
    "/projects",
    "/events",
    "/members",
    ...events.map((event) => `/events/${event.id}`),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}/`,
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries([
            ...locales.map((l) => [l, `${SITE_URL}/${l}${route}/`]),
            ["x-default", `${SITE_URL}/${defaultLocale}${route}/`],
          ]),
        },
      });
    }
  }

  return entries;
}
