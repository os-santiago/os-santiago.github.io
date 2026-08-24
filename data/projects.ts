export type Project = {
  name: string;
  description: string;
  descriptionEn: string;
  language: string;
  repoUrl: string;
  homepageUrl?: string;
  status: "active" | "stale";
  lastUpdated: string;
};

export const projects: Project[] = [
  {
    name: "Homedir",
    description:
      "Plataforma comunitaria de DevRel, Open Source e InnerSource. Hub que consolida eventos, contenido curado, gamificación y colaboración.",
    descriptionEn:
      "Community platform for DevRel, Open Source and InnerSource. Hub consolidating events, curated content, gamification and collaboration.",
    language: "Java",
    repoUrl: "https://github.com/os-santiago/homedir",
    homepageUrl: "https://homedir.opensourcesantiago.io",
    status: "active",
    lastUpdated: "2026-08-24",
  },
  {
    name: "DevOpsDays Santiago 2026",
    description:
      "Sitio web del evento DevOpsDays Santiago 2026. Dos días sobre DevOps, IA, Platform Engineering y Cloud Native.",
    descriptionEn:
      "Website for DevOpsDays Santiago 2026. Two days on DevOps, AI, Platform Engineering and Cloud Native.",
    language: "TypeScript",
    repoUrl: "https://github.com/os-santiago/devopsdays-santiago-webpage",
    homepageUrl: "https://devopsdayschile.cl",
    status: "active",
    lastUpdated: "2026-08-24",
  },
  {
    name: "Homedir Infra",
    description:
      "Framework declarativo de infraestructura para desplegar aplicaciones containerizadas en VPS con Podman o K3s.",
    descriptionEn:
      "Declarative infrastructure framework for deploying containerized applications on VPS with Podman or K3s.",
    language: "Shell",
    repoUrl: "https://github.com/os-santiago/homedir-infra",
    status: "active",
    lastUpdated: "2026-08-23",
  },
  {
    name: "Homedir IDP",
    description:
      "Internal Developer Platform para comunidades Homedir. Portal self-service para crear y desplegar instancias.",
    descriptionEn:
      "Internal Developer Platform for Homedir communities. Self-service portal for creating and deploying instances.",
    language: "Java",
    repoUrl: "https://github.com/os-santiago/homedir-idp",
    homepageUrl: "https://homedir-idp.opensourcesantiago.io",
    status: "active",
    lastUpdated: "2026-08-04",
  },
  {
    name: "Homedir AI-SDLC",
    description:
      "Plataforma autónoma de desarrollo que gestiona el ciclo completo de issues en GitHub desde admission hasta deployment.",
    descriptionEn:
      "Autonomous development platform managing the full issue lifecycle on GitHub from admission to deployment.",
    language: "Shell",
    repoUrl: "https://github.com/os-santiago/homedir-ai-sdlc",
    status: "active",
    lastUpdated: "2026-08-24",
  },
  {
    name: "SC Agent CLI",
    description:
      "CLI agent provider-agnostic con tool use, compatible con cualquier API OpenAI-compatible.",
    descriptionEn:
      "Provider-agnostic CLI agent with tool use, compatible with any OpenAI-compatible API.",
    language: "TypeScript",
    repoUrl: "https://github.com/os-santiago/sc-agent-cli",
    status: "active",
    lastUpdated: "2026-07-13",
  },
  {
    name: "SC Nano Model",
    description:
      "LLM consumer-grade revolucionario: 150M parámetros, <600MB RAM. Innovaciones en HSDA+GQA+Early Exit.",
    descriptionEn:
      "Revolutionary consumer-grade LLM: 150M params, <600MB RAM. Innovations in HSDA+GQA+Early Exit.",
    language: "Rust",
    repoUrl: "https://github.com/os-santiago/sc-nano-model",
    status: "active",
    lastUpdated: "2026-07-07",
  },
  {
    name: "Navia Frontend",
    description:
      "App web basada en IA para generar una experiencia aumentada de navegación. Asistente conversacional con drawer interactivo.",
    descriptionEn:
      "AI-powered web app for augmented web navigation. Conversational assistant with interactive drawer.",
    language: "TypeScript",
    repoUrl: "https://github.com/os-santiago/navia-frontend",
    status: "active",
    lastUpdated: "2025-10-27",
  },
  {
    name: "Workspace OS",
    description:
      "Sistema operativo local-first, cloud-compatible, para trabajo asistido por IA. Coordina doctrina, evidencia, ejecución y agentes.",
    descriptionEn:
      "Local-first, cloud-compatible operating system for AI-assisted work. Coordinates doctrine, evidence, execution and agents.",
    language: "Python",
    repoUrl: "https://github.com/os-santiago/workspace-os",
    status: "active",
    lastUpdated: "2026-06-28",
  },
  {
    name: "ADEV Pattern Bridge",
    description:
      "Capa de curación entre evidencia operacional y doctrina ADEV. Lee transacciones, agrupa en patrones y prepara candidatos a doctrina.",
    descriptionEn:
      "Curation layer between operational evidence and ADEV doctrine. Reads transactions, groups into patterns and prepares doctrine candidates.",
    language: "Python",
    repoUrl: "https://github.com/os-santiago/adev-pattern-bridge",
    status: "active",
    lastUpdated: "2026-06-25",
  },
  {
    name: "ADEV",
    description:
      "Doctrina canónica de desarrollo asistido por IA. Framework vendor-neutral con 50 reglas no-negociables, starter kit y libro.",
    descriptionEn:
      "Canonical AI-assisted development doctrine. Vendor-neutral framework with 50 non-negotiable rules, starter kit and book.",
    language: "Markdown",
    repoUrl: "https://github.com/scanalesespinoza/adev",
    status: "active",
    lastUpdated: "2026-08-24",
  },
];
