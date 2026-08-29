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
    }))
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
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16 text-center">
      {/* Back to Events Navigation */}
      <div className="flex justify-start mb-8">
        <NeonButton
          href={`/${locale}/events`}
          size="sm"
          icon={<IconArrowLeft size={16} className="text-cyan" />}
        >
          {msgs["events.backToEvents"]}
        </NeonButton>
      </div>

      {/* Main Event Info Panel */}
      <GlitchCard className="cyber-hud-box p-6 sm:p-10 mb-10 text-center flex flex-col items-center bg-void-surface/70 backdrop-blur-sm border-cyan/20">
        <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
          <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-xs border border-cyan/40 text-cyan-bright bg-cyan/10 flex items-center gap-1.5">
            <IconCalendar size={13} className="text-cyan" />
            {new Date(event.date).toLocaleDateString(locale, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-xs border border-cyan/40 text-cyan-bright bg-cyan/10 flex items-center gap-1.5">
            <IconMapPin size={13} className="text-cyan" />
            {event.venue}, {event.city}, {event.country}
          </span>
        </div>

        <GlitchText as="h1" className="text-cyan font-display text-3xl sm:text-4xl font-bold tracking-wide text-center block mb-4">
          {locale === "es" ? event.name : event.nameEn}
        </GlitchText>

        <p className="text-cyan-dim/90 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-center">
          {locale === "es" ? event.description : event.descriptionEn}
        </p>
      </GlitchCard>

      {/* Photo Collage & Gallery */}
      {event.photos && event.photos.length > 0 && (
        <section className="w-full text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="text-cyan flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase mb-1">
              <IconSparkles size={14} className="text-cyan" />
              {msgs["events.gallery"]}
            </div>
            <h2 className="text-cyan font-display text-2xl font-bold tracking-wide">
              {locale === "es" ? "Collage Fotográfico del Evento" : "Event Photo Collage"}
            </h2>
          </div>

          <EventDetailGallery photos={event.photos} locale={locale as Locale} />
        </section>
      )}
    </main>
  );
}
