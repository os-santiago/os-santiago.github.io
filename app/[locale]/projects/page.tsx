import { IconCode, IconWorld, IconBrandGithub } from "@tabler/icons-react";
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
    <main className="mx-auto max-w-7xl px-6 py-16 text-center">
      <GlitchText as="h1" className="text-cyan font-display text-4xl font-bold text-center block mx-auto">
        {msgs["projects.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-sm text-center">{msgs["projects.subtitle"]}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <GlitchCard
            key={project.name}
            className="flex flex-col p-6 text-center"
          >
            <div className="flex flex-col items-center justify-center gap-2 mb-3">
              <h3 className="text-cyan font-display text-xl font-bold text-center">
                {project.name}
              </h3>
              <span
                className={`font-mono text-[10px] tracking-widest uppercase text-center ${
                  project.status === "active" ? "text-cyan" : "text-cyan-deep"
                }`}
              >
                {msgs[`projects.status.${project.status}`]}
              </span>
            </div>

            <p className="text-cyan-dim mt-3 flex-1 text-sm text-center">
              {locale === "es" ? project.description : project.descriptionEn}
            </p>

            <div className="border-cyan/10 mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-cyan-deep flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase">
                <IconCode size={12} className="text-cyan-deep" />
                {project.language}
              </span>
              <div className="flex gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-dim hover:text-cyan flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-colors"
                >
                  <IconBrandGithub size={12} className="text-cyan-dim" />
                  repo
                </a>
                {project.homepageUrl && (
                  <a
                    href={project.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-dim hover:text-cyan flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-colors"
                  >
                    <IconWorld size={12} className="text-cyan-dim" />
                    www
                  </a>
                )}
              </div>
            </div>
          </GlitchCard>
        ))}
      </div>
    </main>
  );
}
