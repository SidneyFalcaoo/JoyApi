import conexao from "./Connection.js";


export async function LogarUsuario(usuario) {
    const comando = `
    insert into tabela_cliente ( cliente, email, senha, cadastroPessoaFisica ) 
                        values ( ?, ?, ?, ?)
            `;

    const [login] = await conexao.query(comando,[
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.cpf
    ]);

    usuario.id = login.insertId
    return usuario;
};







export async function Consultar(busca) {
    const comando = `
            select	    cliente,
                        email,
                        senha,
                        cadastroPessoaFisica
            from        tabela_cliente
            where       email like ?
            or  cadastroPessoaFisica like ?
            order by    cliente_id
    `;

    const [ dados ] = await conexao.query(comando, [

            '%' + busca + '%',
            '%' + busca + '%'
    ])

    return dados;
};






export async function LoginUsuario(email, senha) {
    const comando = `
            select 	    cliente_id,
                        cliente,
                        email,
                        senha
            from	    tabela_cliente
            where	    email = ?
            and	        senha = ?
    `;

    const [ resp ] = await conexao.query(comando, [email, senha]);
    return resp[0];
};