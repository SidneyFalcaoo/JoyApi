import conexao from "./Connection.js";






export async function CriarLogin(login) {
    const comando = `
    insert into tabela_cliente ( cliente, email, senha ) 
                        values ( ?, ?, ?)
    `;

    const [ dados ] = await conexao.query(comando, [
        login.cliente,
        login.email,
        login.senha
    ]);

    login.id = dados.insertId
    return login
};






export async function ConsultarLogin(busca) {
    const comando = `
    select	cliente_id,
            cliente,
            email,
            senha
    from tabela_cliente
    where email like ?
    `;   

    const [ dados ] = await conexao.query(comando, [
        '%' + busca + '%'
    ]);
    return dados;
};





export async function AlterarPerfil(id, usuario) {
    const comando = `
    update tabela_cliente
    set cliente = ?,
        email = ?,
        senha = ?,
        cpf = ?,
        telefone = ?,
        nascimento = ?
  where cliente_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        usuario.cliente,
        usuario.email,
        usuario.senha,
        usuario.cpf,
        usuario.telefone,
        usuario.nascimento,
        id
    ]);

    return dados.affectedRows;  
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






export async function  AdicionarItens(itens) {
    const comando = `
        insert into tabela_pedido_item ( produto_id, pedido_id, itens_quantidade )
                                values ( ?, ?, ? )
    `;

    const [ dados ] = await conexao.query(comando, [
        itens.produto,
        itens.pedido,
        itens.quantidade
    ]);

    itens.id = dados.insertId;
    return dados;
};







export async function AlterarItens(id, itens) {
    const comando = `
        update  tabela_pedido_item
        set	    produto_id = ?,
                pedido_id = ?,
                itens_quantidade = ?
        where   pedido_item_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        itens.produto,
        itens.pedido,
        itens.quantidade,
        id
    ]);

    return dados.affectedRows;
};









export async function DeletarQuantidade(id) {
    const comando = `
        delete from     tabela_pedido_item
        where           pedido_item_id = ?
    `;


    const [ dados ] = await conexao.query(comando, [id]);
    return dados.affectedRows
};      