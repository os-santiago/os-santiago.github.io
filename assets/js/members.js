document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById('memberForm');
    const form = {
        name: document.getElementById('displayName'),
        github: document.getElementById('githubUser'),
        email: document.getElementById('email'),
        role: document.getElementById('role')
    };

    const preview = {
        name: document.getElementById('previewName'),
        role: document.getElementById('previewRole'),
        avatar: document.getElementById('previewAvatar'),
        link: document.getElementById('previewLink'),
        card: document.getElementById('previewCard')
    };

    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    const modal = document.getElementById('successModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    function showToast(message, isError = false) {
        toastMsg.textContent = message;
        toast.classList.add('toast-visible');

        if (isError) {
            toast.classList.add('toast-error');
        } else {
            toast.classList.remove('toast-error');
        }

        setTimeout(() => {
            toast.classList.remove('toast-visible');
        }, 3000);
    }

    function updatePreview() {
        const name = form.name.value || 'Tu Nombre';
        const github = form.github.value;
        const role = form.role.value;

        preview.name.textContent = name;
        preview.role.textContent = role.charAt(0).toUpperCase() + role.slice(1);

        if (github) {
            preview.avatar.src = `https://avatars.githubusercontent.com/${github}`;
            preview.link.href = `https://github.com/${github}`;
            preview.card.classList.remove('preview-dimmed');
        } else {
            preview.avatar.src = 'https://github.com/github.png';
            preview.card.classList.add('preview-dimmed');
        }
    }

    Object.values(form).forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Get existing emails from data attribute
    const existingEmailsFn = () => {
        const data = formElement.getAttribute('data-existing-emails');
        try {
            return JSON.parse(data) || [];
        } catch (e) {
            console.error('Error parsing existing emails', e);
            return [];
        }
    };
    const existingEmails = existingEmailsFn();

    document.getElementById('generateBtn').addEventListener('click', () => {
        if (!form.name.value || !form.github.value || !form.email.value) {
            showToast('Por favor completa todos los campos', true);
            return;
        }

        const email = form.email.value.trim();
        // Regex for basic email validation (requires @ and domain with dot)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showToast('El email no tiene un formato válido (ej: usuario@dominio.cl)', true);
            return;
        }

        if (existingEmails.includes(email)) {
            showToast('Este email ya está registrado en la comunidad', true);
            return;
        }

        const sanitizeYamlString = (input) => {
            return String(input)
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\r?\n/g, ' ')
                .trim();
        };

        const sanitizedDisplayName = sanitizeYamlString(form.name.value);
        const sanitizedGithub = sanitizeYamlString(form.github.value);
        const sanitizedRole = sanitizeYamlString(form.role.value);
        const now = new Date().toISOString();
        const yaml = `
- userId: "${email}"
  displayName: "${sanitizedDisplayName}"
  github: "${sanitizedGithub}"
  role: "${sanitizedRole}"
  profileUrl: "https://github.com/${sanitizedGithub}"
  avatarUrl: "https://avatars.githubusercontent.com/${sanitizedGithub}"
  joinedAt: "${now}"`;

        navigator.clipboard.writeText(yaml).then(() => {
            modal.classList.add('modal-open');
        });
    });

    confirmBtn.addEventListener('click', () => {
        modal.classList.remove('modal-open');
        window.open('https://github.com/os-santiago/os-santiago.github.io/edit/main/community/members.yaml', '_blank');
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('modal-open');
    });

    // Close modal if clicking outside
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('modal-open');
        }
    };
});
