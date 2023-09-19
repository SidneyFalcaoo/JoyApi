import conexao from './Connection.js';





export async function AdicionarProduto(produto) {
    const comando = `
            insert into tabela_produtos ( nome, preco, categoria_id, estoque, composicao, detalhes )
                                 values ( ?, ?, ?, ?, ?, ?)
    `;

    const [resposta] = await conexao.query(comando, 
        [
            produto.nome,
            produto.preco,
            produto.categoria_id,
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

    ])  

    return dados
};








export async function Categoria(categoria) {
    const comando = `
            insert into tabela_categoria ( categoria )
                          values ( ? )
        `;

    const [resposta] = await conexao.query(comando, [
        categoria.nomeCategoria
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
        produto.categoria_id,
        produto.nome,
        produto.preco,
        produto.estoque,
        produto.composicao,
        produto.detalhes,
        id
    ]);

    return dados.affectedRows;
}