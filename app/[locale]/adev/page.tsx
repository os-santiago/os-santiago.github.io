import { getMessages } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { GlitchText } from "@/components/ui/glitch-text";
import { DataPanel } from "@/components/ui/data-panel";
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
      title: msgs["adev.pillar1.title"],
      desc: msgs["adev.pillar1.desc"],
      glow: "cyan" as const,
    },
    {
      title: msgs["adev.pillar2.title"],
      desc: msgs["adev.pillar2.desc"],
      glow: "magenta" as const,
    },
    {
      title: msgs["adev.pillar3.title"],
      desc: msgs["adev.pillar3.desc"],
      glow: "cyan" as const,
    },
  ];

  const rules = [
    msgs["adev.rules.pr"],
    msgs["adev.rules.commits"],
    msgs["adev.rules.scope"],
    msgs["adev.rules.validation"],
    msgs["adev.rules.ci"],
    msgs["adev.rules.secrets"],
    msgs["adev.rules.kiss"],
    msgs["adev.rules.delivery"],
  ];

  const cycle = [
    msgs["adev.cycle.1"],
    msgs["adev.cycle.2"],
    msgs["adev.cycle.3"],
    msgs["adev.cycle.4"],
    msgs["adev.cycle.5"],
    msgs["adev.cycle.6"],
    msgs["adev.cycle.7"],
    msgs["adev.cycle.8"],
    msgs["adev.cycle.9"],
  ];

  const starter = [
    { name: "DAY_0.md", desc: msgs["adev.starter.day0"] },
    { name: "FIRST_WEEK.md", desc: msgs["adev.starter.firstweek"] },
    { name: "DECISION_LOG.md", desc: msgs["adev.starter.decisions"] },
    {
      name: "QUALITY_CYCLE_checklist.md",
      desc: msgs["adev.starter.checklist"],
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <GlitchText
        as="h1"
        intensity="normal"
        className="text-cyan font-display text-4xl font-bold"
      >
        {msgs["adev.title"]}
      </GlitchText>

      <p className="text-cyan-dim mt-4 text-lg">{msgs["adev.definition"]}</p>

      <blockquote className="text-magenta border-magenta/50 mt-6 border-l-2 pl-4 font-mono text-sm italic">
        {msgs["adev.quote"]}
      </blockquote>

      {/* Pillars */}
      <h2 className="text-cyan font-display mt-12 text-2xl font-bold">
        {msgs["adev.pillars"]}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <DataPanel key={pillar.title} title={pillar.title} glow={pillar.glow}>
            <p className="text-cyan-dim text-sm">{pillar.desc}</p>
          </DataPanel>
        ))}
      </div>

      {/* Key Rules */}
      <h2 className="text-cyan font-display mt-12 text-2xl font-bold">
        {msgs["adev.rules"]}
      </h2>
      <div className="mt-6">
        <DataPanel title="RULES" glow="cyan">
          <ul className="space-y-3">
            {rules.map((rule, i) => (
              <li
                key={i}
                className="text-cyan-dim flex items-start gap-3 text-sm"
              >
                <span className="text-magenta font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </DataPanel>
      </div>

      {/* Operative Cycle */}
      <h2 className="text-cyan font-display mt-12 text-2xl font-bold">
        {msgs["adev.cycle"]}
      </h2>
      <div className="mt-6">
        <DataPanel title="CYCLE" glow="magenta">
          <ol className="space-y-2">
            {cycle.map((step, i) => (
              <li
                key={i}
                className="text-cyan-dim flex items-start gap-3 font-mono text-sm"
              >
                <span className="text-cyan">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </DataPanel>
      </div>

      {/* Starter Kit */}
      <h2 className="text-cyan font-display mt-12 text-2xl font-bold">
        {msgs["adev.starter"]}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {starter.map((item) => (
          <DataPanel key={item.name} glow="cyan">
            <div className="text-cyan font-mono text-sm font-bold">
              {item.name}
            </div>
            <p className="text-cyan-dim mt-1 text-xs">{item.desc}</p>
          </DataPanel>
        ))}
      </div>

      <div className="mt-12">
        <NeonButton
          href="https://github.com/scanalesespinoza/adev"
          external
          variant="cyan"
          size="lg"
        >
          {msgs["adev.cta"]} →
        </NeonButton>
      </div>
    </main>
  );
}
