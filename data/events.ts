export type Event = {
  id: string;
  name: string;
  nameEn: string;
  date: string;
  endDate?: string;
  venue: string;
  city: string;
  country: string;
  websiteUrl?: string;
  volunteersUrl?: string;
  description: string;
  descriptionEn: string;
  status: "upcoming" | "past";
  featured: boolean;
};

export const events: Event[] = [
  {
    id: "devopsdays-santiago-2026",
    name: "DevOpsDays Santiago 2026",
    nameEn: "DevOpsDays Santiago 2026",
    date: "2026-09-08",
    endDate: "2026-09-09",
    venue: "Centro de Extensión UC",
    city: "Santiago",
    country: "Chile",
    websiteUrl: "https://devopsdayschile.cl",
    volunteersUrl:
      "https://homedir.opensourcesantiago.io/event/devopsdays-santiago-2026/volunteers",
    description:
      "Dos días sobre DevOps, IA, Platform Engineering y Cloud Native. Charlas, talleres, paneles y networking con la comunidad LATAM.",
    descriptionEn:
      "Two days on DevOps, AI, Platform Engineering and Cloud Native. Talks, workshops, panels and networking with the LATAM community.",
    status: "upcoming",
    featured: true,
  },
];
