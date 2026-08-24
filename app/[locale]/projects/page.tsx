import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchCard } from "@/components/ui/glitch-card";
import { projects } from "@/data/projects";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = getMessages(locale as Locale);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <GlitchText
        as="h1"
        intensity="normal"
        className="text-cyan font-display text-4xl font-bold"
      >
        {msgs["projects.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-sm">{msgs["projects.subtitle"]}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <GlitchCard
            key={project.name}
            href={project.repoUrl}
            glow={project.name === "Homedir" ? "magenta" : "cyan"}
            className="flex flex-col p-6"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-cyan font-display text-xl font-bold">
                {project.name}
              </h3>
              <span
                className={`font-mono text-[10px] tracking-widest uppercase ${
                  project.status === "active" ? "text-cyan" : "text-magenta-dim"
                }`}
              >
                {msgs[`projects.status.${project.status}`]}
              </span>
            </div>

            <p className="text-cyan-dim mt-3 flex-1 text-sm">
              {locale === "es" ? project.description : project.descriptionEn}
            </p>

            <div className="border-cyan/10 mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-magenta-dim font-mono text-[10px] tracking-widest uppercase">
                {project.language}
              </span>
              {project.homepageUrl && (
                <a
                  href={project.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-dim hover:text-cyan font-mono text-[10px] tracking-widest uppercase transition-colors"
                >
                  www →
                </a>
              )}
            </div>
          </GlitchCard>
        ))}
      </div>
    </main>
  );
}
