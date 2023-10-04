import conexao from './Connection.js';


export async function Logar(email, senha) {
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
};








export async function AdicionarProduto(produto) {
    const comando = `
            insert into tabela_produtos ( nome, preco, categoria_id, estoque, composicao, detalhes )
                                 values ( ?, ?, ?, ?, ?, ?)
    `;

    const [resposta] = await conexao.query(comando, 
        [
            produto.nome,
            produto.preco,
            produto.categoria,
            produto.estoque,
            produto.composicao,
            produto.detalhes
        ])      

        produto.id = resposta.insertId;
        return produto;
};







export async function Consultar(busca) {
    const comando = `
        select  	produto_id,
                    nome,
                    preco,
                    categoria_id,
                    estoque,
                    composicao,
                    detalhes
        from	    tabela_produtos
        where	    nome like ?
        or          composicao like ?
        or          detalhes like ?
    `;

    const [ dados ] = await conexao.query(comando, [
         
        '%' + busca + '%',
        '%' + busca + '%',
        '%' + busca + '%'

    ]);

    return dados;
};









export async function Categoria(categoria) {
    const comando = `
            insert into tabela_categoria ( categoria )
                          values ( ? )
        `;

    const [resposta] = await conexao.query(comando, [
        categoria.categoria
    ]);

    categoria.id = resposta.insertId;
    return categoria;
};




export async function AlterarCategoria(id, categoria) {
    const comando = `
            update	    tabela_categoria
            set	        categoria = ?
            where	    categoria_id = ?
    `;


    const [ dados ] = await conexao.query(comando,[
        categoria,
        id
    ]);

    return dados.affectedRows;
}









export async function BuscarTudo() {
    const comando = `
        select	    categoria_id,
                    categoria
        from	    tabela_categoria
    `;

    const [ dados ] = await conexao.query(comando);
    return dados;
}









export async function ConsultarCategoria(busca) {
    const comando = `
            select 	        categoria_id,
                            categoria
            from            tabela_categoria
            where	        categoria like ?
            `;


    const [ dados ] = await conexao.query(comando, [
        '%' + busca + '%'
    ]);

    return dados;
};








export async function SubCategoria(SubCategoria) {
    const comando = `
    insert into tabela_subCategoria ( categoriaSub )
	                         values (?)
        `;


    const [ dados ] = await conexao.query(comando, [
        SubCategoria.subcategoria
    ]);


    SubCategoria.id = dados.insertId
    return SubCategoria;
};







export async function ConsultarSubCategoria(busca) {
    const comando = `
        select 	        subCategoria_id,
                        categoriaSub
        from 	        tabela_subCategoria
        where	        categoriaSub like ?
    `;

    const [ dados ] = await conexao.query(comando, [
        '%' + busca + '%'
    ]);

    return dados;
};








export async function InserirImg(imagem) {
    const comando = `
        insert into tabela_imagem  ( imagem )
                        values (?)
    `;


    const [ dados ] = await conexao.query(comando, [
        imagem
    ]);

    dados.affectedRows;
}








export async function Alterar(id, produto) {
    const comando = `
            update      tabela_produtos
            set         categoria_id = ?,
		                nome = ?,
                        preco = ?,
                        estoque = ?,
                        composicao = ?,
                        detalhes = ?
            where       produto_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        produto.categoria,
        produto.nome,
        produto.preco,
        produto.estoque,
        produto.composicao,
        produto.detalhes,
        id
    ]);

    return dados.affectedRows;
};








export async function Deletar(id) {
    const comando = `
        delete from  tabela_produtos
              where  produto_id = ?
    `;


    const [ dados ] = await conexao.query(comando, [id])
    return dados.affectedRows
};







export async function BuscarTodosProdutos() {
    const comando = `
        select          p.produto_id,
                        p.categoria_id,
                        p.nome,
                        p.preco,
                        p.disponivel,
                        p.estoque,
                        p.detalhes,
                        p.composicao
        from            tabela_produtos as p
        inner           join tabela_categoria  as c
        on              p.categoria_id = c.categoria_id
        order by 		p.produto_id
    `;


    const [ dados ] = await conexao.query(comando);;
    return dados;
};








export async function BuscarPorId(id) {
    const comando = `
        select      	p.produto_id,
				        p.categoria_id,
				        p.nome,
				        p.preco,
				        p.disponivel,
				        p.estoque,
				        p.detalhes,
				        p.composicao
        from            tabela_produtos as p
        inner           join tabela_categoria  as c
        on              p.categoria_id = c.categoria_id
        where           produto_id = ?
        order by        produto_id
        `;


    const [ dados ] = await conexao.query(comando, [id]);
    return dados;
};






export async function Pedidos(pedido) {
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







export async function ConsultarPedido(busca) {
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





export async function DeletarPedido(id) {
    const comando = `
        delete from     tabela_pedidos
        where           pedido_id = ?
        `;

    
    const [ dados ] = await conexao.query(comando, [id])
    return dados.affectedRows
};










export async function ConsultarPedidos() {
    const comando = `
        select 	    pedido_id,
                    cliente_id,
                    produto_id,
                    codigoProduto,
                    formaPagamento,
                    parcelas,
                    pedidoEntrega,
                    situacao,
                    garantia
        from        tabela_pedidos
        `;

        const [ dados ] = await conexao.query(comando);
        return dados;
};








export async function ConsultarPedidosId(id) {
    const comando = `
        select 	    pedido_id,
                    cliente_id,
                    produto_id,
                    codigoProduto,
                    formaPagamento,
                    parcelas,
                    pedidoEntrega,
                    situacao,
                    garantia
        from        tabela_pedidos
        where       pedido_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [ id ]);
    return dados.affectedRows;
}