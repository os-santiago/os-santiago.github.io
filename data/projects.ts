export type ProjectAuthor = {
  name: string;
  github: string;
};

export type Project = {
  name: string;
  description: string;
  descriptionEn: string;
  language: string;
  repoUrl: string;
  homepageUrl?: string;
  status: "active" | "stale";
  lastUpdated: string;
  authors?: ProjectAuthor[];
  category: "org" | "community";
  icon?: string;
};

export const projects: Project[] = [
  // 1. Homedir (Flagship Core Platform)
  {
    name: "HomeDir",
    description:
      "Plataforma comunitaria de DevRel, Open Source e InnerSource. Hub que consolida eventos, contenido curado, gamificación y colaboración autónoma asistida por IA.",
    descriptionEn:
      "Community platform for DevRel, Open Source and InnerSource. Hub consolidating events, curated content, gamification, and autonomous AI-assisted collaboration.",
    language: "Java",
    repoUrl: "https://github.com/os-santiago/homedir",
    homepageUrl: "https://homedir.opensourcesantiago.io",
    status: "active",
    lastUpdated: "2026-08-24",
    authors: [{ name: "OS Santiago", github: "os-santiago" }],
    category: "org",
    icon: "home",
  },

  // 2. Artemisa (Community Flagship)
  {
    name: "Artemisa",
    description:
      "Plataforma open-source para diseñar y validar agentes de desarrollo y operaciones mediante un árbol de decisiones determinista y bundles ejecutables.",
    descriptionEn:
      "Open-source platform to design and validate development & ops agents via a deterministic decision tree and executable bundles.",
    language: "TypeScript",
    repoUrl: "https://github.com/VECTORG99/Artemisa",
    homepageUrl: "https://artemisa-ai.netlify.app/",
    status: "active",
    lastUpdated: "2026-08-14",
    authors: [
      { name: "Diego Hernandez", github: "VECTORG99" },
      { name: "Axel DaMage", github: "Axel-DaMage" },
    ],
    category: "community",
    icon: "brain",
  },

  // 3. Joidy (Community Flagship)
  {
    name: "Joidy",
    description:
      "Aplicación de notas libre y de código abierto con IA local, base de datos vectorial (PostgreSQL + pgvector), API FastAPI y sincronización bidireccional con Obsidian.",
    descriptionEn:
      "Free and open-source note-taking app featuring local AI, vector DB (pgvector), FastAPI backend, and bidirectional Obsidian sync.",
    language: "Svelte",
    repoUrl: "https://github.com/Axel-DaMage/joidy",
    homepageUrl: "https://joidy-web.vercel.app/",
    status: "active",
    lastUpdated: "2026-08-27",
    authors: [{ name: "Axel DaMage", github: "Axel-DaMage" }],
    category: "community",
    icon: "notes",
  },

  // 4. DevOpsDays Santiago 2026
  {
    name: "DevOpsDays Santiago 2026",
    description:
      "Sitio web oficial del evento DevOpsDays Santiago 2026. Conferencia sobre DevOps, IA, Platform Engineering y Cloud Native.",
    descriptionEn:
      "Official website for DevOpsDays Santiago 2026. Conference covering DevOps, AI, Platform Engineering and Cloud Native.",
    language: "TypeScript",
    repoUrl: "https://github.com/os-santiago/devopsdays-santiago-webpage",
    homepageUrl: "https://devopsdayschile.cl",
    status: "active",
    lastUpdated: "2026-08-24",
    authors: [{ name: "OS Santiago", github: "os-santiago" }],
    category: "org",
    icon: "calendar",
  },

  // 5. ADEV Doctrine
  {
    name: "ADEV",
    description:
      "Doctrina canónica de desarrollo asistido por IA. Framework vendor-neutral con 50 reglas no-negociables, starter kit y libro de buenas prácticas.",
    descriptionEn:
      "Canonical AI-assisted development doctrine. Vendor-neutral framework with 50 non-negotiable rules, starter kit and best practice guidelines.",
    language: "Markdown",
    repoUrl: "https://github.com/scanalesespinoza/adev",
    status: "active",
    lastUpdated: "2026-08-24",
    authors: [{ name: "Sergio Canales", github: "scanalesespinoza" }],
    category: "org",
    icon: "shield",
  },

  // 6. DataGestor
  {
    name: "DataGestor",
    description:
      "Plataforma analítica y pipeline DataOps/ML con dashboard en React y FastAPI para modelado y estimación sobre BigQuery (~3M de registros históricos).",
    descriptionEn:
      "Analytics platform and DataOps/ML pipeline with React dashboard and FastAPI for modeling and estimation over BigQuery (~3M records).",
    language: "Python",
    repoUrl: "https://github.com/VECTORG99/DataGestor",
    homepageUrl: "https://data-gestor.vercel.app",
    status: "active",
    lastUpdated: "2026-08-14",
    authors: [{ name: "Diego Hernandez", github: "VECTORG99" }],
    category: "community",
    icon: "database",
  },

  // 7. Cozy Corner
  {
    name: "Cozy Corner",
    description:
      "Extensión para Visual Studio Code que permite anclar imágenes y GIFs favoritos en la barra lateral del explorador mientras programas.",
    descriptionEn:
      "Visual Studio Code extension to pin your favorite images or GIFs in the explorer sidebar while coding.",
    language: "TypeScript",
    repoUrl: "https://github.com/Sebithaz-dev/Cozy-Corner",
    homepageUrl:
      "https://marketplace.visualstudio.com/items?itemName=sebithaz-dev.cozy-corner",
    status: "active",
    lastUpdated: "2026-08-11",
    authors: [{ name: "Seb", github: "Sebithaz-dev" }],
    category: "community",
    icon: "photo",
  },

  // 8. PureDark OLED Theme
  {
    name: "PureDark OLED Theme",
    description:
      "Tema oscuro puro (True Black OLED) para Visual Studio Code con resaltado sintáctico de alto contraste y mínimo impacto visual para máxima concentración.",
    descriptionEn:
      "True black OLED theme for Visual Studio Code with high-contrast syntax highlighting and minimal distraction for deep focus.",
    language: "JSON",
    repoUrl: "https://github.com/Sebithaz-dev/PureDark-Oled-Theme",
    homepageUrl:
      "https://marketplace.visualstudio.com/items?itemName=sebithaz-dev.puredark-oled-theme",
    status: "active",
    lastUpdated: "2026-08-06",
    authors: [{ name: "Seb", github: "Sebithaz-dev" }],
    category: "community",
    icon: "moon",
  },

  // 9. Miku Invest
  {
    name: "Miku Invest",
    description:
      "Asistente local multi-agente para análisis de mercado e inversión conectado a brokers reales (Binance y Alpaca) con modelos locales y cloud.",
    descriptionEn:
      "Local multi-agent assistant for market analysis and investment execution connected to real brokers (Binance & Alpaca).",
    language: "JavaScript",
    repoUrl: "https://github.com/noxtope-git/miku-invest",
    status: "active",
    lastUpdated: "2026-08-20",
    authors: [{ name: "Oscar", github: "noxtope-git" }],
    category: "community",
    icon: "chart",
  },

  // 10. OpenVist
  {
    name: "OpenVist",
    description:
      "Automatización de capturas de pantalla e inspección visual con modelos de visión 100% locales en Wayland/Hyprland sin servicios cloud externos.",
    descriptionEn:
      "Screenshot automation and visual inspection tool powered by 100% local vision models on Wayland/Hyprland without cloud dependencies.",
    language: "Shell",
    repoUrl: "https://github.com/VECTORG99/OpenVist",
    status: "active",
    lastUpdated: "2026-08-14",
    authors: [{ name: "Diego Hernandez", github: "VECTORG99" }],
    category: "community",
    icon: "eye",
  },

  // 11. Crypto Sandbox
  {
    name: "Crypto Sandbox",
    description:
      "Entorno interactivo en el navegador para experimentar con cifrado simétrico AES-256, claves secretas y hashes criptográficos con CryptoJS.",
    descriptionEn:
      "Interactive in-browser sandbox for experimenting with AES-256 symmetric encryption, secret keys, and cryptographic hashes.",
    language: "JavaScript",
    repoUrl: "https://github.com/Sebithaz-dev/Crypto-Sandbox-React",
    homepageUrl: "https://crypto-sandbox-react.vercel.app",
    status: "active",
    lastUpdated: "2026-08-10",
    authors: [{ name: "Seb", github: "Sebithaz-dev" }],
    category: "community",
    icon: "lock",
  },

  // 12. SC Agent CLI
  {
    name: "SC Agent CLI",
    description:
      "CLI agent provider-agnostic con soporte de herramientas (tool use), compatible con cualquier API compatible con OpenAI.",
    descriptionEn:
      "Provider-agnostic CLI agent with tool use, compatible with any OpenAI-compatible API.",
    language: "TypeScript",
    repoUrl: "https://github.com/os-santiago/sc-agent-cli",
    status: "active",
    lastUpdated: "2026-07-13",
    authors: [{ name: "OS Santiago", github: "os-santiago" }],
    category: "org",
    icon: "terminal",
  },

  // 13. Workspace OS
  {
    name: "Workspace OS",
    description:
      "Sistema operativo local-first y cloud-compatible para trabajo asistido por IA. Coordina doctrina, evidencia, ejecución y agentes.",
    descriptionEn:
      "Local-first, cloud-compatible operating system for AI-assisted work. Coordinates doctrine, evidence, execution and agents.",
    language: "Python",
    repoUrl: "https://github.com/os-santiago/workspace-os",
    status: "active",
    lastUpdated: "2026-06-28",
    authors: [{ name: "OS Santiago", github: "os-santiago" }],
    category: "org",
    icon: "desktop",
  },

  // 14. Backstage Testkube Plugin
  {
    name: "Backstage Testkube Plugin",
    description:
      "Plugin de Backstage para integración y monitoreo de pruebas automatizadas nativas de la nube en clústeres Kubernetes con Testkube.",
    descriptionEn:
      "Backstage plugin for cloud-native automated testing integration and monitoring across Kubernetes clusters with Testkube.",
    language: "TypeScript",
    repoUrl: "https://github.com/caiodonascimento/backstage-testkube-plugin",
    status: "active",
    lastUpdated: "2025-06-23",
    authors: [{ name: "Caio Medeiros", github: "caiodonascimento" }],
    category: "community",
    icon: "testpipe",
  },
];
