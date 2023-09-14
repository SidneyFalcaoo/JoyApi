import conexao from './Connection.js';



export async function Logar(email, senha) {
    const comando = `
        insert into tabela_adm ( email, senha ) 
	                    values ( ?, ?, ? );
        `;

    const [resp] = conexao.query(comando, [email, senha]);
    return resp[0];
}