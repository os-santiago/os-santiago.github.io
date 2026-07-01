---
layout: page
title: ADEV
icon: fas fa-book
order: 3
---

# Augmented Development (A-Dev)

**A-Dev** es un framework vendor-neutral para orquestar entrega de software asistida por IA. Creado por [Sergio Canales](https://github.com/scanalesespinoza), es la doctrina operativa que gobierna el desarrollo con modelos y agentes en Open Source Santiago.

> La IA proporciona velocidad y fuerza bruta; el profesional humano proporciona estándares, intención y gobierno.

---

## Pilares

### 1. Living Baseline
Un repositorio de restricciones que todo prompt debe leer, actualizado con cada fallo memorable. Cada error se convierte en: un guardrail, un case study, un checklist, una actualización del starter kit, o una regla durable.

### 2. 50/50 Quality Cycle
La mitad del tiempo se dedica a la creación, la otra mitad a la verificación:
- **Build** — compilar/ejecutar localmente, feature flags para Live Alpha
- **Run** — tests automatizados + seguridad
- **Walkthrough** — validar con la persona usuaria en mente
- **Evidence** — commit + CI + baseline actualizado

### 3. Digital Thread
Toda feature se vincula a un plan, un prompt y evidencia:
```
Product Feature → Atomic Plan → Prompt → Commit/Test Evidence → Baseline Update
```

---

## Reglas Clave

| Regla | Descripción |
|---|---|
| **PR único** | Cada iteración entrega desde una branch dedicada con un PR atómico |
| **Commits atómicos** | Conventional Commits, un cambio por commit |
| **Scope aislado** | No mezclar refactor, feature, visual, infra, doctrina en el mismo PR |
| **Validación angosta** | El test/build más pequeño que pruebe el cambio |
| **CI verde** | No se mergea si CI falla |
| **Sin secretos** | Nunca almacenar credenciales, tokens o datos personales en el repo |
| **KISS** | Eliminar archivos temporales después de cada tarea |
| **Delivery mode** | Por defecto: una iteración → un PR. Batch solo si se solicita explícitamente |

---

## Ciclo Operativo

1. **Inspeccionar** — branch, remotes, working tree, cambios upstream
2. **Fetch & Sync** — con `origin/main`
3. **Definir scope** — exacto para la iteración actual
4. **Implementar** — solo el alcance acordado
5. **Rollout incremental** — oculto → integrado → legacy cleanup
6. **Validar** — test/build más angosto
7. **Commit atómico** → Push → PR con auto-merge
8. **Verificar en producción** post-merge
9. **Limpiar** — branches mergeadas, archivos temporales

---

## Starter Kit

El [starter kit de ADEV]({{ site.adev_url }}/tree/main/starter-kit) incluye herramientas listas para usar:

| Recurso | Propósito |
|---|---|
| `DAY_0.md` | Esqueleto operativo mínimo: baseline, roadmap, decision log |
| `FIRST_WEEK.md` | Primer ciclo completo con evidencia |
| `DECISION_LOG.md` | Template de registro de decisiones |
| `QUALITY_CYCLE_checklist.md` | Checklist 50/50 |

---

## Multi-Agent Collaboration

Cuando múltiples agentes (humanos y IA) trabajan en el mismo repositorio:

1. Conciencia situacional antes de editar
2. Fetch antes de trabajar
3. Nunca sobrescribir trabajo local no revisado
4. Coordinar ediciones a nivel de archivo
5. Commits atómicos y reversibles
6. Documentar qué agente hizo cada cambio

---

[Leer la doctrina completa →]({{ site.adev_url }}){: .btn .btn-primary}
