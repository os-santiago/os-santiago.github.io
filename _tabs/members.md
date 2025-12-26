---
layout: page
title: Miembros
icon: fas fa-users
order: 4
---

<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/members.css">

<div id="open-quest">
<main class="container">
  <h2 class="members-title">Conoce a las personas que hacen posible esta comunidad</h2>

    <div class="grid grid-2">
      {% for member in site.data.members.members %}
      <div class="metric-item">
        <div class="metric-header">
            <div class="member-header-content">
                <img src="{{ member.avatarUrl }}" alt="{{ member.displayName }}" class="member-avatar">
                <div>
                    <strong>{{ member.displayName }}</strong>
                    <br><small>{{ member.role | capitalize }}</small>
                </div>
            </div>
             {% if member.github %}
            <a href="https://github.com/{{ member.github }}" target="_blank" class="member-github-link">
                <i class="fab fa-github fa-lg"></i>
            </a>
            {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>


  <section class="card join-section">
    <header>
      <h2>¿Quieres unirte a la comunidad?</h2>
    </header>
    <div class="join-content">
      <p class="join-description">Gestiona tu perfil, conecta tu GitHub y únete a proyectos desde <strong>HomeDir</strong>.</p>
      <a href="https://homedir.opensourcesantiago.io/comunidad" class="join-btn">
        Unirse en HomeDir
      </a>
    </div>
  </section>

</main>
</div>
