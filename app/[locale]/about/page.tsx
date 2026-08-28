import {
  IconBrandDiscord,
  IconArrowRight,
  IconCalendar,
  IconRocket,
  IconCode,
} from "@tabler/icons-react";
import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { DataPanel } from "@/components/ui/data-panel";
import { NeonButton } from "@/components/ui/neon-button";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = getMessages(locale as Locale);

  const facts = [
    {
      label: msgs["about.founded"],
      value: "2024",
      icon: <IconCalendar size={16} className="text-cyan" />,
    },
    {
      label: msgs["about.mainProject"],
      value: "HomeDir",
      href: "https://homedir.opensourcesantiago.io",
      icon: <IconRocket size={16} className="text-cyan" />,
    },
    {
      label: msgs["about.methodology"],
      value: "ADEV",
      href: "https://github.com/scanalesespinoza/adev",
      icon: <IconCode size={16} className="text-cyan" />,
    },
    {
      label: msgs["about.discord"],
      value: msgs["about.join"],
      href: "https://discord.gg/3eawzc9ybc",
      icon: <IconBrandDiscord size={16} className="text-cyan" />,
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-center">
      <GlitchText as="h1" className="text-cyan font-display text-4xl font-bold text-center block mx-auto">
        {msgs["about.title"]}
      </GlitchText>

      <div className="mt-8">
        <DataPanel title="MISSION">
          <p className="text-cyan-dim leading-relaxed text-center">
            {msgs["about.mission"]}
          </p>
        </DataPanel>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {facts.map((fact) => (
          <DataPanel key={fact.label}>
            <div className="text-cyan-deep flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
              {fact.icon}
              {fact.label}
            </div>
            {fact.href ? (
              <a
                href={fact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan font-display hover:text-cyan-bright mt-1 block text-lg font-bold transition-colors text-center"
              >
                {fact.value} →
              </a>
            ) : (
              <div className="text-cyan font-display mt-1 text-lg font-bold text-center">
                {fact.value}
              </div>
            )}
          </DataPanel>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4 justify-center items-center">
        <NeonButton
          href="https://discord.gg/3eawzc9ybc"
          external
          size="md"
          icon={<IconBrandDiscord size={18} className="text-cyan" />}
        >
          {msgs["about.join"]}
        </NeonButton>
        <NeonButton
          href={`/${locale}/adev`}
          size="md"
          icon={<IconArrowRight size={18} className="text-cyan" />}
        >
          {msgs["home.cta.adev"]}
        </NeonButton>
      </div>
    </main>
  );
}
