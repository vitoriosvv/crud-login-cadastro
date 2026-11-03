/* Sequência confecção do arquivo register.js*/
/* -register.js:
        -Criar eventListener do método window;
        -Dentro dele criar var para puxar lista acesso via DOM;
        -Criar um if com um trycatch interno no qual:
        -- espera resposta e usuários via fetch e json pelas rotas corretas,
        -- analisa via if length se o usuário já na existe no cadastro,
        -- cria estrutura interface para o ul:
        let html = `
                <table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr>
                            <th>ID Operação</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            usuarios.forEach(user => {
                html += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="excluirRegistro(${user.id})">Excluir</button>
                            <button onclick="solicitarAlteracao(${user.id})">Alterar</button>
                        </td>
                    </tr>
                `;
            });

            html += '</tbody></table>';
            container.innerHTML = html;
        - Cria async function excluirRegistro com:
        -- if para verificar resposta de confirm,
        -- após confirm usa await fetch, a detecção de rota e method DELETE,
        -- procura resultado por await json,
        -- emite alert de exclusão,
        -- dá location.reload()
        - Cria async function solicitarAlteracao com parametro id e com:
        -- verificação da senha do usuário,
        -- faz trycatch com await fetch numa var resposta,
        -- aguarda resposta pelo await json,
        -- validacao id se resultado.valido se for:
        -- window.location encaminha para: `cadastro.html?id=${id}&modo=editar`;
        -- senão, alerta resultado errado para mensagem
*/