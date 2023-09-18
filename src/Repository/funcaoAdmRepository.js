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
