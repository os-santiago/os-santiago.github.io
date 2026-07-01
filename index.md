---
layout: page
title: Open Source Santiago — Comunidad, Tecnología y Propósito
---

<section class="oss-section hero-section">
  <div class="container">
    <h1>Open Source Santiago</h1>
    <p class="tagline">Comunidad, Tecnología y Propósito — abiertos al mundo</p>
  </div>
</section>

Open Source Santiago es una comunidad iniciada por organizadores en Chile, pero pensada desde su origen como un espacio **abierto al mundo**. Creemos en la tecnología como motor para el desarrollo personal, profesional y comunitario.

---

## 🚀 Proyecto Estrella: HomeDir

[**HomeDir**]({{ site.homedir_url }}) es la plataforma comunitaria de DevRel, Open Source e InnerSource de Open Source Santiago. Un hub que consolida eventos, contenido curado, gamificación y colaboración en un solo lugar.

<div class="feature-grid">
  <div class="feature-card">
    <h3>📅 Eventos & CFP</h3>
    <p>Gestión de conferencias, Call for Papers, voluntarios y agenda con detección de superposición</p>
  </div>
  <div class="feature-card">
    <h3>🏆 Reputación & Gamificación</h3>
    <p>Sistema de XP, HCoin, clases y leaderboards para reconocer contribuciones</p>
  </div>
  <div class="feature-card">
    <h3>📰 Comunidad</h3>
    <p>Contenido curado con votación comunitaria, Lightning Threads y tablero de miembros</p>
  </div>
  <div class="feature-card">
    <h3>🔥 GitHub Trending</h3>
    <p>Descubrimiento de repositorios trending con caché inteligente y actualización programada</p>
  </div>
</div>

<a href="{{ site.homedir_url }}" class="join-btn" style="display:inline-block;margin:1rem 0">Explorar HomeDir →</a>

---

## 📖 Metodología ADEV

[**Augmented Development (A-Dev)**]({{ site.adev_url }}) es nuestra metodología de desarrollo asistido por IA. Un framework vendor-neutral para orquestar entrega de software con disciplina, calidad y trazabilidad.

- **Living Baseline** — restricciones que todo prompt debe leer, actualizadas con cada fallo
- **50/50 Quality Cycle** — mitad del tiempo en creación, mitad en verificación
- **Digital Thread** — toda feature se vincula a un plan, prompt y evidencia

<a href="{{ '/adev/' | relative_url }}" class="join-btn" style="display:inline-block;margin:1rem 0;background:#238636;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;font-weight:600">Conocer ADEV →</a>

---

## 🌟 Top Contribuidores

{% if site.data.contributors and site.data.contributors.contributors %}
<ol class="leaderboard">
{% assign sorted = site.data.contributors.contributors | sort: "contributions" | reverse | slice: 0, 10 %}
{% for c in sorted %}
  <li>
    <span class="rank">#{{ forloop.index }}</span>
    <img class="avatar" src="{{ c.avatar_url }}" alt="{{ c.login }}" width="40" height="40" loading="lazy">
    <span class="login">{{ c.login }}</span>
    <span class="stat">{{ c.contributions }} commits</span>
  </li>
{% endfor %}
</ol>
{% else %}
<p>Leaderboard de contribuidores de <a href="https://github.com/os-santiago">github.com/os-santiago</a> — se actualiza semanalmente.</p>
{% endif %}

---

## 💬 Comunidad

- [Discord](https://discord.gg/3eawzc9ybc) — Conversa con la comunidad
- [GitHub](https://github.com/os-santiago) — Repositorios y proyectos
- [HomeDir]({{ site.homedir_url }}) — Plataforma comunitaria
- [Miembros]({{ '/members/' | relative_url }}) — Directorio de la comunidad

**Bienvenid@ al viaje. Aquí, el código transforma personas.**
