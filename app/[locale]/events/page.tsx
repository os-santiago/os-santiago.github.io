import {
  IconCalendarEvent,
  IconWorld,
  IconUsers,
  IconArrowRight,
} from "@tabler/icons-react";
import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchCard } from "@/components/ui/glitch-card";
import { NeonButton } from "@/components/ui/neon-button";
import { CountdownTimer } from "@/components/events/countdown-timer";
import { events } from "@/data/events";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = getMessages(locale as Locale);

  const upcoming = events.filter((e) => e.status === "upcoming");
  const featured = events.find((e) => e.featured);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-center">
      <GlitchText as="h1" className="text-cyan font-display text-4xl font-bold text-center block mx-auto">
        {msgs["events.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-sm text-center">{msgs["events.subtitle"]}</p>

      {/* Featured Event */}
      {featured && (
        <section className="mt-10">
          <GlitchCard className="p-8">
            <div className="text-cyan flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase text-center">
              <IconCalendarEvent size={14} className="text-cyan" />
              {msgs["events.upcoming"]}
            </div>
            <h2 className="text-cyan font-display mt-2 text-3xl font-bold text-center">
              {locale === "es" ? featured.name : featured.nameEn}
            </h2>

            <div className="text-cyan-deep mt-4 font-mono text-sm text-center">
              <div>{new Date(featured.date).toLocaleDateString(locale)}</div>
              <div>
                {featured.venue}, {featured.city}, {featured.country}
              </div>
            </div>

            <p className="text-cyan-dim mt-4 max-w-2xl mx-auto text-sm text-center">
              {locale === "es" ? featured.description : featured.descriptionEn}
            </p>

            {/* Countdown */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="text-cyan-deep mb-3 font-mono text-xs tracking-widest uppercase text-center">
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
            <div className="mt-8 flex flex-wrap gap-3 justify-center items-center">
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

    </main>
  );
}
