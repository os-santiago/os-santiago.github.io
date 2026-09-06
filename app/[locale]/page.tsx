import {
  IconBrandDiscord,
  IconBrandGithub,
  IconHome,
  IconUsers,
  IconArrowRight,
  IconCalendarEvent,
  IconRocket,
  IconCode,
} from "@tabler/icons-react";
import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { DataRain } from "@/components/ui/data-rain";
import { DataPanel } from "@/components/ui/data-panel";
import { GlitchCard } from "@/components/ui/glitch-card";
import { NeonButton } from "@/components/ui/neon-button";
import { ReflectiveSurface } from "@/components/ui/reflective-surface";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { getLanguageStyle } from "@/lib/project-utils";

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
      <ReflectiveSurface className="depth-squares relative min-h-[calc(100vh-3.5rem)]">
        <DataRain className="opacity-10" density={0.12} />

        <main className="relative z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6">
          <GlitchText
            as="h1"
            className="text-cyan font-display text-center text-5xl font-bold sm:text-7xl"
          >
            {msgs["home.title"]}
          </GlitchText>

          <p className="text-cyan-dim mt-6 max-w-2xl text-center text-lg">
            {msgs["home.tagline"]}
          </p>

          <p className="text-cyan-deep mt-3 max-w-xl text-center text-sm">
            {msgs["home.mission"]}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <NeonButton
              href="https://discord.gg/3eawzc9ybc"
              external
              size="md"
              icon={<IconBrandDiscord size={18} className="text-cyan" />}
            >
              {msgs["home.cta.discord"]}
            </NeonButton>
            <NeonButton
              href="https://github.com/os-santiago"
              external
              size="md"
              icon={<IconBrandGithub size={18} className="text-cyan" />}
            >
              {msgs["home.cta.github"]}
            </NeonButton>
            <NeonButton
              href="https://homedir.opensourcesantiago.io"
              external
              size="md"
              icon={<IconHome size={18} className="text-cyan" />}
            >
              {msgs["home.cta.homedir"]}
            </NeonButton>
          </div>

          <p className="text-cyan-dim/60 mt-16 text-center font-mono text-xs tracking-widest uppercase">
            {msgs["home.closing"]}
          </p>
        </main>
      </ReflectiveSurface>

      {/* Event Highlight */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <GlitchCard className="p-8">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div>
              <div className="text-cyan flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
                <IconCalendarEvent size={14} className="text-cyan" />
                {msgs["events.upcoming"]}
              </div>
              <h2 className="text-cyan font-display mt-2 text-center text-3xl font-bold">
                {msgs["home.event.title"]}
              </h2>
              <p className="text-cyan-dim mt-2 text-center text-sm">
                {msgs["home.event.description"]}
              </p>
              <div className="text-cyan-deep mt-4 text-center font-mono text-sm">
                <div>{msgs["home.event.date"]}</div>
                <div>{msgs["home.event.venue"]}</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <NeonButton
                href={`/${locale}/events`}
                size="md"
                icon={<IconArrowRight size={18} className="text-cyan" />}
              >
                {msgs["home.event.cta"]}
              </NeonButton>
              <NeonButton
                href="https://devopsdayschile.cl"
                external
                size="sm"
                icon={<IconArrowRight size={16} className="text-cyan" />}
              >
                {msgs["events.cta.website"]}
              </NeonButton>
            </div>
          </div>
        </GlitchCard>
      </section>

      {/* Homedir Features */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-cyan font-display text-center text-3xl font-bold">
          {msgs["home.homedir.title"]}
        </h2>
        <p className="text-cyan-dim mx-auto mt-3 max-w-3xl text-center">
          {msgs["home.homedir.description"]}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DataPanel title={msgs["home.homedir.f1.title"]}>
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f1.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.homedir.f2.title"]}>
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f2.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.homedir.f3.title"]}>
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f3.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.homedir.f4.title"]}>
            <p className="text-cyan-dim text-sm">
              {msgs["home.homedir.f4.desc"]}
            </p>
          </DataPanel>
        </div>

        <div className="mt-8 flex justify-center">
          <NeonButton
            href="https://homedir.opensourcesantiago.io"
            external
            size="md"
            icon={<IconArrowRight size={18} className="text-cyan" />}
          >
            {msgs["home.cta.explore"]}
          </NeonButton>
        </div>
      </section>

      {/* ADEV Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-cyan font-display text-center text-3xl font-bold">
          {msgs["home.adev.title"]}
        </h2>
        <p className="text-cyan-dim mx-auto mt-3 max-w-3xl text-center">
          {msgs["home.adev.description"]}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <DataPanel title={msgs["home.adev.pillar1"]}>
            <p className="text-cyan-dim text-sm">
              {msgs["home.adev.pillar1.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.adev.pillar2"]}>
            <p className="text-cyan-dim text-sm">
              {msgs["home.adev.pillar2.desc"]}
            </p>
          </DataPanel>
          <DataPanel title={msgs["home.adev.pillar3"]}>
            <p className="text-cyan-dim text-sm">
              {msgs["home.adev.pillar3.desc"]}
            </p>
          </DataPanel>
        </div>

        <div className="mt-8 flex justify-center">
          <NeonButton
            href={`/${locale}/adev`}
            size="md"
            icon={<IconArrowRight size={18} className="text-cyan" />}
          >
            {msgs["home.cta.adev"]}
          </NeonButton>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          <div>
            <h2 className="text-cyan font-display text-center text-3xl font-bold">
              {msgs["home.projects.title"]}
            </h2>
            <p className="text-cyan-dim mt-2 text-center text-sm">
              {msgs["home.projects.subtitle"]}
            </p>
          </div>
          <NeonButton
            href={`/${locale}/projects`}
            size="sm"
            icon={<IconArrowRight size={16} className="text-cyan" />}
          >
            {msgs["home.projects.cta"]}
          </NeonButton>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => (
            <GlitchCard
              key={project.name}
              href={project.repoUrl}
              className="border-cyan/15 hover:border-cyan/40 flex h-full flex-col items-center p-5 text-center"
            >
              <div className="mb-1 w-full">
                <h3 className="font-display text-cyan flex min-h-[2.75rem] items-center justify-center text-center text-lg font-bold">
                  {project.name}
                </h3>
              </div>
              <div className="mb-3 flex min-h-[3.75rem] w-full flex-1 items-center justify-center">
                <p className="text-cyan-dim text-center text-xs leading-relaxed">
                  {locale === "es"
                    ? project.description
                    : project.descriptionEn}
                </p>
              </div>
              <div className="border-cyan/10 mt-auto flex h-10 w-full items-center justify-center border-t pt-3">
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-xs border px-2.5 py-0.5 font-mono text-[9px] tracking-widest uppercase",
                    getLanguageStyle(project.language),
                  )}
                >
                  <IconCode size={11} />
                  {project.language}
                </span>
              </div>
            </GlitchCard>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-cyan font-display text-center text-3xl font-bold">
          {msgs["home.community.title"]}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <GlitchCard href="https://discord.gg/3eawzc9ybc" className="p-5">
            <div className="flex items-center justify-center gap-2">
              <IconBrandDiscord size={18} className="text-cyan" />
              <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
                {msgs["home.cta.discord"]}
              </h3>
            </div>
            <p className="text-cyan-dim mt-2 text-center text-xs">
              {msgs["home.community.discord"]}
            </p>
          </GlitchCard>
          <GlitchCard href="https://github.com/os-santiago" className="p-5">
            <div className="flex items-center justify-center gap-2">
              <IconBrandGithub size={18} className="text-cyan" />
              <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
                {msgs["home.cta.github"]}
              </h3>
            </div>
            <p className="text-cyan-dim mt-2 text-center text-xs">
              {msgs["home.community.github"]}
            </p>
          </GlitchCard>
          <GlitchCard
            href="https://homedir.opensourcesantiago.io"
            className="p-5"
          >
            <div className="flex items-center justify-center gap-2">
              <IconRocket size={18} className="text-cyan" />
              <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
                {msgs["home.cta.homedir"]}
              </h3>
            </div>
            <p className="text-cyan-dim mt-2 text-center text-xs">
              {msgs["home.community.homedir"]}
            </p>
          </GlitchCard>
          <GlitchCard href={`/${locale}/members`} className="p-5">
            <div className="flex items-center justify-center gap-2">
              <IconUsers size={18} className="text-cyan" />
              <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">
                {msgs["nav.members"]}
              </h3>
            </div>
            <p className="text-cyan-dim mt-2 text-center text-xs">
              {msgs["home.community.members"]}
            </p>
          </GlitchCard>
        </div>
      </section>
    </>
  );
}
