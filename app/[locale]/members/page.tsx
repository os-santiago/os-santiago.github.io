import {
  IconBrandGithub,
  IconUsers,
  IconArrowRight,
} from "@tabler/icons-react";
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
    <main className="mx-auto max-w-5xl px-6 py-16 text-center">
      <GlitchText as="h1" className="text-cyan font-display text-4xl font-bold text-center block mx-auto">
        {msgs["members.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-sm text-center">{msgs["members.subtitle"]}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {members.map((member) => (
          <DataPanel key={member.userId}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- external GitHub avatar CDN */}
              <img
                src={member.avatarUrl}
                alt={member.displayName}
                width={56}
                height={56}
                loading="lazy"
                className="border-cyan/30 rounded-sm border"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="text-cyan font-display text-lg font-bold text-center sm:text-left">
                  {member.displayName}
                </div>
                <div className="text-cyan-deep font-mono text-xs tracking-widest uppercase text-center sm:text-left">
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
                <IconBrandGithub size={20} className="text-cyan-dim" />
              </a>
            </div>
          </DataPanel>
        ))}
      </div>

      {/* Join CTA */}
      <section className="mt-12">
        <DataPanel title="JOIN">
          <h2 className="text-cyan font-display text-2xl font-bold text-center">
            {msgs["members.join.title"]}
          </h2>
          <p className="text-cyan-dim mt-3 text-sm text-center">
            {msgs["members.join.desc"]}
          </p>
          <div className="mt-6 flex justify-center">
            <NeonButton
              href="https://homedir.opensourcesantiago.io/comunidad"
              external
              size="md"
              icon={<IconArrowRight size={18} className="text-cyan" />}
            >
              {msgs["members.join.cta"]}
            </NeonButton>
          </div>
        </DataPanel>
      </section>
    </main>
  );
}
