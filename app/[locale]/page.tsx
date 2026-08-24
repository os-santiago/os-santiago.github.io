import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { DataRain } from "@/components/ui/data-rain";
import { DataPanel } from "@/components/ui/data-panel";
import { GlitchCard } from "@/components/ui/glitch-card";
import { NeonButton } from "@/components/ui/neon-button";
import { ReflectiveSurface } from "@/components/ui/reflective-surface";
import { projects } from "@/data/projects";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = getMessages(locale as Locale);
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <ReflectiveSurface className="relative min-h-[calc(100vh-3.5rem)]">
        <DataRain className="opacity-30" density={0.3} />

        <main className="relative z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6">
          <GlitchText
            as="h1"
            intensity="normal"
            className="text-cyan font-display text-center text-5xl font-bold sm:text-7xl"
          >
            {msgs["home.title"]}
          </GlitchText>

          <p className="text-cyan-dim mt-6 max-w-2xl text-center text-lg">
            {msgs["home.tagline"]}
          </p>

          <p className="text-magenta-dim mt-3 max-w-xl text-center text-sm">
            {msgs["home.mission"]}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <NeonButton
              href="https://discord.gg/3eawzc9ybc"
              external
              variant="cyan"
              size="md"
            >
              {msgs["home.cta.discord"]}
            </NeonButton>
            <NeonButton
              href="https://github.com/os-santiago"
              external
              variant="magenta"
              size="md"
            >
              {msgs["home.cta.github"]}
            </NeonButton>
            <NeonButton
              href="https://homedir.opensourcesantiago.io"
              external
              variant="cyan"
              size="md"
            >
              {msgs["home.cta.homedir"]}
            </NeonButton>
          </div>

          <p className="text-cyan-dim/60 mt-16 font-mono text-xs tracking-widest uppercase">
            {msgs["home.closing"]}
          </p>
        </main>
      </ReflectiveSurface>

      {/* Event Highlight */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <GlitchCard glow="magenta" className="p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-magenta font-mono text-xs tracking-widest uppercase">
                {msgs["events.upcoming"]}
              </div>
              <h2 className="text-cyan font-display mt-2 text-3xl font-bold">
                {msgs["home.event.title"]}
              </h2>
              <p className="text-cyan-dim mt-2 text-sm">
                {msgs["home.event.description"]}
              </p>
              <div className="text-magenta-dim mt-4 font-mono text-sm">
                <div>{msgs["home.event.date"]}</div>
                <div>{msgs["home.event.venue"]}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <NeonButton
                href={`/${locale}/events`}
                variant="magenta"
                size="md"
              >
                {msgs["home.event.cta"]}
              </NeonButton>
              {events_website_btn(msgs)}
            </div>
          </div>
        </GlitchCard>
      </section>

      {/* Homedir Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-cyan font-display text-3xl font-bold">
          {msgs["home.homedir.title"]}
        </h2>
        <p className="text-cyan-dim mt-3 max-w-3xl">
          {msgs["home.homedir.description"]}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DataPanel title={msgs["home.homedir.f1.title"]} glow="cyan">
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f1.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.homedir.f2.title"]} glow="magenta">
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f2.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.homedir.f3.title"]} glow="cyan">
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f3.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.homedir.f4.title"]} glow="cyan">
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f4.desc"]}
            </p>
          </DataPanel>
        </div>

        <div className="mt-8">
          <NeonButton
            href="https://homedir.opensourcesantiago.io"
            external
            variant="cyan"
            size="md"
          >
            {msgs["home.cta.explore"]} →
          </NeonButton>
        </div>
      </section>

      {/* ADEV Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-cyan font-display text-3xl font-bold">
          {msgs["home.adev.title"]}
        </h2>
        <p className="text-cyan-dim mt-3 max-w-3xl">
          {msgs["home.adev.description"]}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <DataPanel title={msgs["home.adev.pillar1"]} glow="cyan">
            <p className="text-cyan-dim text-sm">
              {msgs["home.adev.pillar1.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.adev.pillar2"]} glow="magenta">
            <p className="text-cyan-dim text-sm">
              {msgs["home.adev.pillar2.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.adev.pillar3"]} glow="cyan">
            <p className="text-cyan-dim text-sm">
              {msgs["home.adev.pillar3.desc"]}
            </p>
          </DataPanel>
        </div>

        <div className="mt-8">
          <NeonButton href={`/${locale}/adev`} variant="cyan" size="md">
            {msgs["home.cta.adev"]} →
          </NeonButton>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-cyan font-display text-3xl font-bold">
              {msgs["home.projects.title"]}
            </h2>
            <p className="text-cyan-dim mt-2 text-sm">
              {msgs["home.projects.subtitle"]}
            </p>
          </div>
          <NeonButton href={`/${locale}/projects`} variant="cyan" size="sm">
            {msgs["home.projects.cta"]} →
          </NeonButton>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => (
            <GlitchCard
              key={project.name}
              href={project.repoUrl}
              glow="cyan"
              className="p-5"
            >
              <h3 className="text-cyan font-display text-lg font-bold">
                {project.name}
              </h3>
              <p className="text-cyan-dim mt-2 text-xs">
                {locale === "es" ? project.description : project.descriptionEn}
              </p>
              <div className="text-magenta-dim mt-3 font-mono text-[10px] tracking-widest uppercase">
                {project.language}
              </div>
            </GlitchCard>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-cyan font-display text-3xl font-bold">
          {msgs["home.community.title"]}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <GlitchCard
            href="https://discord.gg/3eawzc9ybc"
            glow="cyan"
            className="p-5"
          >
            <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
              {msgs["home.cta.discord"]}
            </h3>
            <p className="text-cyan-dim mt-2 text-xs">
              {msgs["home.community.discord"]}
            </p>
          </GlitchCard>
          <GlitchCard
            href="https://github.com/os-santiago"
            glow="magenta"
            className="p-5"
          >
            <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
              {msgs["home.cta.github"]}
            </h3>
            <p className="text-cyan-dim mt-2 text-xs">
              {msgs["home.community.github"]}
            </p>
          </GlitchCard>
          <GlitchCard
            href="https://homedir.opensourcesantiago.io"
            glow="cyan"
            className="p-5"
          >
            <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
              {msgs["home.cta.homedir"]}
            </h3>
            <p className="text-cyan-dim mt-2 text-xs">
              {msgs["home.community.homedir"]}
            </p>
          </GlitchCard>
          <GlitchCard href={`/${locale}/members`} glow="cyan" className="p-5">
            <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
              {msgs["nav.members"]}
            </h3>
            <p className="text-cyan-dim mt-2 text-xs">
              {msgs["home.community.members"]}
            </p>
          </GlitchCard>
        </div>
      </section>
    </>
  );
}

function events_website_btn(msgs: Record<string, string>) {
  return (
    <NeonButton
      href="https://devopsdayschile.cl"
      external
      variant="cyan"
      size="sm"
    >
      {msgs["events.cta.website"]} →
    </NeonButton>
  );
}
