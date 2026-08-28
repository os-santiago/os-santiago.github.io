import {
  IconBrandDiscord,
  IconBrandGithub,
  IconHome,
} from "@tabler/icons-react";
import { type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";

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
    <footer className="relative border-t border-cyan/15 bg-void-deep">
      {/* Top subtle cyan laser gradient line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Main Footer Row */}
        <div className="cyber-hud-box flex flex-col items-center justify-between gap-6 p-6 rounded-sm border border-cyan/10 bg-void-surface/50 backdrop-blur-sm md:flex-row shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {/* Brand & Telemetry Status */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-beacon absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              <span className="font-display text-cyan font-bold tracking-widest uppercase text-sm">
                {msgs["home.title"]}
              </span>
              <span className="font-mono text-[10px] text-cyan-deep tracking-wider hidden sm:inline">
                // SCL-CL [-33.4489, -70.6693]
              </span>
            </div>
            <p className="text-cyan-dim/70 font-mono text-xs tracking-wider text-center md:text-left">
              {msgs["home.tagline"]}
            </p>
          </div>

          {/* Cyberpunk Navigation Nodes */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-cyan-dim transition-all duration-300 hover:text-cyan hover:shadow-[0_0_10px_var(--color-cyan-glow)] py-1"
              >
                <span className="opacity-0 group-hover:opacity-100 text-cyan transition-opacity font-mono">
                  [
                </span>
                {link.icon}
                <span>{link.label}</span>
                <span className="opacity-0 group-hover:opacity-100 text-cyan transition-opacity font-mono">
                  ]
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-cyan-deep font-mono text-[10px] tracking-widest uppercase">
            PROTOCOL: DATA-NOIR // SYSTEM: ONLINE
          </p>
          <p className="text-cyan-dim/40 font-mono text-[10px] uppercase tracking-widest">
            {msgs["home.copyright"]
              ? msgs["home.copyright"].replace("{year}", String(new Date().getFullYear()))
              : `© ${new Date().getFullYear()} Open Source Santiago`}
          </p>
        </div>
      </div>
    </footer>
  );
}
