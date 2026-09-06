import { notFound } from "next/navigation";
import {
  IconCalendar,
  IconMapPin,
  IconArrowLeft,
  IconSparkles,
} from "@tabler/icons-react";
import { getMessages } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchCard } from "@/components/ui/glitch-card";
import { NeonButton } from "@/components/ui/neon-button";
import { EventDetailGallery } from "@/components/events/event-detail-gallery";
import { events } from "@/data/events";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    events.map((event) => ({
      locale,
      id: event.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${locale === "es" ? event.name : event.nameEn} | Open Source Santiago`,
    description: locale === "es" ? event.description : event.descriptionEn,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const msgs = getMessages(locale as Locale);

  const event = events.find((e) => e.id === id);
  if (!event) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-center sm:py-16">
      {/* Back to Events Navigation */}
      <div className="mb-8 flex justify-start">
        <NeonButton
          href={`/${locale}/events`}
          size="sm"
          icon={<IconArrowLeft size={16} className="text-cyan" />}
        >
          {msgs["events.backToEvents"]}
        </NeonButton>
      </div>

      {/* Main Event Info Panel */}
      <GlitchCard className="cyber-hud-box bg-void-surface/70 border-cyan/20 mb-10 flex flex-col items-center p-6 text-center backdrop-blur-sm sm:p-10">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span className="border-cyan/40 text-cyan-bright bg-cyan/10 flex items-center gap-1.5 rounded-xs border px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
            <IconCalendar size={13} className="text-cyan" />
            {new Date(event.date).toLocaleDateString(locale, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="border-cyan/40 text-cyan-bright bg-cyan/10 flex items-center gap-1.5 rounded-xs border px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
            <IconMapPin size={13} className="text-cyan" />
            {event.venue}, {event.city}, {event.country}
          </span>
        </div>

        <GlitchText
          as="h1"
          className="text-cyan font-display mb-4 block text-center text-3xl font-bold tracking-wide sm:text-4xl"
        >
          {locale === "es" ? event.name : event.nameEn}
        </GlitchText>

        <p className="text-cyan-dim/90 mx-auto max-w-3xl text-center text-sm leading-relaxed sm:text-base">
          {locale === "es" ? event.description : event.descriptionEn}
        </p>
      </GlitchCard>

      {/* Photo Collage & Gallery */}
      {event.photos && event.photos.length > 0 && (
        <section className="w-full text-center">
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="text-cyan mb-1 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
              <IconSparkles size={14} className="text-cyan" />
              {msgs["events.gallery"]}
            </div>
            <h2 className="text-cyan font-display text-2xl font-bold tracking-wide">
              {locale === "es"
                ? "Collage Fotográfico del Evento"
                : "Event Photo Collage"}
            </h2>
          </div>

          <EventDetailGallery photos={event.photos} locale={locale as Locale} />
        </section>
      )}
    </main>
  );
}
