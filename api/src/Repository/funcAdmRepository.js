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