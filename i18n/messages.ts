import type { Locale } from "./config";

export type Messages = Record<string, string>;

const es: Messages = {
  "nav.home": "Inicio",
  "nav.about": "Acerca de",
  "nav.adev": "ADEV",
  "nav.projects": "Proyectos",
  "nav.events": "Eventos",
  "nav.members": "Miembros",

  "home.title": "Open Source Santiago",
  "home.tagline": "Comunidad, Tecnología y Propósito — abiertos al mundo",
  "home.mission":
    "Comunidad iniciada por organizadores en Chile, pero pensada desde su origen como un espacio abierto al mundo.",
  "home.cta.discord": "Discord",
  "home.cta.github": "GitHub",
  "home.cta.homedir": "HomeDir",
  "home.cta.explore": "Explorar HomeDir",
  "home.cta.adev": "Conocer ADEV",
  "home.closing": "Bienvenid@ al viaje. Aquí, el código transforma personas.",
  "home.copyright": "© {year} Open Source Santiago. Todos los derechos reservados.",

  "home.event.title": "DevOpsDays Santiago 2026",
  "home.event.date": "8-9 Septiembre 2026",
  "home.event.venue": "Centro de Extensión UC, Santiago, Chile",
  "home.event.cta": "Ver evento",
  "home.event.description":
    "Dos días sobre DevOps, IA, Platform Engineering y Cloud Native.",

  "home.homedir.title": "Proyecto Estrella: HomeDir",
  "home.homedir.description":
    "Plataforma comunitaria de DevRel, Open Source e InnerSource. Hub que consolida eventos, contenido curado, gamificación y colaboración.",
  "home.homedir.f1.title": "Eventos & CFP",
  "home.homedir.f1.desc":
    "Gestión de conferencias, Call for Papers, voluntarios y agenda.",
  "home.homedir.f2.title": "Reputación & Gamificación",
  "home.homedir.f2.desc":
    "Sistema de XP, HCoin, clases y leaderboards para reconocer contribuciones.",
  "home.homedir.f3.title": "Comunidad",
  "home.homedir.f3.desc":
    "Contenido curado con votación comunitaria y tablero de miembros.",
  "home.homedir.f4.title": "GitHub Trending",
  "home.homedir.f4.desc":
    "Descubrimiento de repositorios trending con caché inteligente.",

  "home.adev.title": "Metodología ADEV",
  "home.adev.description":
    "Augmented Development (A-Dev) es nuestra metodología de desarrollo asistido por IA. Framework vendor-neutral para orquestar entrega de software con disciplina, calidad y trazabilidad.",
  "home.adev.pillar1": "Living Baseline",
  "home.adev.pillar1.desc":
    "Restricciones que todo prompt debe leer, actualizadas con cada fallo.",
  "home.adev.pillar2": "50/50 Quality Cycle",
  "home.adev.pillar2.desc":
    "Mitad del tiempo en creación, mitad en verificación.",
  "home.adev.pillar3": "Digital Thread",
  "home.adev.pillar3.desc":
    "Toda feature se vincula a un plan, prompt y evidencia.",

  "home.projects.title": "Proyectos",
  "home.projects.subtitle": "Vitrina del ecosistema OS Santiago",
  "home.projects.cta": "Ver todos",

  "home.community.title": "Comunidad",
  "home.community.discord": "Conversa con la comunidad",
  "home.community.github": "Repositorios y proyectos",
  "home.community.homedir": "Plataforma comunitaria",
  "home.community.members": "Directorio de la comunidad",

  "about.title": "Acerca de Open Source Santiago",
  "about.mission":
    "Open Source Santiago es una comunidad iniciada por organizadores en Chile, pero pensada desde su origen como un espacio abierto al mundo. Nuestro propósito es construir un punto de encuentro para personas de distintas culturas, lenguajes y trayectorias que ven en el código abierto una herramienta para generar conocimiento, colaboración y transformación social.",
  "about.founded": "Fundado",
  "about.mainProject": "Proyecto principal",
  "about.methodology": "Metodología",
  "about.discord": "Discord",
  "about.join": "Unirse",

  "adev.title": "Augmented Development (A-Dev)",
  "adev.definition":
    "A-Dev es un framework vendor-neutral para orquestar entrega de software asistida por IA.",
  "adev.quote":
    "La IA proporciona velocidad y fuerza bruta; el profesional humano proporciona estándares, intención y gobierno.",
  "adev.pillars": "Pilares",
  "adev.pillar1.title": "Living Baseline",
  "adev.pillar1.desc":
    "Repositorio de restricciones que todo prompt debe leer, actualizado con cada fallo memorable. Cada error se convierte en guardrail, case study, checklist o regla durable.",
  "adev.pillar2.title": "50/50 Quality Cycle",
  "adev.pillar2.desc":
    "La mitad del tiempo se dedica a la creación, la otra mitad a la verificación: Build, Run, Walkthrough, Evidence.",
  "adev.pillar3.title": "Digital Thread",
  "adev.pillar3.desc":
    "Toda feature se vincula a un plan, un prompt y evidencia: Product Feature → Atomic Plan → Prompt → Commit/Test Evidence → Baseline Update.",
  "adev.rules": "Reglas Clave",
  "adev.rules.pr":
    "PR único — cada iteración entrega desde una branch dedicada con un PR atómico",
  "adev.rules.commits":
    "Commits atómicos — Conventional Commits, un cambio por commit",
  "adev.rules.scope":
    "Scope aislado — no mezclar refactor, feature, visual, infra en el mismo PR",
  "adev.rules.validation":
    "Validación angosta — el test/build más pequeño que pruebe el cambio",
  "adev.rules.ci": "CI verde — no se mergea si CI falla",
  "adev.rules.secrets":
    "Sin secretos — nunca almacenar credenciales o tokens en el repo",
  "adev.rules.kiss":
    "KISS — eliminar archivos temporales después de cada tarea",
  "adev.rules.delivery": "Delivery mode — una iteración → un PR por defecto",
  "adev.cycle": "Ciclo Operativo",
  "adev.cycle.1":
    "Inspeccionar — branch, remotes, working tree, cambios upstream",
  "adev.cycle.2": "Fetch & Sync — con origin/main",
  "adev.cycle.3": "Definir scope — exacto para la iteración actual",
  "adev.cycle.4": "Implementar — solo el alcance acordado",
  "adev.cycle.5": "Rollout incremental — oculto → integrado → legacy cleanup",
  "adev.cycle.6": "Validar — test/build más angosto",
  "adev.cycle.7": "Commit atómico → Push → PR con auto-merge",
  "adev.cycle.8": "Verificar en producción post-merge",
  "adev.cycle.9": "Limpiar — branches mergeadas, archivos temporales",
  "adev.starter": "Starter Kit",
  "adev.starter.day0":
    "Esqueleto operativo mínimo: baseline, roadmap, decision log",
  "adev.starter.firstweek": "Primer ciclo completo con evidencia",
  "adev.starter.decisions": "Template de registro de decisiones",
  "adev.starter.checklist": "Checklist 50/50",
  "adev.cta": "Leer la doctrina completa",

  "projects.title": "Proyectos",
  "projects.subtitle": "Software real, MVPs y herramientas de código abierto creadas por la comunidad y organización",
  "projects.status.active": "Activo",
  "projects.status.stale": "Inactivo",
  "projects.language": "Lenguaje",
  "projects.repo": "Código",
  "projects.demo": "Web / Demo",
  "projects.by": "Por",
  "projects.category.all": "Todos",
  "projects.category.community": "Comunidad",
  "projects.category.org": "Organización",

  "events.title": "Eventos",
  "events.subtitle": "Agenda comunitaria de Open Source Santiago",
  "events.upcoming": "Próximos",
  "events.past": "Pasados",
  "events.cta.tickets": "Consegar entradas",
  "events.cta.website": "Ver sitio web",
  "events.cta.volunteers": "Voluntarios",
  "events.countdown": "Faltan",
  "events.days": "días",
  "events.hours": "horas",
  "events.minutes": "minutos",
  "events.seconds": "segundos",

  "members.title": "Miembros",
  "members.subtitle": "Conoce a las personas que hacen posible esta comunidad",
  "members.join.title": "¿Quieres unirte a la comunidad?",
  "members.join.desc":
    "Gestiona tu perfil, conecta tu GitHub y únete a proyectos desde HomeDir.",
  "members.join.cta": "Unirse en HomeDir",
  "members.role.admin": "Administrador",
  "members.role.moderator": "Moderador",
  "members.role.member": "Miembro",

  "common.langSwitch": "Idioma",
};

