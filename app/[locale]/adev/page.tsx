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
    <main className="mx-auto max-w-4xl px-6 py-16 text-center">
      {/* Title & Tagline */}
      <GlitchText as="h1" className="text-cyan font-display text-4xl sm:text-5xl font-bold text-center block mx-auto">
        {msgs["adev.title"]}
      </GlitchText>
      <p className="text-cyan-bright font-mono text-sm tracking-wide mt-3 text-center mx-auto max-w-2xl">
        {msgs["adev.tagline"]}
      </p>

      {/* Main Direct Definition */}
      <p className="text-cyan-dim mt-6 text-base sm:text-lg leading-relaxed text-center mx-auto max-w-2xl">
        {msgs["adev.definition"]}
      </p>

      {/* Quote Banner */}
      <blockquote className="text-cyan-bright border-cyan/30 my-8 border-y py-4 font-mono text-xs sm:text-sm italic text-center mx-auto max-w-2xl bg-void-surface/40 px-4">
        &ldquo;{msgs["adev.quote"]}&rdquo;
      </blockquote>

      {/* The 2 Products: Practice vs Book */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        <GlitchCard className="cyber-hud-box p-6 rounded-sm bg-void-surface/70 backdrop-blur-sm border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-2">
            <IconShieldCheck size={16} />
            {msgs["adev.products.practice.title"]}
          </div>
          <p className="text-cyan-dim text-xs sm:text-sm leading-relaxed">
            {msgs["adev.products.practice.desc"]}
          </p>
        </GlitchCard>

        <GlitchCard className="cyber-hud-box p-6 rounded-sm bg-void-surface/70 backdrop-blur-sm border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-2">
            <IconBook size={16} />
            {msgs["adev.products.book.title"]}
          </div>
          <p className="text-cyan-dim text-xs sm:text-sm leading-relaxed">
            {msgs["adev.products.book.desc"]}
          </p>
        </GlitchCard>
      </div>

      {/* 3 Core Pillars */}
      <div className="mt-14">
        <h2 className="text-cyan font-display text-2xl font-bold text-center mb-6">
          {msgs["adev.pillars"]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {pillars.map((pillar) => (
            <GlitchCard
              key={pillar.id}
              className="cyber-hud-box p-5 rounded-sm bg-void-surface/70 backdrop-blur-sm border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-cyan-deep uppercase tracking-widest">
                    #{pillar.id}
                  </span>
                  {pillar.icon}
                </div>
                <h3 className="text-cyan font-display text-base font-bold mb-2">
                  {pillar.title}
                </h3>
                <p className="text-cyan-dim/90 text-xs leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </GlitchCard>
          ))}
        </div>
      </div>

      {/* Book & Latest Release Download Card */}
      <section className="mt-14">
        <GlitchCard className="cyber-hud-box p-8 sm:p-10 rounded-sm bg-void-surface/80 backdrop-blur-sm border border-cyan/30 text-center flex flex-col items-center shadow-[0_0_35px_rgba(0,240,255,0.15)]">
          <div className="p-3 rounded-full bg-cyan/10 border border-cyan/30 text-cyan mb-4 flex items-center justify-center">
            <IconBook size={28} />
          </div>

          <h2 className="text-cyan font-display text-2xl sm:text-3xl font-bold text-center">
            {msgs["adev.book.card.title"]}
          </h2>

          <p className="text-cyan-dim mt-3 text-sm max-w-xl mx-auto text-center leading-relaxed">
            {msgs["adev.book.card.desc"]}
          </p>

          <p className="text-cyan-deep font-mono text-xs mt-2 tracking-wide">
            {msgs["adev.book.card.formats"]}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
            <NeonButton
              href="https://github.com/scanalesespinoza/adev/releases/latest"
              external
              size="lg"
              icon={<IconBook size={20} className="text-cyan" />}
            >
              {msgs["adev.cta.book"]}
            </NeonButton>

            <NeonButton
              href="https://github.com/scanalesespinoza/adev"
              external
              size="md"
              icon={<IconBrandGithub size={18} className="text-cyan" />}
            >
              {msgs["adev.cta.repo"]}
            </NeonButton>
          </div>
        </GlitchCard>
      </section>
    </main>
  );
}
