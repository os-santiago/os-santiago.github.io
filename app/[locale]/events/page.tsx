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
    <main className="mx-auto max-w-5xl px-6 py-16">
      <GlitchText
        as="h1"
        intensity="normal"
        className="text-cyan font-display text-4xl font-bold"
      >
        {msgs["events.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-sm">{msgs["events.subtitle"]}</p>

      {/* Featured Event */}
      {featured && (
        <section className="mt-10">
          <GlitchCard glow="magenta" className="p-8">
            <div className="text-magenta font-mono text-xs tracking-widest uppercase">
              {msgs["events.upcoming"]}
            </div>
            <h2 className="text-cyan font-display mt-2 text-3xl font-bold">
              {locale === "es" ? featured.name : featured.nameEn}
            </h2>

            <div className="text-magenta-dim mt-4 font-mono text-sm">
              <div>{new Date(featured.date).toLocaleDateString(locale)}</div>
              <div>
                {featured.venue}, {featured.city}, {featured.country}
              </div>
            </div>

            <p className="text-cyan-dim mt-4 max-w-2xl text-sm">
              {locale === "es" ? featured.description : featured.descriptionEn}
            </p>

            {/* Countdown */}
            <div className="mt-8">
              <div className="text-magenta-dim mb-3 font-mono text-xs tracking-widest uppercase">
                {msgs["events.countdown"]}
              </div>
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

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              {featured.websiteUrl && (
                <NeonButton
                  href={featured.websiteUrl}
                  external
                  variant="cyan"
                  size="md"
                >
                  {msgs["events.cta.website"]} →
                </NeonButton>
              )}
              {featured.volunteersUrl && (
                <NeonButton
                  href={featured.volunteersUrl}
                  external
                  variant="magenta"
                  size="md"
                >
                  {msgs["events.cta.volunteers"]} →
                </NeonButton>
              )}
            </div>
          </GlitchCard>
        </section>
      )}

      {/* Upcoming Events List */}
      {upcoming.length > 1 && (
        <section className="mt-10">
          <h2 className="text-cyan font-display text-2xl font-bold">
            {msgs["events.upcoming"]}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {upcoming
              .filter((e) => !e.featured)
              .map((event) => (
                <GlitchCard key={event.id} glow="cyan" className="p-6">
                  <h3 className="text-cyan font-display text-lg font-bold">
                    {locale === "es" ? event.name : event.nameEn}
                  </h3>
                  <p className="text-cyan-dim mt-2 text-sm">
                    {locale === "es" ? event.description : event.descriptionEn}
                  </p>
                  <div className="text-magenta-dim mt-3 font-mono text-xs">
                    {new Date(event.date).toLocaleDateString(locale)} —{" "}
                    {event.venue}, {event.city}
                  </div>
                </GlitchCard>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
