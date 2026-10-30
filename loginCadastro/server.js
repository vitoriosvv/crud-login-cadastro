/* Sequência confecção dos arquivos cadastro.js e register.js*/
/* -cadastro.js:
    1- Fazer array para guardar dados originais;
    2- Usar do método window em um evento de clique de carregamento de dados DOM
    para guardar de forma assíncrona os dados res em json;
    3- Puxamos novamente o form fora evento click, para comparar em evento de submit:
    o que foi digitado com o que já havia sido digitado;
    4- Se houver igualdade prossegue para guardar em await fetch em uma variável,
    como JSON.strigify
    5- Após var estar concluída, redireciona por window.location.href para register.html,
    com else caso não se conclua
*/
/* -register.js:
    1- Em uma async function, faz busca no mysql por await fetch em uma var e await res em outra;
    2- Seleciona ul pré-existente no html, limpa para evitar duplicação;
    3- Percorre o que foi digitado por usuários, cria documento li e imprime conteúdo interno à li:
    `
            <span>ID: ${user.id} | Nome: ${user.nome} - E-mail: ${user.email}</span>
            <div class="acoes-div"> <!-- Sua div existente -->
                <button onclick="deletarRegistro(${user.id})" class="btn-excluir">Excluir</button>
            </div>
        `
    4- Define il como append.child de ul;
    5- Saindo do async, faz outra async para deletar dados por id começando por:
    - if de confirmação de deletação
    - se confirmado faz await fetch com método necessário
    - atualiza lista;
    6- Executa Listagem com página aberta, com window e eventListener sseguido de:
    - carregamento conteúdos DOM e chamada da função async de início
*/