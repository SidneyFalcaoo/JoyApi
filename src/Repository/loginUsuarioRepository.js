import conexao from "./Connection.js";





export async function LogarUsuario(usuario) {
    const comando = `
    insert into tabela_cliente ( cliente, email, senha, cadastroPessoaFisica ) 
                        values ( ?, ?, ?, ?);
            `;

    const [login] = await conexao.query(comando,[
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.cpf
    ]);

    usuario.id = login.insertId
    return usuario;
}