const en: Messages = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.adev": "ADEV",
  "nav.projects": "Projects",
  "nav.events": "Events",
  "nav.members": "Members",

  "home.title": "Open Source Santiago",
  "home.tagline": "Community, Technology & Purpose — open to the world",
  "home.mission":
    "A community started by organizers in Chile, but designed from its origin as a space open to the world.",
  "home.cta.discord": "Discord",
  "home.cta.github": "GitHub",
  "home.cta.homedir": "HomeDir",
  "home.cta.explore": "Explore HomeDir",
  "home.cta.adev": "Learn ADEV",
  "home.closing": "Welcome to the journey. Here, code transforms people.",
  "home.copyright": "© {year} Open Source Santiago. All rights reserved.",

  "home.event.title": "DevOpsDays Santiago 2026",
  "home.event.date": "September 8-9, 2026",
  "home.event.venue": "Centro de Extensión UC, Santiago, Chile",
  "home.event.cta": "View event",
  "home.event.description":
    "Two days on DevOps, AI, Platform Engineering and Cloud Native.",

  "home.homedir.title": "Flagship Project: HomeDir",
  "home.homedir.description":
    "Community platform for DevRel, Open Source and InnerSource. A hub consolidating events, curated content, gamification and collaboration.",
  "home.homedir.f1.title": "Events & CFP",
  "home.homedir.f1.desc":
    "Conference management, Call for Papers, volunteers and agenda.",
  "home.homedir.f2.title": "Reputation & Gamification",
  "home.homedir.f2.desc":
    "XP, HCoin, classes and leaderboards to recognize contributions.",
  "home.homedir.f3.title": "Community",
  "home.homedir.f3.desc":
    "Curated content with community voting and member directory.",
  "home.homedir.f4.title": "GitHub Trending",
  "home.homedir.f4.desc": "Trending repository discovery with smart caching.",

  "home.adev.title": "ADEV Methodology",
  "home.adev.description":
    "Augmented Development (A-Dev) is our AI-assisted development methodology. A vendor-neutral framework to orchestrate software delivery with discipline, quality and traceability.",
  "home.adev.pillar1": "Living Baseline",
  "home.adev.pillar1.desc":
    "Constraints every prompt must read, updated with each failure.",
  "home.adev.pillar2": "50/50 Quality Cycle",
  "home.adev.pillar2.desc": "Half the time on creation, half on verification.",
  "home.adev.pillar3": "Digital Thread",
  "home.adev.pillar3.desc":
    "Every feature links to a plan, prompt and evidence.",

  "home.projects.title": "Projects",
  "home.projects.subtitle": "OS Santiago ecosystem showcase",
  "home.projects.cta": "View all",

  "home.community.title": "Community",
  "home.community.discord": "Chat with the community",
  "home.community.github": "Repositories and projects",
  "home.community.homedir": "Community platform",
  "home.community.members": "Community directory",

  "about.title": "About Open Source Santiago",
  "about.mission":
    "Open Source Santiago is a community started by organizers in Chile, but designed from its origin as a space open to the world. Our purpose is to build a meeting point for people of different cultures, languages and backgrounds who see open source as a tool to generate knowledge, collaboration and social transformation.",
  "about.founded": "Founded",
  "about.mainProject": "Main project",
  "about.methodology": "Methodology",
  "about.discord": "Discord",
  "about.join": "Join",

  "adev.title": "Augmented Development (A-Dev)",
  "adev.definition":
    "A-Dev is a vendor-neutral framework for orchestrating AI-assisted software delivery.",
  "adev.quote":
    "AI provides speed and brute force; the human professional provides standards, intent and governance.",
  "adev.pillars": "Pillars",
  "adev.pillar1.title": "Living Baseline",
  "adev.pillar1.desc":
    "A repository of constraints every prompt must read, updated with each memorable failure. Each error becomes a guardrail, case study, checklist item, or durable rule.",
  "adev.pillar2.title": "50/50 Quality Cycle",
  "adev.pillar2.desc":
    "Half the time is dedicated to creation, the other half to verification: Build, Run, Walkthrough, Evidence.",
  "adev.pillar3.title": "Digital Thread",
  "adev.pillar3.desc":
    "Every feature links to a plan, a prompt and evidence: Product Feature → Atomic Plan → Prompt → Commit/Test Evidence → Baseline Update.",
  "adev.rules": "Key Rules",
  "adev.rules.pr":
    "Single PR — each iteration ships from a dedicated branch with an atomic PR",
  "adev.rules.commits":
    "Atomic commits — Conventional Commits, one change per commit",
  "adev.rules.scope":
    "Isolated scope — no mixing refactor, feature, visual, infra in the same PR",
  "adev.rules.validation":
    "Narrow validation — the smallest test/build that proves the change",
  "adev.rules.ci": "Green CI — no merge if CI fails",
  "adev.rules.secrets":
    "No secrets — never store credentials or tokens in the repo",
  "adev.rules.kiss": "KISS — remove temporary files after each task",
  "adev.rules.delivery": "Delivery mode — one iteration → one PR by default",
  "adev.cycle": "Operative Cycle",
  "adev.cycle.1": "Inspect — branch, remotes, working tree, upstream changes",
  "adev.cycle.2": "Fetch & Sync — with origin/main",
  "adev.cycle.3": "Define scope — exact for the current iteration",
  "adev.cycle.4": "Implement — only the agreed scope",
  "adev.cycle.5": "Incremental rollout — hidden → integrated → legacy cleanup",
  "adev.cycle.6": "Validate — narrowest test/build",
  "adev.cycle.7": "Atomic commit → Push → PR with auto-merge",
  "adev.cycle.8": "Verify in production post-merge",
  "adev.cycle.9": "Clean up — merged branches, temporary files",
  "adev.starter": "Starter Kit",
  "adev.starter.day0":
    "Minimal operational skeleton: baseline, roadmap, decision log",
  "adev.starter.firstweek": "First complete cycle with evidence",
  "adev.starter.decisions": "Decision log template",
  "adev.starter.checklist": "50/50 checklist",
  "adev.cta": "Read the full doctrine",

  "projects.title": "Projects",
  "projects.subtitle": "Real open-source software, MVPs and tools built by our community members and core team",
  "projects.status.active": "Active",
  "projects.status.stale": "Stale",
  "projects.language": "Language",
  "projects.repo": "Code",
  "projects.demo": "Web / Demo",
  "projects.by": "By",
  "projects.category.all": "All",
  "projects.category.community": "Community",
  "projects.category.org": "Organization",

  "events.title": "Events",
  "events.subtitle": "Open Source Santiago community agenda",
  "events.upcoming": "Upcoming",
  "events.past": "Past",
  "events.cta.tickets": "Get tickets",
  "events.cta.website": "Visit website",
  "events.cta.volunteers": "Volunteers",
  "events.countdown": "Countdown",
  "events.days": "days",
  "events.hours": "hours",
  "events.minutes": "minutes",
  "events.seconds": "seconds",

  "members.title": "Members",
  "members.subtitle": "Meet the people who make this community possible",
  "members.join.title": "Want to join the community?",
  "members.join.desc":
    "Manage your profile, connect your GitHub and join projects from HomeDir.",
  "members.join.cta": "Join at HomeDir",
  "members.role.admin": "Admin",
  "members.role.moderator": "Moderator",
  "members.role.member": "Member",

  "common.langSwitch": "Language",
};

export const messages: Record<Locale, Messages> = { es, en };
