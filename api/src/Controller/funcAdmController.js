import { AdicionarProduto, AlterarProduto, BuscarPorNome, BuscarTodosProdutos, 
         Categoria, ConsultarCategoria, ConsultarSubCategoria, 
         DeletarProduto, InserirImg, SubCategoria, Logar, 
         BuscarPedidos, BuscarPedidoId, BuscarCategoria, BuscarsubCategoria,
         ConsultarProduto, AdicionarItens, BuscarItensId, DeletarQuantidade, BuscarProdutosPorId,} from '../Repository/funcAdmRepository.js';

import { Router } from "express";
import multer from 'multer';

const Endpoint = Router();
const upload = multer({ dest: 'storage/Produto' });






// Login do ADM //
Endpoint.post('/adm/logar', async (req, resp) => {
    try {

        const { email, senha } = req.body;
        const linhas = await Logar( email, senha );
    
        if (!linhas) {
            throw new Error ('Login invalido');
        }                   
    
        resp.send(linhas);

    } 
    catch (Err) {
        resp.status(500).send({ erro: Err.message })
    }
});









// Adicionar Categoria //
Endpoint.post('/categoria', async (req, resp) => {
    try {
        const categoria = req.body;


        if (!categoria.categoria) 
        throw new Error('Categoria obrigatoria');


        const resp1 = await ConsultarCategoria(categoria.categoria)
        if (resp1.length > 0)
        throw new Error('Categoria Ja cadastrada');

        const resposta = await Categoria(categoria);
        resp.send(resposta);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});








// Buscar Categoria //
Endpoint.get('/buscar/categoria', async (req, resp) => {
    try {

        const resposta = await BuscarCategoria();
        resp.send(resposta)
        
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});











// Adicionar SubCategoria //
Endpoint.post('/subCategoria', async (req, resp) => {
    try {
        
        const subCategoria = req.body;

        if (!subCategoria.subcategoria) 
        throw new Error('Categoria obrigatoria');


        const resp1 = await ConsultarSubCategoria(subCategoria.subcategoria)
        if (resp1.length > 0)
        throw new Error('SubCategoria Ja cadastrada');
    

        const resposta = await SubCategoria(subCategoria);
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});








// Buscar SubCategoria //
Endpoint.get('/buscar/subCategoria', async (req, resp) => {
    try {

        const resposta = await BuscarsubCategoria();
        resp.send(resposta)
        
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});










// Adicionar Imagem //
Endpoint.post('/produto/:id/img', upload.single('Produto') , async (req, resp) => {
    try {
        const id = req.params.id;
        
        if(!req.file)
            throw new Error('Imagem não selecionada')
        
        const img = req.file.path;

        const resposta = await InserirImg(img, id)
        resp.send(resposta);

    } catch (error) {
        resp.status(400).send({ erro: error.message });
    }
});











// Adicionar Produto //
Endpoint.post('/produto', async (req, resp) => {
    try {
        const produto = req.body;

        if (!produto.nome) throw new Error ('Nome obrigatorio');
        if (!produto.preco) throw new Error ('Preço obrigatorio');
        if (!produto.categoria) throw new Error ('Categoria Obrigatoria');
        if (!produto.disponivel == undefined) ('Campo disponivel é obrigatorio')
        if (!produto.composicao) throw new Error ('Composição obrigatorio');
        if (!produto.detalhes) throw new Error ('Detalhe obrigatorio');


        const resp1 = await ConsultarProduto(produto.nome)
        if (resp1.length > 0)
        throw new Error('Nome ja cadastrado');

        const resposta = await AdicionarProduto(produto);
        resp.send(resposta);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});














// Consultar Por Nome //
Endpoint.get('/buscar/produto', async (req, resp) => {
    try {
        const busca = req.query.nome
        
        const resposta = await BuscarPorNome(busca);
        resp.send(resposta)
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});











// Busca todos os produtos por Id //
Endpoint.get('/buscar/produtos/:id', async (req, resp) => {
    try {
        
        const{ id } = req.params; 

        const resposta = await BuscarProdutosPorId(id);
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
})









// Buscar Todos os Produtos //
Endpoint.get('/listar/produtos', async (req, resp) => {
    try {
        
        const resposta = await BuscarTodosProdutos();
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});









// Alterar Produto //
Endpoint.put('/alterar/produto/:id', async (req, resp) => {
    try {
        const produto = req.body;
        const { id } = req.params;
    

        if (!produto.nome) throw new Error('Nome obrigatorio');
        if (!produto.preco) throw new Error('Preço obrigatorio');
        if (!produto.categoria) throw new Error('Categoria obrigatoria');
        if (!produto.composicao) throw new Error('Composição obrigatorio');
        if (!produto.detalhes) throw new Error('Detalhes obrigatorios');

    
        const resposta = await AlterarProduto(id, produto);
        resp.send();

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});










// Excluir uma imagem //
Endpoint.delete('/deletar/img/:id', async (req, resp) => {
    try {
        
        const { id } = req.params;
        const resposta = await DeletarProduto(id);


        resp.send();
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
})













// Deletar Produto //
Endpoint.delete('/deletar/produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const resposta = await DeletarProduto(id);

        if (resposta != 1) throw new Error ('Filme Não pode ser removido')
        
        
        resp.status(204).send();
    } catch (error) {
        resp.status(400).send({ erro: error.message });
    }
});










// Consulta todos os pedidos // 
Endpoint.get('/buscar/pedido', async (req, resp) => {
     try {
        
        const resposta = await BuscarPedidos();
        resp.send(resposta);

     } catch (error) {
        resp.status(500).send({ erro: error.message })
     }
});









// Buscar um pedido por id //
Endpoint.get('/buscar/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await BuscarPedidoId(id);
        resp.send();
        
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});







// Adicionar uma quantidade de itens // 
Endpoint.post('/quantidade/itens', async (req, resp) => {
    try {
        
        const resposta = req.body;


        if (!resposta.produto) throw new Error ('Produto Obrigatorio');
        if (!resposta.pedido) throw new Error ('Pedido Obrigatorio');
        if (!resposta.quantidade) throw new Error ('Quantidade Obrigatoria')


        const adicionar = await AdicionarItens(resposta)
        resp.send(adicionar);

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});






Endpoint.get('buscar/quantidade/:id', async (req, resp) => {
    try {

        const { id } = req.params;


        const resposta = await BuscarItensId(id);
        resp.send();

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});






// Alterar Quantidade //
Endpoint.put('/alterar/quantidade/:id', async (req, resp) => {
    try {
        const quantidade = req.body;
        const { id } = req.params;
    

        if (!quantidade.produto) throw new Error('Produto obrigatorio');
        if (!quantidade.pedido) throw new Error('Pedido obrigatorio');
        if (!quantidade.quantidade) throw new Error('Quantidade obrigatoria');
    
        const resposta = await AlterarProduto(id, quantidade);
        resp.send();

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});







Endpoint.delete('/deletar/quantidade/:id', async (req, resp) => {
    try {
        
        const { id } = req.params;


        const resposta = await DeletarQuantidade(id);
        resp.send();

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
})




export default Endpoint;