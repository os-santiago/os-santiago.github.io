import { IconBrandGithub, IconArrowRight } from "@tabler/icons-react";
import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchCard } from "@/components/ui/glitch-card";
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
      <GlitchText
        as="h1"
        className="text-cyan font-display mx-auto block text-center text-4xl font-bold"
      >
        {msgs["members.title"]}
      </GlitchText>
      <p className="text-cyan-dim mt-3 text-center text-sm">
        {msgs["members.subtitle"]}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {members.map((member) => (
          <GlitchCard
            key={member.userId}
            className="cyber-hud-box bg-void-surface/70 border-cyan/15 hover:border-cyan/40 h-[145px] rounded-sm border p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] sm:p-6"
            innerClassName="flex flex-row items-center gap-4 sm:gap-5 text-left h-full"
          >
            {/* Left: Avatar Centered Vertically */}
            <div className="flex flex-shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- external GitHub avatar CDN */}
              <img
                src={member.avatarUrl}
                alt={member.displayName}
                width={56}
                height={56}
                loading="lazy"
                className="border-cyan/30 group-hover:border-cyan h-14 w-14 rounded-full border-2 object-cover shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all"
              />
            </div>

            {/* Middle: Info Column */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              {/* Name & Role */}
              <div className="flex items-center gap-2">
                <span className="text-cyan group-hover:text-cyan-bright font-display truncate text-base font-bold transition-colors sm:text-lg">
                  {member.displayName}
                </span>
                <span
                  className={cn(
                    "flex-shrink-0 rounded-xs border px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase",
                    member.role === "admin"
                      ? "border-cyan/40 text-cyan bg-cyan/10"
                      : member.role === "moderator"
                        ? "border-magenta/40 text-magenta bg-magenta/10"
                        : "border-cyan/20 text-cyan-dim bg-cyan/5",
                  )}
                >
                  {msgs[`members.role.${member.role}`] ?? member.role}
                </span>
              </div>

              {/* Handle */}
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-deep font-mono text-xs tracking-wider">
                  @{member.github}
                </span>
              </div>

              {/* Bio */}
              {member.bio && (
                <p className="text-cyan-dim/80 mt-0.5 line-clamp-2 text-xs leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>

            {/* Right: GitHub Icon Centered Vertically */}
            <div className="flex flex-shrink-0 items-center justify-center self-center pl-1">
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn-3d border-cyan/50 text-cyan hover:border-cyan inline-flex items-center justify-center rounded-sm border p-2 font-mono transition-all duration-300"
                aria-label={`${member.displayName} GitHub`}
                title={`GitHub @${member.github}`}
              >
                <IconBrandGithub size={20} />
              </a>
            </div>
          </GlitchCard>
        ))}
      </div>

      {/* Join CTA */}
      <section className="mt-14">
        <GlitchCard className="cyber-hud-box bg-void-surface/70 border-cyan/20 flex flex-col items-center rounded-sm border p-8 text-center backdrop-blur-sm sm:p-10">
          <h2 className="text-cyan font-display text-center text-2xl font-bold">
            {msgs["members.join.title"]}
          </h2>
          <p className="text-cyan-dim mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed">
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
        </GlitchCard>
      </section>
    </main>
  );
}
