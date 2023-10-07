import conexao from "./Connection.js";


export async function LoginUsuario(usuario) {
    const comando = `
        insert into tabela_login_cliente ( cliente, email, senha, cpf ) 
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
        select	loginCliente_id,
                cliente,
                email,
                senha,
                cpf
        from	tabela_login_cliente
        where   email like ?
        or cpf  like ?
        order 
        by      cliente_id
    `;

    const [ dados ] = await conexao.query(comando, [

            '%' + busca + '%',
            '%' + busca + '%'
    ])

    return dados;
};






export async function ExcluirLogin(id) {
    const comando = `
        delete from tabela_login_cliente
	    where loginCliente_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [id]);
    return dados.affectedRows;
};









export async function LogarUsuario(email, senha) {
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
        insert into tabela_cliente ( loginCliente_id, telefone, nascimento ) 
                            values ( ?, ?, ? )
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
};






export async function DeletarPerfil(id) {
    const comando = `
        delete from tabela_cliente
	    where cliente_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [id]);
    return dados.affectedRows
}







export async function AdicionarPedidos(pedido) {
    const comando = `
            insert into tabela_pedidos 	( cliente_id, produto_id, codigoProduto, formaPagamento, parcelas, pedidoEntrega, situacao, garantia )
                                values	( ?, ?, ?, ?, ?, ?, ?, ? )
    `;


    const [ dados ] = await conexao.query(comando, [
        pedido.cliente,
        pedido.produto,
        pedido.codigo,
        pedido.pagamento,
        pedido.parcelas,
        pedido.entrega,
        pedido.situacao,
        pedido.garantia
    ]);

    pedido.id = dados.insertId;
    return pedido;
};








export async function ConsultarCodigo(busca) {
    const comando = `
        select	        codigoProduto,
                        formaPagamento,
                        parcelas,
                        pedidoEntrega,
                        situacao,
                        garantia
        from 	        tabela_pedidos
        where 	        codigoProduto like ?
        order 
        by 	            pedido_id
        `;

    
    const [ dados ] = await conexao.query(comando, [
         '%' + busca + '%'
    ]);
    return dados;
};










export async function AlterarPedido(id, pedido) {
    const comando = `
        update      tabela_pedidos
        set         codigoProduto = ?,
                    formaPagamento = ?,
                    parcelas = ?,
                    pedidoEntrega = ?,
                    situacao	 = ?,
                    garantia = ?,
                    cliente_id = ?,
                    produto_id = ?
        where       pedido_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        pedido.codigo,
        pedido.pagamento,
        pedido.parcelas,
        pedido.entrega,
        pedido.situacao,
        pedido.garantia,
        pedido.cliente,
        pedido.produto,
        id
    ]);

    return dados.affectedRows
};









export async function ExcluirPedido(id) {
    const comando = `
        delete from     tabela_pedidos
        where           pedido_id = ?
        `;

    
    const [ dados ] = await conexao.query(comando, [id])
    return dados.affectedRows
};