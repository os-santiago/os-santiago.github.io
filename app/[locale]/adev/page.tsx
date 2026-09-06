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
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col justify-between px-6 py-6 text-center sm:py-8">
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <GlitchText
          as="h1"
          className="text-cyan font-display mx-auto block text-center text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          {msgs["adev.title"]}
        </GlitchText>
        <p className="text-cyan-bright mx-auto mt-2 max-w-2xl text-center font-mono text-xs tracking-wide sm:text-sm">
          {msgs["adev.tagline"]}
        </p>
        <p className="text-cyan-dim mx-auto mt-3 max-w-3xl text-center text-xs leading-relaxed sm:text-sm">
          {msgs["adev.definition"]}
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="my-4">
        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          {pillars.map((pillar) => (
            <GlitchCard
              key={pillar.id}
              className="cyber-hud-box bg-void-surface/70 border-cyan/15 hover:border-cyan/40 flex h-full flex-col justify-between rounded-sm border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] sm:p-5"
            >
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-cyan-deep font-mono text-[11px] tracking-widest uppercase">
                    PILLAR #{pillar.id}
                  </span>
                  {pillar.icon}
                </div>
                <h3 className="text-cyan font-display mb-1.5 text-sm font-bold sm:text-base">
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
        <GlitchCard className="cyber-hud-box bg-void-surface/80 border-cyan/30 flex flex-col items-center rounded-sm border p-5 text-center shadow-[0_0_30px_rgba(0,240,255,0.12)] backdrop-blur-sm sm:p-6">
          <div className="mb-1 flex items-center justify-center gap-2">
            <IconBook size={20} className="text-cyan" />
            <h2 className="text-cyan font-display text-center text-xl font-bold sm:text-2xl">
              {msgs["adev.book.card.title"]}
            </h2>
          </div>

          <p className="text-cyan-dim mx-auto max-w-xl text-center text-xs leading-relaxed sm:text-sm">
            {msgs["adev.book.card.desc"]}
          </p>

          <p className="text-cyan-deep mt-1.5 font-mono text-[11px] tracking-wide">
            {msgs["adev.book.card.formats"]}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3.5">
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
