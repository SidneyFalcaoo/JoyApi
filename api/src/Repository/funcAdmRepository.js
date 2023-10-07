import conexao from './Connection.js';


export async function Logar(email, senha) {
    const comando = `
            select      adm_id,
                        nome,
                        email
            from        tabela_adm
            where       email = ?
            and         senha = ?
        `;

    const [resp] = await conexao.query(comando, [email, senha]);
    return resp[0];
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









export async function BuscaCategoria() {
    const comando = `
        select	    categoria_id,
                    categoria
        from	    tabela_categoria
    `;

    const [ dados ] = await conexao.query(comando);
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








export async function BuscarsubCategoria() {
    const comando = `
        select	    subCategoria_id,
                    categoriaSub
        from	    tabela_subCategoria
    `;

    const [ dados ] = await conexao.query(comando);
    return dados;
};








export async function AdicionarProduto(produto) {
    const comando = `
        insert into tabela_produtos ( nome, preco, estoque, disponivel, composicao, detalhes, categoria_id, subCategoria_id, imagem_produto_id )
                             values ( ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [resposta] = await conexao.query(comando, 
        [
            produto.nome,
            produto.preco,
            produto.estoque,
            produto.disponivel,
            produto.composicao,
            produto.detalhes,
            produto.categoria,
            produto.SubCategoria,
            produto.imagem_id
        ]);      

        produto.id = resposta.insertId;
        return produto;
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
};






export async function ExcluirImg(id) {
    const comando = `
    delete from	tabela_imagem
    where    imagem_produto_id = ?
    `;


    const [ dados ] = await conexao.query(comando, [id]);
    return dados.affectedRows
};








export async function ConsultarProduto(busca) {
    const comando = `
        select 	    produto_id,
                    nome,
                    preco,
                    estoque,
                    composicao,
                    detalhes,
                    subCategoria_id,
                    categoria_id,
                    imagem_produto_id
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









export async function BuscarTodosProdutos() {
    const comando = `
        select      p.produto_id,
                    p.nome,
                    p.preco,
                    p.disponivel,
                    p.estoque,
                    p.detalhes,
                    p.composicao,
                    p.categoria_id,
                    p.subCategoria_id,
                    p.imagem_produto_id,
                    c.categoria,
                    d.imagem,
                    e.categoriaSub
        from        tabela_produtos as p
        inner join tabela_categoria as c 
        on p.categoria_id = c.categoria_id
        inner join tabela_imagem as d 
        on p.imagem_produto_id = d.imagem_produto_id
        inner join tabela_subCategoria as e 
        on p.subCategoria_id = e.subCategoria_id
        order by p.produto_id;
    `;


    const [ dados ] = await conexao.query(comando);;
    return dados;
};








export async function BuscarPorId(id) {
    const comando = `
        select      p.produto_id,
                    p.nome,
                    p.preco,
                    p.disponivel,
                    p.estoque,
                    p.detalhes,
                    p.composicao,
                    p.categoria_id,
                    p.subCategoria_id,
                    p.imagem_produto_id,
                    c.categoria,
                    d.imagem,
                    e.categoriaSub
        from        tabela_produtos as p
        inner join tabela_categoria as c 
        on p.categoria_id = c.categoria_id
        inner join tabela_imagem as d 
        on p.imagem_produto_id = d.imagem_produto_id
        inner join tabela_subCategoria as e 
        on p.subCategoria_id = e.subCategoria_id
        where produto_id = 6
        order by produto_id
        `;


    const [ dados ] = await conexao.query(comando, [id]);
    return dados[0];
};










export async function AlterarProduto(id, produto) {
    const comando = `
        update  tabela_produtos
        set     nome = ?,
                preco = ?,
                estoque = ?,
                disponivel = ?,
                composicao = ?,
                detalhes = ?,
                subCategoria = ?,
                categoria_id = ?,
                imagem_produto_id = ?
        where   produto_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        produto.nome,
        produto.preco,
        produto.estoque,
        produto.disponivel,
        produto.composicao,
        produto.detalhes,
        produto.categoria,
        produto.subcategoria,
        produto.imagem,
        id
    ]);

    return dados.affectedRows;
};







export async function DeletarProduto(id) {
    const comando = `
        delete from  tabela_produtos
              where  produto_id = ?
    `;


    const [ dados ] = await conexao.query(comando, [id])
    return dados.affectedRows
};







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











export async function BuscarPedidos() {
    const comando = `
        select      p.pedido_id,
                    p.codigoProduto,
                    p.formaPagamento,
                    p.parcelas,
                    p.pedidoEntrega,
                    p.situacao,
                    p.garantia,
                    p.cliente_id,
                    p.produto_id,
                    c.cliente,
                    d.nome
        from        tabela_pedidos as p
        inner join tabela_cliente as c 
        on p.cliente_id = c.cliente_id
        inner join tabela_produtos as d 
        on p.produto_id = d.produto_id
        order by p.produto_id
        `;

        const [ dados ] = await conexao.query(comando);
        return dados;
};








export async function BuscarPedidoId(id) {
    const comando = `
        select      p.pedido_id,
                    p.codigoProduto,
                    p.formaPagamento,
                    p.parcelas,
                    p.pedidoEntrega,
                    p.situacao,
                    p.garantia,
                    p.cliente_id,
                    p.produto_id,
                    c.cliente,
                    d.nome
        from        tabela_pedidos as p
        inner join tabela_cliente as c 
        on p.cliente_id = c.cliente_id
        inner join tabela_produtos as d 
        on p.produto_id = d.produto_id
        where       pedido_id = ?
        order by    p.pedido_id
    `;

    const [ dados ] = await conexao.query(comando, [ id ]);
    return dados.affectedRows;
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