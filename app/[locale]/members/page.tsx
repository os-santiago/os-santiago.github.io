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
import { cn } from "@/lib/utils";

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

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <DataPanel key={member.userId} className="h-full flex flex-col justify-between">
            <div className="flex items-start gap-3.5 text-left">
              {/* eslint-disable-next-line @next/next/no-img-element -- external GitHub avatar CDN */}
              <img
                src={member.avatarUrl}
                alt={member.displayName}
                width={52}
                height={52}
                loading="lazy"
                className="border-cyan/30 rounded-full border flex-shrink-0 w-12 h-12 object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-cyan font-display text-base font-bold truncate">
                    {member.displayName}
                  </span>
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-dim hover:text-cyan transition-colors flex-shrink-0"
                    aria-label={`${member.displayName} GitHub`}
                  >
                    <IconBrandGithub size={18} />
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-cyan-deep font-mono text-[10px] tracking-wider uppercase">
                    @{member.github}
                  </span>
                  <span className={cn(
                    "px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider rounded-xs border",
                    member.role === "admin"
                      ? "border-cyan/40 text-cyan bg-cyan/10"
                      : member.role === "moderator"
                      ? "border-magenta/40 text-magenta bg-magenta/10"
                      : "border-cyan/20 text-cyan-dim bg-cyan/5"
                  )}>
                    {msgs[`members.role.${member.role}`] ?? member.role}
                  </span>
                </div>
                {member.bio && (
                  <p className="text-cyan-dim/80 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
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
