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
  "home.tagline": "Comunidad, Código Abierto y Colaboración Real — Abiertos al Mundo",
  "home.mission":
    "Espacio comunitario de desarrolladores, ingenieros y creadores. Impulsamos proyectos reales de código abierto, compartimos conocimiento práctico y fomentamos la cultura DevOps y el desarrollo aumentado con rigor e inclusión.",
  "home.cta.discord": "Discord",
  "home.cta.github": "GitHub",
  "home.cta.homedir": "HomeDir",
  "home.cta.explore": "Explorar HomeDir",
  "home.cta.adev": "Conocer ADEV",
  "home.closing": "Bienvenid@ a la comunidad. Aquí el código abierto transforma proyectos y personas.",
  "home.copyright": "© {year} Open Source Santiago. Comunidad sin fines de lucro abierta a todos.",

  "home.event.title": "DevOpsDays Santiago 2026",
  "home.event.date": "8 y 9 de Septiembre, 2026",
  "home.event.venue": "Centro de Extensión UC — Santiago, Chile",
  "home.event.cta": "Ver detalles y agenda",
  "home.event.description":
    "El principal encuentro sobre DevOps, Platform Engineering, Cloud Native e Inteligencia Artificial en Chile. Charlas técnicas, talleres prácticos y networking con la comunidad.",

  "home.homedir.title": "Proyecto Central: HomeDir",
  "home.homedir.description":
    "Hub comunitario de DevRel, Open Source e InnerSource. Plataforma que centraliza eventos, contenido técnico curado, voluntariado, gamificación y colaboración abierta.",
  "home.homedir.f1.title": "Eventos & CFP",
  "home.homedir.f1.desc":
    "Gestión integral de conferencias, Call for Papers, convocatorias de voluntarios y agenda comunitaria.",
  "home.homedir.f2.title": "Reputación & Aporte",
  "home.homedir.f2.desc":
    "Reconocimiento de contribuciones mediante sistema de XP, misiones comunitarias y tableros colaborativos.",
  "home.homedir.f3.title": "Comunidad Abierta",
  "home.homedir.f3.desc":
    "Espacio de debate, recursos técnicos votados por la comunidad y directorio activo de miembros.",
  "home.homedir.f4.title": "Radar Open Source",
  "home.homedir.f4.desc":
    "Monitoreo y descubrimiento de repositorios y tendencias de la comunidad de desarrollo.",

  "home.adev.title": "Metodología ADEV",
  "home.adev.description":
    "Augmented Development (A-Dev) es nuestro marco de trabajo abierto para desarrollo de software asistido por IA: estándares rigurosos, trazabilidad total y control humano en cada iteración.",
  "home.adev.pillar1": "Living Baseline",
  "home.adev.pillar1.desc":
    "Repositorio vivo de restricciones y lecciones aprendidas que guía a los agentes y desarrolladores.",
  "home.adev.pillar2": "Ciclo 50/50",
  "home.adev.pillar2.desc":
    "La mitad del esfuerzo se enfoca en la construcción, y la otra mitad en validación estricta y pruebas.",
  "home.adev.pillar3": "Digital Thread",
  "home.adev.pillar3.desc":
    "Trazabilidad ininterrumpida: cada cambio se vincula a un plan atómico, prompt y evidencia de testeo.",

  "home.projects.title": "Proyectos",
  "home.projects.subtitle": "Software funcional, MVPs y librerías creadas por los miembros de nuestra comunidad",
  "home.projects.cta": "Ver todos los proyectos",

  "home.community.title": "Comunidad",
  "home.community.discord": "Únete a nuestro servidor de Discord",
  "home.community.github": "Explora nuestros repositorios en GitHub",
  "home.community.homedir": "Plataforma comunitaria HomeDir",
  "home.community.members": "Directorio de colaboradores y miembros",

  "about.title": "Acerca de Open Source Santiago",
  "about.mission":
    "Open Source Santiago es una comunidad técnica sin fines de lucro nacida en Chile con vocación global. Nuestro propósito es construir un punto de encuentro para desarrolladores, estudiantes y profesionales que ven en el software libre una herramienta fundamental para compartir conocimiento, elevar el nivel técnico de la región y generar impacto social a través del código.",
  "about.founded": "Año de Fundación",
  "about.mainProject": "Plataforma Principal",
  "about.methodology": "Marco Metodológico",
  "about.discord": "Comunidad Discord",
  "about.join": "Únete ahora",

  "adev.title": "Augmented Development (A-Dev)",
  "adev.definition":
    "A-Dev es un marco de trabajo neutral para orquestar la entrega de software asistida por IA con disciplina de ingeniería, trazabilidad y control de calidad.",
  "adev.quote":
    "La IA entrega velocidad y capacidad de generación; el profesional humano aporta criterio, intención, estándares y gobierno.",
  "adev.pillars": "Pilares Fundamentales",
  "adev.pillar1.title": "Living Baseline",
  "adev.pillar1.desc":
    "Repositorio de restricciones y aprendizajes que todo prompt debe consultar. Cada fallo se documenta y se convierte en guardrail, checklist o regla permanente para evitar regresiones.",
  "adev.pillar2.title": "Ciclo de Calidad 50/50",
  "adev.pillar2.desc":
    "Equilibrio estricto: el 50% del tiempo se dedica a implementar y el 50% restante a verificar: Build, Ejecución, Walkthrough y Evidencia comprovable.",
  "adev.pillar3.title": "Digital Thread (Hilo Digital)",
  "adev.pillar3.desc":
    "Trazabilidad completa de extremo a extremo: Requerimiento → Plan Atómico → Prompt de Contexto → Commit & Test de Validación → Actualización de Baseline.",
  "adev.rules": "Principios Operativos",
  "adev.rules.pr":
    "PR Único — Cada iteración o mejora se entrega desde una rama dedicada con un Pull Request atómico.",
  "adev.rules.commits":
    "Commits Atómicos — Mensajes bajo Conventional Commits, con un único cambio lógico por commit.",
  "adev.rules.scope":
    "Alcance Aislado — Prohibido mezclar refactorización, funcionalidades nuevas, estilos e infraestructura en el mismo PR.",
  "adev.rules.validation":
    "Validación Focalizada — Ejecución de la prueba o build más específico que verifique el cambio introducido.",
  "adev.rules.ci": "CI en Verde — Ningún cambio se integra si la integración continua presenta advertencias o fallos.",
  "adev.rules.secrets":
    "Cero Secretos — Nunca commitear credenciales, API keys ni variables sensibles en el repositorio.",
  "adev.rules.kiss":
    "Simplicidad (KISS) — Limpieza inmediata de ramas temporales, archivos basura y código en desuso.",
  "adev.rules.delivery": "Modo Entrega Continua — Una tarea definida se traduce en un Pull Request concreto y testeado.",
  "adev.cycle": "Ciclo de Trabajo Paso a Paso",
  "adev.cycle.1": "1. Inspeccionar — Revisar rama actual, remotes, working tree y cambios en upstream.",
  "adev.cycle.2": "2. Sincronizar — Traer y rebasar sobre origin/main limpio.",
  "adev.cycle.3": "3. Definir Alcance — Acotar con exactitud el objetivo de la iteración.",
  "adev.cycle.4": "4. Implementar — Desarrollar únicamente lo acordado para la tarea.",
  "adev.cycle.5": "5. Rollout Gradual — Introducir cambio → Integrar funcionalmente → Limpiar código legado.",
  "adev.cycle.6": "6. Validar — Ejecutar linting, chequeo de tipos y build de producción local.",
  "adev.cycle.7": "7. Integrar — Commit semántico, push y creación de Pull Request con descripción clara.",
  "adev.cycle.8": "8. Verificación — Comprobar funcionamiento post-merge en el entorno productivo.",
  "adev.cycle.9": "9. Limpieza — Eliminar ramas locales y temporales ya mergeadas.",
  "adev.starter": "Plantillas y Guías de Inicio",
  "adev.starter.day0":
    "Estructura inicial del proyecto: baseline, roadmap técnico y registro de decisiones.",
  "adev.starter.firstweek": "Guía práctica para completar el primer ciclo de desarrollo con evidencia.",
  "adev.starter.decisions": "Plantilla estandarizada para el registro de decisiones de arquitectura (ADR).",
  "adev.starter.checklist": "Lista de chequeo para validación del ciclo de calidad 50/50.",
  "adev.cta": "Explorar el repositorio oficial de ADEV",

  "projects.title": "Proyectos de la Comunidad",
  "projects.subtitle":
    "Software funcional, herramientas y proyectos de código abierto impulsados por miembros y colaboradores de Open Source Santiago",
  "projects.status.active": "Activo",
  "projects.status.stale": "Mantenimiento",
  "projects.language": "Lenguaje",
  "projects.repo": "Código",
  "projects.demo": "Web / Demo",
  "projects.by": "Por",
  "projects.category.all": "Todos",
  "projects.category.community": "Comunidad",
  "projects.category.org": "Organización",

  "events.title": "Eventos & Meetups",
  "events.subtitle": "Agenda comunitaria, encuentros presenciales y memoria visual de Open Source Santiago",
  "events.upcoming": "Próximos Eventos",
  "events.past": "Eventos Anteriores",
  "events.pastEvents": "Eventos Realizados",
  "events.gallery": "Registro Fotográfico",
  "events.viewDetails": "Ver Galería & Fotos",
  "events.backToEvents": "Volver a Eventos",
  "events.photoCount": "fotos",
  "events.notFound": "Evento no encontrado",
  "events.cta.tickets": "Conseguir entradas",
  "events.cta.website": "Sitio oficial",
  "events.cta.volunteers": "Sumarme como voluntario",
  "events.countdown": "Cuenta regresiva",
  "events.days": "días",
  "events.hours": "horas",
  "events.minutes": "minutos",
  "events.seconds": "segundos",

  "members.title": "Miembros & Colaboradores",
  "members.subtitle": "Personas que participan, crean y dan vida a la comunidad Open Source Santiago",
  "members.join.title": "¿Quieres sumarte y colaborar?",
  "members.join.desc":
    "Crea tu perfil en HomeDir, conecta tu cuenta de GitHub, participa en proyectos activos y comparte tus iniciativas con la comunidad.",
  "members.join.cta": "Ingresar a HomeDir",
  "members.role.admin": "Organizador",
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
  "home.tagline": "Community, Open Source & Real Collaboration — Open to the World",
  "home.mission":
    "An open community of developers, engineers, and creators. We build functional open-source software, share practical knowledge, and advance DevOps culture and augmented engineering with rigor and inclusivity.",
  "home.cta.discord": "Discord",
  "home.cta.github": "GitHub",
  "home.cta.homedir": "HomeDir",
  "home.cta.explore": "Explore HomeDir",
  "home.cta.adev": "Explore ADEV",
  "home.closing": "Welcome to the community. Here, open-source code transforms projects and people.",
  "home.copyright": "© {year} Open Source Santiago. Non-profit community open to everyone.",

  "home.event.title": "DevOpsDays Santiago 2026",
  "home.event.date": "September 8-9, 2026",
  "home.event.venue": "Centro de Extensión UC — Santiago, Chile",
  "home.event.cta": "View event & agenda",
  "home.event.description":
    "The leading conference on DevOps, Platform Engineering, Cloud Native and AI in Chile. Keynotes, hands-on workshops, and community networking across LATAM.",

  "home.homedir.title": "Core Project: HomeDir",
  "home.homedir.description":
    "Community platform for DevRel, Open Source and InnerSource. Central hub for events, curated technical content, volunteering, gamification, and open collaboration.",
  "home.homedir.f1.title": "Events & CFP",
  "home.homedir.f1.desc":
    "End-to-end conference management, Call for Papers, volunteer onboarding, and community schedules.",
  "home.homedir.f2.title": "Reputation & Badges",
  "home.homedir.f2.desc":
    "Contributor recognition via XP, community quests, and collaborative leaderboards.",
  "home.homedir.f3.title": "Open Community",
  "home.homedir.f3.desc":
    "Discussion space, community-voted technical resources, and an active member directory.",
  "home.homedir.f4.title": "Open Source Radar",
  "home.homedir.f4.desc":
    "Discovery and tracking of trending repositories and emerging tech tools.",

  "home.adev.title": "ADEV Methodology",
  "home.adev.description":
    "Augmented Development (A-Dev) is our vendor-neutral framework for AI-assisted software delivery: rigorous standards, complete traceability, and human control in every iteration.",
  "home.adev.pillar1": "Living Baseline",
  "home.adev.pillar1.desc":
    "A living repository of constraints and lessons learned that guides agents and developers.",
  "home.adev.pillar2": "50/50 Quality Cycle",
  "home.adev.pillar2.desc":
    "Equal split: half the time focused on implementation, the other half on strict verification and testing.",
  "home.adev.pillar3": "Digital Thread",
  "home.adev.pillar3.desc":
    "Unbroken traceability: every change connects to an atomic plan, prompt, and test evidence.",

  "home.projects.title": "Projects",
  "home.projects.subtitle": "Functional software, MVPs, and tools built by our community members",
  "home.projects.cta": "View all projects",

  "home.community.title": "Community",
  "home.community.discord": "Join our Discord server",
  "home.community.github": "Explore our GitHub repositories",
  "home.community.homedir": "HomeDir community platform",
  "home.community.members": "Community member directory",

  "about.title": "About Open Source Santiago",
  "about.mission":
    "Open Source Santiago is a non-profit technical community founded in Chile with global reach. Our purpose is to build a collaborative space for developers, students, and professionals who see open-source software as a vital tool to share knowledge, elevate engineering craftsmanship in the region, and create social impact through code.",
  "about.founded": "Founded In",
  "about.mainProject": "Flagship Platform",
  "about.methodology": "Engineering Framework",
  "about.discord": "Discord Community",
  "about.join": "Join us now",

  "adev.title": "Augmented Development (A-Dev)",
  "adev.definition":
    "A-Dev is a vendor-neutral framework for orchestrating AI-assisted software delivery with engineering discipline, full traceability, and quality control.",
  "adev.quote":
    "AI provides speed and generation capacity; the human engineer provides judgment, intent, standards, and governance.",
  "adev.pillars": "Core Pillars",
  "adev.pillar1.title": "Living Baseline",
  "adev.pillar1.desc":
    "A constraints and lessons repository that every prompt must reference. Every failure is documented and transformed into a guardrail, checklist item, or durable rule to prevent regressions.",
  "adev.pillar2.title": "50/50 Quality Cycle",
  "adev.pillar2.desc":
    "Strict balance: 50% of time spent on creating, 50% on verifying: Build, Execution, Walkthrough, and provable Evidence.",
  "adev.pillar3.title": "Digital Thread",
  "adev.pillar3.desc":
    "End-to-end traceability: Requirement → Atomic Plan → Context Prompt → Validation Commit & Tests → Baseline Update.",
  "adev.rules": "Operating Principles",
  "adev.rules.pr":
    "Single PR — Each iteration or improvement ships from a dedicated branch with an atomic Pull Request.",
  "adev.rules.commits":
    "Atomic Commits — Semantic Conventional Commits, with a single logical change per commit.",
  "adev.rules.scope":
    "Isolated Scope — Never mix refactoring, new features, styling, and infrastructure in the same PR.",
  "adev.rules.validation":
    "Narrow Validation — Run the most targeted test or build that verifies the change introduced.",
  "adev.rules.ci": "Green CI — No changes are merged if continuous integration reports warnings or failures.",
  "adev.rules.secrets":
    "Zero Secrets — Never commit credentials, API keys, or sensitive variables into the codebase.",
  "adev.rules.kiss":
    "Simplicity (KISS) — Immediate cleanup of temporary branches, scratch files, and deprecated code.",
  "adev.rules.delivery": "Continuous Delivery Mode — A defined task translates into a concrete, tested Pull Request.",
  "adev.cycle": "Step-by-Step Workflow",
  "adev.cycle.1": "1. Inspect — Review current branch, remotes, working tree, and upstream changes.",
  "adev.cycle.2": "2. Sync — Fetch and rebase on clean origin/main.",
  "adev.cycle.3": "3. Scope Definition — Narrow down the exact iteration goal.",
  "adev.cycle.4": "4. Implement — Develop only what was scoped for the task.",
  "adev.cycle.5": "5. Incremental Rollout — Introduce change → Integrate functionally → Remove legacy code.",
  "adev.cycle.6": "6. Validate — Run local linting, type checking, and production build.",
  "adev.cycle.7": "7. Integrate — Semantic commit, push, and open Pull Request with clear description.",
  "adev.cycle.8": "8. Verification — Validate production behavior post-merge.",
  "adev.cycle.9": "9. Cleanup — Delete merged local and remote branches.",
  "adev.starter": "Templates and Starter Guides",
  "adev.starter.day0":
    "Initial project skeleton: baseline, technical roadmap, and architectural decision log.",
  "adev.starter.firstweek": "Hands-on guide to complete the first verified development cycle with evidence.",
  "adev.starter.decisions": "Standardized template for Architectural Decision Records (ADR).",
  "adev.starter.checklist": "50/50 quality cycle verification checklist.",
  "adev.cta": "Explore the official ADEV repository",

  "projects.title": "Community Projects",
  "projects.subtitle":
    "Real, functional open-source software and tools built by Open Source Santiago contributors and core team",
  "projects.status.active": "Active",
  "projects.status.stale": "Maintenance",
  "projects.language": "Language",
  "projects.repo": "Code",
  "projects.demo": "Web / Demo",
  "projects.by": "By",
  "projects.category.all": "All",
  "projects.category.community": "Community",
  "projects.category.org": "Organization",

  "events.title": "Events & Meetups",
  "events.subtitle": "Community agenda, in-person meetups, and photo memories from Open Source Santiago",
  "events.upcoming": "Upcoming Events",
  "events.past": "Past Events",
  "events.pastEvents": "Past Events & Meetups",
  "events.gallery": "Photo Gallery",
  "events.viewDetails": "View Gallery & Photos",
  "events.backToEvents": "Back to Events",
  "events.photoCount": "photos",
  "events.notFound": "Event not found",
  "events.cta.tickets": "Get tickets",
  "events.cta.website": "Official website",
  "events.cta.volunteers": "Join as a volunteer",
  "events.countdown": "Countdown",
  "events.days": "days",
  "events.hours": "hours",
  "events.minutes": "minutes",
  "events.seconds": "seconds",

  "members.title": "Members & Contributors",
  "members.subtitle": "People who build, collaborate, and bring the Open Source Santiago community to life",
  "members.join.title": "Want to join and collaborate?",
  "members.join.desc":
    "Create your profile on HomeDir, connect your GitHub account, join active projects, and share your ideas with the community.",
  "members.join.cta": "Join on HomeDir",
  "members.role.admin": "Organizer",
  "members.role.moderator": "Moderator",
  "members.role.member": "Member",

  "common.langSwitch": "Language",
};

export const messages: Record<Locale, Messages> = { es, en };
