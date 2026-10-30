const loginForm = document.querySelector('#loginForm');

document.querySelectorAll('.mostrar-senha').forEach((botao) => {
    botao.addEventListener('click', () => {
        const campo = document.getElementById(botao.dataset.alvo);
        if (!campo) return;
        const visivel = campo.type === 'password';
        campo.type = visivel ? 'text' : 'password';
        botao.setAttribute('aria-pressed', String(visivel));
        botao.setAttribute('aria-label', visivel ? 'Ocultar senha' : 'Mostrar senha');
    });
});

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.querySelector('#useremail').value.trim().toLowerCase();

        if (!/^[^\s@]+@gmail\.com$/.test(email)) {
            alert('Use um email que termine com @gmail.com.');
            return;
        }

        alert('Login realizado com sucesso!');
    });
}

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector('.useremail').value;
    const senha = document.getElementById('password').value;

    await fetch('/api/temp-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    window.location.href = '../pages/cadastro.html'
});