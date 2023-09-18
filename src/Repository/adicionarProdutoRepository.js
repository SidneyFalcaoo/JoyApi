import conexao from './Connection.js';







export async function AdicionarProduto(produto) {
    const comando = `
        insert into tabela_produtos ( nome_produto, preco, categoria_id, estoque, composicao, detalhes )
                             values ( ?, ?, ?, ?, ?, ?)
        `;

    const [resposta] = await conexao.query(comando, [
            
    ]);

    produto.id = resposta.insertId;
    return produto;
};