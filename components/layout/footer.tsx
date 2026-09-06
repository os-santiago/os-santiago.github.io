import {
  IconBrandDiscord,
  IconBrandGithub,
  IconHome,
} from "@tabler/icons-react";
import { type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { GlitchBreak } from "@/components/ui/glitch-break";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const msgs = getMessages(locale);

  const links = [
    {
      label: "Discord",
      href: "https://discord.gg/3eawzc9ybc",
      external: true,
      icon: <IconBrandDiscord size={15} className="text-cyan" />,
    },
    {
      label: "GitHub",
      href: "https://github.com/os-santiago",
      external: true,
      icon: <IconBrandGithub size={15} className="text-cyan" />,
    },
    {
      label: "HomeDir",
      href: "https://homedir.opensourcesantiago.io",
      external: true,
      icon: <IconHome size={15} className="text-cyan" />,
    },
  ];

  return (
    <footer className="border-cyan/15 bg-void-deep relative border-t">
      {/* Top subtle cyan laser gradient line */}
      <div className="via-cyan/40 absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Main Footer Row */}
        <div className="cyber-hud-box border-cyan/10 bg-void-surface/50 relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-sm border p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm md:flex-row">
          {/* Subtle matrix glitch background */}
          <GlitchBreak className="pointer-events-none opacity-20" />
          {/* Brand & Telemetry Status */}
          <div className="flex flex-col items-center gap-1.5 md:items-start">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-beacon bg-cyan absolute inline-flex h-full w-full rounded-full opacity-75" />
                <span className="bg-cyan relative inline-flex h-2 w-2 rounded-full" />
              </span>
              <span className="font-display text-cyan text-sm font-bold tracking-widest uppercase">
                {msgs["home.title"]}
              </span>
              <span className="text-cyan-deep hidden font-mono text-[10px] tracking-wider sm:inline">
                {"// SCL-CL [-33.4489, -70.6693]"}
              </span>
            </div>
            <p className="text-cyan-dim/70 text-center font-mono text-xs tracking-wider md:text-left">
              {msgs["home.tagline"]}
            </p>
          </div>

          {/* Cyberpunk Navigation Nodes */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-cyan-dim hover:text-cyan flex items-center gap-1.5 py-1 font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_10px_var(--color-cyan-glow)]"
              >
                <span className="text-cyan font-mono opacity-0 transition-opacity group-hover:opacity-100">
                  [
                </span>
                {link.icon}
                <span>{link.label}</span>
                <span className="text-cyan font-mono opacity-0 transition-opacity group-hover:opacity-100">
                  ]
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
          <p className="text-cyan-deep font-mono text-[10px] tracking-widest uppercase">
            PROTOCOL: DATA-NOIR // SYSTEM: ONLINE
          </p>
          <p className="text-cyan-dim/40 font-mono text-[10px] tracking-widest uppercase">
            {msgs["home.copyright"]
              ? msgs["home.copyright"].replace(
                  "{year}",
                  String(new Date().getFullYear()),
                )
              : `© ${new Date().getFullYear()} Open Source Santiago`}
          </p>
        </div>
      </div>
    </footer>
  );
}
