import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { projects } from "@/data/projects";
import { ProjectList } from "@/components/projects/project-list";

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
      <p className="text-cyan-dim mt-3 text-sm text-center max-w-2xl mx-auto">
        {msgs["projects.subtitle"]}
      </p>

      <ProjectList projects={projects} locale={locale as Locale} messages={msgs} />
    </main>
  );
}
