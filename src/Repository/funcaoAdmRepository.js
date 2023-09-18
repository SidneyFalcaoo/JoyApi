import conexao from './Connection.js';







export async function AdicionarProduto(produto) {
    const comando = `
        
    `;

    const [resposta] = await conexao.query(comando, [
            
    ]);

    produto.id = resposta.insertId;
    return produto;
};