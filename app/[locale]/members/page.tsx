import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { DataPanel } from "@/components/ui/data-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { members } from "@/data/members";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = getMessages(locale as Locale);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <GlitchText
        as="h1"
        intensity="normal"
        className="text-cyan font-display text-4xl font-bold"
      >
        {msgs["members.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-sm">{msgs["members.subtitle"]}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {members.map((member) => (
          <DataPanel key={member.userId} glow="cyan">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- external GitHub avatar CDN */}
              <img
                src={member.avatarUrl}
                alt={member.displayName}
                width={56}
                height={56}
                loading="lazy"
                className="border-cyan/30 rounded-sm border"
              />
              <div className="flex-1">
                <div className="text-cyan font-display text-lg font-bold">
                  {member.displayName}
                </div>
                <div className="text-magenta-dim font-mono text-xs tracking-widest uppercase">
                  {msgs[`members.role.${member.role}`] ?? member.role}
                </div>
              </div>
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-dim hover:text-cyan transition-colors"
                aria-label={`${member.displayName} GitHub`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </DataPanel>
        ))}
      </div>

      {/* Join CTA */}
      <section className="mt-12">
        <DataPanel title="JOIN" glow="magenta">
          <h2 className="text-cyan font-display text-2xl font-bold">
            {msgs["members.join.title"]}
          </h2>
          <p className="text-cyan-dim mt-3 text-sm">
            {msgs["members.join.desc"]}
          </p>
          <div className="mt-6">
            <NeonButton
              href="https://homedir.opensourcesantiago.io/comunidad"
              external
              variant="magenta"
              size="md"
            >
              {msgs["members.join.cta"]} →
            </NeonButton>
          </div>
        </DataPanel>
      </section>
    </main>
  );
}
