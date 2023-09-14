import conexao from './Connection.js';



export async function Logar (email, senha) {
    const comando = `
            select adm_id,
                        nome,
                        email
                from tabela_adm
                where email = ?
                and senha = ?
        `;

    const [resp] = await conexao.query(comando, [email, senha]);
    return resp[0];
}