import conexao from './Connection.js';





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
}




export async function AdicionarProduto(produto) {
    const comando = `
        
    `;

    const [resposta] = await conexao.query(comando, [
            
    ]);

    produto.id = resposta.insertId;
    return produto;
};