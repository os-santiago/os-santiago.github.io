export type EventPhoto = {
  url: string;
  alt: string;
  caption?: string;
  captionEn?: string;
};

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
  coverImage?: string;
  photos?: EventPhoto[];
};

export const events: Event[] = [
  // --- Upcoming Events ---
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

  // --- Past Events & Meetups ---
  {
    id: "happy-hour-november-2024",
    name: "Happy Hour November 2024",
    nameEn: "Happy Hour November 2024",
    date: "2024-11-21",
    venue: "Santiago Centro",
    city: "Santiago",
    country: "Chile",
    description:
      "Encuentro presencial de la comunidad Open Source Santiago: networking, debate técnico sobre desarrollo open source, cultura DevOps y colaboración libre.",
    descriptionEn:
      "In-person meetup for the Open Source Santiago community: networking, technical discussions on open-source development, DevOps culture, and collaboration.",
    status: "past",
    featured: false,
    coverImage: "/events/happy-hour-november-2024/flyer.webp",
    photos: [
      {
        url: "/events/happy-hour-november-2024/photo-06.webp",
        alt: "Happy Hour November 2024 - Foto oficial de la comunidad Open Source Santiago",
        caption: "Foto oficial de la comunidad Open Source Santiago en Happy Hour November 2024",
        captionEn: "Official group photo of Open Source Santiago community at Happy Hour November 2024",
      },
      {
        url: "/events/happy-hour-november-2024/photo-01.webp",
        alt: "Happy Hour November 2024 - Llegada y networking",
        caption: "Llegada de asistentes y networking inicial",
        captionEn: "Attendees arriving and initial networking session",
      },
      {
        url: "/events/happy-hour-november-2024/photo-02.webp",
        alt: "Happy Hour November 2024 - Conversaciones comunitarias",
        caption: "Conversaciones e intercambio de experiencias open source",
        captionEn: "Conversations and sharing open-source experiences",
      },
      {
        url: "/events/happy-hour-november-2024/photo-03.webp",
        alt: "Happy Hour November 2024 - Debate técnico",
        caption: "Debate técnico y dinámicas de colaboración",
        captionEn: "Technical discussions and collaboration dynamics",
      },
      {
        url: "/events/happy-hour-november-2024/photo-04.webp",
        alt: "Happy Hour November 2024 - Mesa redonda",
        caption: "Mesa redonda sobre arquitectura, cloud native y DevOps",
        captionEn: "Roundtable on architecture, cloud native, and DevOps",
      },
      {
        url: "/events/happy-hour-november-2024/photo-05.webp",
        alt: "Happy Hour November 2024 - Encuentro en Santiago Centro",
        caption: "Espacio de encuentro de la comunidad en Santiago Centro",
        captionEn: "Community meetup atmosphere in Santiago Centro",
      },
    ],
  },
];
