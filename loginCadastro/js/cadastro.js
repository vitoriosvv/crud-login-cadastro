const cadastroForm = document.querySelector('#cadastroForm');
const termos = document.querySelector('#termos');

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

if (cadastroForm) {
    cadastroForm.addEventListener('reset', () => {
        document.querySelectorAll('.mostrar-senha').forEach((botao) => {
            const campo = document.getElementById(botao.dataset.alvo);
            if (campo) campo.type = 'password';
            botao.setAttribute('aria-pressed', 'false');
            botao.setAttribute('aria-label', 'Mostrar senha');
        });
    });
}

if (termos) {
    termos.addEventListener('invalid', () => {
        termos.setCustomValidity('É obrigatório aceitar os termos de uso.');
    });

    termos.addEventListener('change', () => {
        termos.setCustomValidity('');
    });
}

if (cadastroForm) {
    cadastroForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const cpfInput = document.querySelector('#useruni').value.trim();
        const cpf = cpfInput.replace(/\D/g, '');
        const dataNascimento = document.querySelector('#datanasc').value;
        const email = document.querySelector('#useremail').value.trim().toLowerCase();
        const senha = document.querySelector('#usersenha1').value;
        const confirmacao = document.querySelector('#usersenha2').value;

        if (!/^\d{11}$/.test(cpf)) {
            alert('O CPF deve conter exatamente 11 números.');
            return;
        }

        if (!dataNascimento) {
            alert('Informe uma data de nascimento válida.');
            return;
        }

        const [ano, mes, dia] = dataNascimento.split('-').map(Number);
        const hoje = new Date();
        const aniversarioPendente = hoje.getMonth() + 1 < mes
            || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia);
        const idade = hoje.getFullYear() - ano - Number(aniversarioPendente);

        if (isNaN(idade) || idade < 0 || idade > 120) {
            alert('A idade deve estar entre 0 e 120 anos.');
            return;
        }

        if (!/^[^\s@]+@gmail\.com$/.test(email)) {
            alert('Use um email que termine com @gmail.com.');
            return;
        }

        if (!/\d/.test(senha) || !/[\p{P}\p{S}]/u.test(senha)) {
            alert('A senha deve conter ao menos um número e um caractere especial.');
            return;
        }

        if (senha !== confirmacao) {
            alert('As senhas não coincidem.');
            return;
        }

        if (termos && !termos.checked) {
            alert('É obrigatório aceitar os termos de uso.');
            return;
        }

        alert('Cadastro realizado com sucesso!');
    });
}
