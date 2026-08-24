import { type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const msgs = getMessages(locale);

  const links = [
    { label: "Discord", href: "https://discord.gg/3eawzc9ybc", external: true },
    {
      label: "GitHub",
      href: "https://github.com/os-santiago",
      external: true,
    },
    {
      label: "HomeDir",
      href: "https://homedir.opensourcesantiago.io",
      external: true,
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
                className="text-cyan-dim hover:text-cyan font-mono text-xs tracking-widest uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-cyan-dim/50 mt-4 text-center font-mono text-[10px]">
          {msgs["home.tagline"]}
        </p>
      </div>
    </footer>
  );
}
