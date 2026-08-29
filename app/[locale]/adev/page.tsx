import {
  IconBook,
  IconBrandGithub,
  IconSparkles,
  IconShieldCheck,
  IconFileText,
} from "@tabler/icons-react";
import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { GlitchCard } from "@/components/ui/glitch-card";
import { NeonButton } from "@/components/ui/neon-button";

export default async function AdevPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = getMessages(locale as Locale);

  const pillars = [
    {
      id: "01",
      title: msgs["adev.pillar1.title"],
      desc: msgs["adev.pillar1.desc"],
      icon: <IconShieldCheck size={20} className="text-cyan" />,
    },
    {
      id: "02",
      title: msgs["adev.pillar2.title"],
      desc: msgs["adev.pillar2.desc"],
      icon: <IconSparkles size={20} className="text-cyan" />,
    },
    {
      id: "03",
      title: msgs["adev.pillar3.title"],
      desc: msgs["adev.pillar3.desc"],
      icon: <IconFileText size={20} className="text-cyan" />,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-6 sm:py-8 min-h-[calc(100vh-3.5rem)] flex flex-col justify-between text-center">
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <GlitchText as="h1" className="text-cyan font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center block mx-auto">
          {msgs["adev.title"]}
        </GlitchText>
        <p className="text-cyan-bright font-mono text-xs sm:text-sm tracking-wide mt-2 text-center mx-auto max-w-2xl">
          {msgs["adev.tagline"]}
        </p>
        <p className="text-cyan-dim mt-3 text-xs sm:text-sm leading-relaxed text-center mx-auto max-w-3xl">
          {msgs["adev.definition"]}
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {pillars.map((pillar) => (
            <GlitchCard
              key={pillar.id}
              className="cyber-hud-box p-4 sm:p-5 rounded-sm bg-void-surface/70 backdrop-blur-sm border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-cyan-deep uppercase tracking-widest">
                    PILLAR #{pillar.id}
                  </span>
                  {pillar.icon}
                </div>
                <h3 className="text-cyan font-display text-sm sm:text-base font-bold mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-cyan-dim/85 text-xs leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </GlitchCard>
          ))}
        </div>
      </div>

      {/* Book & Latest Release Download Card */}
      <div className="w-full">
        <GlitchCard className="cyber-hud-box p-5 sm:p-6 rounded-sm bg-void-surface/80 backdrop-blur-sm border border-cyan/30 text-center flex flex-col items-center shadow-[0_0_30px_rgba(0,240,255,0.12)]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <IconBook size={20} className="text-cyan" />
            <h2 className="text-cyan font-display text-xl sm:text-2xl font-bold text-center">
              {msgs["adev.book.card.title"]}
            </h2>
          </div>

          <p className="text-cyan-dim text-xs sm:text-sm max-w-xl mx-auto text-center leading-relaxed">
            {msgs["adev.book.card.desc"]}
          </p>

          <p className="text-cyan-deep font-mono text-[11px] mt-1.5 tracking-wide">
            {msgs["adev.book.card.formats"]}
          </p>

          <div className="mt-4 flex flex-wrap gap-3.5 justify-center items-center">
            <NeonButton
              href="https://github.com/scanalesespinoza/adev/releases/latest"
              external
              size="md"
              icon={<IconBook size={18} className="text-cyan" />}
            >
              {msgs["adev.cta.book"]}
            </NeonButton>

            <NeonButton
              href="https://github.com/scanalesespinoza/adev"
              external
              size="sm"
              icon={<IconBrandGithub size={16} className="text-cyan" />}
            >
              {msgs["adev.cta.repo"]}
            </NeonButton>
          </div>
        </GlitchCard>
      </div>
    </main>
  );
}
