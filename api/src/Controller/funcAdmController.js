import { AdicionarProduto, Alterar, Categoria, Consultar, ConsultarCategoria } from '../Repository/funcAdmRepository.js';
import { Router } from "express";

const Endpoint = Router();




Endpoint.post('/adicionar', async (req, resp) => {
    try {
        const produto = req.body;

        if (!produto.nome) throw new Error('Nome obrigatorio');
        if (!produto.preco) throw new Error('Preço obrigatorio');
        if (!produto.categoria_id) throw new Error('Categoria obrigatoria');
        if (!produto.estoque) throw new Error('Estoque obrigatorio');
        if (!produto.composicao) throw new Error('Composição obrigatorio');
        if (!produto.detalhes) throw new Error('Detalhes obrigatorios');



        const resp1 = await Consultar(produto.nome)
        if (resp1.length > 0)
        throw new Error('Nome ja cadastrado');

        const resp2 = await Consultar(produto.composicao)
        if (resp2.length > 0)
        throw new Error('Composição ja cadastrada');

        const resp3 = await Consultar(produto.detalhes)
        if (resp3.length > 0)
        throw new Error('Detalhes ja cadastrados');



        const resposta = await AdicionarProduto(produto);
        resp.send(resposta);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});








Endpoint.post('/categoria', async (req, resp) => {
    try {
        const categoria = req.body;


        if (!categoria.nomeCategoria) 
        throw new Error('Categoria obrigatoria');


        const resp1 = await ConsultarCategoria(categoria.nomeCategoria)
        if (resp1.length > 0)
        throw new Error('Categoria Ja cadastrada');

        const resposta = await Categoria(categoria);
        resp.send(resposta);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});







Endpoint.put('/alterar/:id', async (req, resp) => {
    try {
        const produto = req.body;
        const { id } = req.params;
    

        if (!produto.nome) throw new Error('Nome obrigatorio');
        if (!produto.preco) throw new Error('Preço obrigatorio');
        if (!produto.categoria_id) throw new Error('Categoria obrigatoria');
        if (!produto.estoque) throw new Error('Estoque obrigatorio');
        if (!produto.composicao) throw new Error('Composição obrigatorio');
        if (!produto.detalhes) throw new Error('Detalhes obrigatorios');


    
        const resposta = await Alterar(id, produto);
        resp.send();

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});




export default Endpoint;