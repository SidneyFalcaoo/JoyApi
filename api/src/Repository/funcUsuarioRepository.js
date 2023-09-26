import conexao from "./Connection.js";


export async function LogarUsuario(usuario) {
    const comando = `
            insert into tabela_loginUser ( cliente, email, senha, cadastroPessoaFisica ) 
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
    select  	cliente,
                email,
                senha,
        cadastroPessoaFisica
        from tabela_loginUser
            where email like ?
            or cadastroPessoaFisica like ?
        order 
        by loginUser_id
    `;

    const [ dados ] = await conexao.query(comando, [

            '%' + busca + '%',
            '%' + busca + '%'
    ])

    return dados;
};






export async function LoginUsuario(email, senha) {
    const comando = `
    select  loginUser_id,
            cliente,
            email,
            senha
    from	tabela_loginUser
    where	email = ?
    and	    senha = ?
    `;

    const [ resp ] = await conexao.query(comando, [email, senha]);
    return resp[0];
};








export async function PerfilUser(usuario) {
    const comando = `
            insert into tabela_cliente ( telefone, nascimento ) 
                                values ( ?, ? )
        `;

    const [ resp ] = await conexao.query(comando, [
        usuario.telefone,
        usuario.nascimento
    ]);

    usuario.id = resp.insertId;
    return usuario;
};








export async function ConsultarPerfil(busca) {
    const comando = `
        select	    telefone,
                    nascimento
        from        tabela_cliente
        where       telefone like ?
        `;


    const [ resp ] = await conexao.query(comando, [
        '%' + busca + '%',
    ]);

    return resp;
}