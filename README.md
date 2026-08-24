# Open Source Santiago

Website for the Open Source Santiago community.

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript 5.9 (strict)
- **Styling:** Tailwind CSS 4
- **Package Manager:** pnpm 11
- **Deploy:** GitHub Actions → GitHub Pages

## Pages

| Route          | Description             |
| -------------- | ----------------------- |
| `/es`          | Home (Spanish, default) |
| `/en`          | Home (English)          |
| `/es/about`    | About the community     |
| `/es/adev`     | ADEV methodology        |
| `/es/projects` | Project showcase        |
| `/es/events`   | Community events        |
| `/es/members`  | Community members       |

All routes have ES/EN variants.

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `pnpm dev`          | Start dev server         |
| `pnpm build`        | Static export to `out/`  |
| `pnpm lint`         | Run ESLint               |
| `pnpm format`       | Format with Prettier     |
| `pnpm format:check` | Check formatting         |
| `pnpm typecheck`    | TypeScript type checking |

## Architecture

```
app/
  [locale]/        # ES/EN locale routing
    about/
    adev/
    events/
    members/
    projects/
  layout.tsx       # Root layout (metadata, icons)
  page.tsx         # Redirect to /es
  sitemap.ts       # Static sitemap
  robots.ts        # Static robots.txt
components/
  ui/              # Data-Noir Glitch design system
  layout/          # Navbar, Footer
  i18n/            # Language switcher
  events/          # Countdown timer
data/              # Static content (projects, members, events)
i18n/              # Locale config and message bundles
lib/               # Utilities
public/            # Static assets (logo)
```

## Visual Identity

The site uses the **Data-Noir Glitch** design system: a dark, cyberpunk-inspired aesthetic with cyan and magenta as the primary palette, CRT scanlines, data rain, and glitch effects. Dark mode only. All animations respect `prefers-reduced-motion`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

Open Source Santiago — Comunidad, Tecnología y Propósito
