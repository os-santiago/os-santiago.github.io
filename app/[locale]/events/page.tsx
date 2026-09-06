import { IconCalendarEvent, IconWorld, IconUsers } from "@tabler/icons-react";
import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchCard } from "@/components/ui/glitch-card";
import { NeonButton } from "@/components/ui/neon-button";
import { CountdownTimer } from "@/components/events/countdown-timer";
import { EventGallery } from "@/components/events/event-gallery";
import { events } from "@/data/events";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = getMessages(locale as Locale);

  const featured = events.find((e) => e.featured);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-center">
      <GlitchText
        as="h1"
        className="text-cyan font-display mx-auto block text-center text-4xl font-bold"
      >
        {msgs["events.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-center text-sm">
        {msgs["events.subtitle"]}
      </p>

      {/* Featured Event */}
      {featured && (
        <section className="mt-10">
          <GlitchCard className="p-8">
            <div className="text-cyan flex items-center justify-center gap-2 text-center font-mono text-xs tracking-widest uppercase">
              <IconCalendarEvent size={14} className="text-cyan" />
              {msgs["events.upcoming"]}
            </div>
            <h2 className="text-cyan font-display mt-2 text-center text-3xl font-bold">
              {locale === "es" ? featured.name : featured.nameEn}
            </h2>

            <div className="text-cyan-deep mt-4 text-center font-mono text-sm">
              <div>{new Date(featured.date).toLocaleDateString(locale)}</div>
              <div>
                {featured.venue}, {featured.city}, {featured.country}
              </div>
            </div>

            <p className="text-cyan-dim mx-auto mt-4 max-w-2xl text-center text-sm">
              {locale === "es" ? featured.description : featured.descriptionEn}
            </p>

            {/* Countdown */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="text-cyan-deep mb-3 text-center font-mono text-xs tracking-widest uppercase">
                {msgs["events.countdown"]}
              </div>
              <div className="flex justify-center">
                <CountdownTimer
                  targetDate={featured.date}
                  labels={{
                    days: msgs["events.days"],
                    hours: msgs["events.hours"],
                    minutes: msgs["events.minutes"],
                    seconds: msgs["events.seconds"],
                  }}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {featured.websiteUrl && (
                <NeonButton
                  href={featured.websiteUrl}
                  external
                  size="md"
                  icon={<IconWorld size={18} className="text-cyan" />}
                >
                  {msgs["events.cta.website"]}
                </NeonButton>
              )}
              {featured.volunteersUrl && (
                <NeonButton
                  href={featured.volunteersUrl}
                  external
                  size="md"
                  icon={<IconUsers size={18} className="text-cyan" />}
                >
                  {msgs["events.cta.volunteers"]}
                </NeonButton>
              )}
            </div>
          </GlitchCard>
        </section>
      )}

      {/* Past Events & Photo Collage Section */}
      <EventGallery events={events} locale={locale as Locale} messages={msgs} />
    </main>
  );
}
