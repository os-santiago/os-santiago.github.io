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
      icon: <IconBrandDiscord size={16} className="text-cyan" />,
    },
    {
      label: "GitHub",
      href: "https://github.com/os-santiago",
      external: true,
      icon: <IconBrandGithub size={16} className="text-cyan" />,
    },
    {
      label: "HomeDir",
      href: "https://homedir.opensourcesantiago.io",
      external: true,
      icon: <IconHome size={16} className="text-cyan" />,
    },
  ];

  return (
    <footer className="border-cyan/10 bg-void-deep border-t">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-cyan-dim font-mono text-xs tracking-widest uppercase">
            {msgs["home.title"]}
          </p>
          <div className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-dim hover:text-cyan flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-cyan-dim/50 mt-6 text-center font-mono text-[10px] tracking-wider">
          {msgs["home.tagline"]}
        </p>
        <p className="text-cyan-dim/30 mt-2 text-center font-mono text-[10px] uppercase tracking-widest">
          {msgs["home.copyright"] ? msgs["home.copyright"].replace("{year}", String(new Date().getFullYear())) : `© ${new Date().getFullYear()} Open Source Santiago`}
        </p>
      </div>
    </footer>
  );
}
