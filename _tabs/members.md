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
      <h2>Únete a la comunidad!</h2>
      <p>Genera tu propio perfil y envía un Pull Request para aparecer en esta lista.</p>
    </header>

    <div class="grid grid-2">
      <!-- Form Column -->
      <div>
        <form id="memberForm" class="member-form" data-existing-emails='{{ site.data.members.members | map: "userId" | jsonify | escape }}'>
          <div class="form-group">
            <label for="displayName" class="form-label">Nombre para mostrar</label>
            <input type="text" id="displayName" class="form-input" placeholder="Ej: Juan Pérez">
          </div>
          
          <div class="form-group">
            <label for="githubUser" class="form-label">Usuario de GitHub</label>
            <input type="text" id="githubUser" class="form-input" placeholder="Ej: jperez">
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email (ID único)</label>
            <input type="email" id="email" class="form-input" placeholder="email@ejemplo.com">
          </div>

           <div class="form-group">
            <label for="role" class="form-label">Rol</label>
            <select id="role" class="form-select">
                <option value="miembro">Miembro</option>
                <option value="contributor">Colaborador</option>
                <option value="developer">Developer</option>
                <option value="platform_engineer">Platform Engineer / SRE</option>
                <option value="devops">DevOps / DevSecOps</option>
                <option value="ai_specialist">AI Specialist</option>
                <option value="speaker">Speaker</option>
                <option value="it_professional">Profesional de TI</option>
            </select>
          </div>
        </form>
      </div>

      <!-- Preview Column -->
      <div>
        <h3 class="preview-title">Vista Previa</h3>
        <div class="metric-item preview-card preview-dimmed" id="previewCard">
            <div class="metric-header">
                <div class="member-header-content">
                    <img id="previewAvatar" src="https://github.com/github.png" alt="Avatar" class="member-avatar">
                    <div>
                        <strong id="previewName">Tu Nombre</strong>
                        <br><small id="previewRole">Miembro</small>
                    </div>
                </div>
                <a id="previewLink" href="#" target="_blank" class="member-github-link">
                    <i class="fab fa-github fa-lg"></i>
                </a>
            </div>
        </div>
      </div>
    </div>

    <div class="steps-container">
        <h3 class="steps-title">Pasos para unirte</h3>
        <ol class="steps-list">
            <li>Completa el formulario de arriba.</li>
            <li>Haz clic en <strong>Generar y Copiar</strong>.</li>
            <li>Se abrirá GitHub en una nueva pestaña.</li>
            <li>Pega el código copiado al final del archivo y crea un Pull Request.</li>
        </ol>
        <button id="generateBtn" class="generate-btn">
            Generar y Copiar YAML
        </button>
    </div>

  </section>


  <!-- Notification Toast -->
  <div id="toast" class="toast-notification">
    <span id="toastMessage">Mensaje por defecto</span>
  </div>

  <!-- Success Modal -->
  <div id="successModal" class="success-modal">
    <div class="modal-content">
      <h3 class="modal-title">¡Código Copiado!</h3>
      <p class="modal-text">El código YAML ha sido copiado a tu portapapeles.</p>
      
      <div class="modal-steps-box">
        <strong class="modal-steps-title">Siguientes pasos:</strong>
        <ol class="modal-steps-list">
            <li>Serás redirigido al editor de GitHub.</li>
            <li>Pega el código al final del archivo.</li>
            <li>Selecciona "Commit changes" y luego "Create Pull Request".</li>
        </ol>
      </div>

      <div class="modal-actions">
        <button id="cancelBtn" class="modal-btn-cancel">Cancelar</button>
        <button id="confirmBtn" class="modal-btn-confirm">Ir a GitHub</button>
      </div>
    </div>
  </div>

<script src="/assets/js/members.js"></script>
</main>
</div>
