import { AdicionarProduto, Categoria } from '../Repository/funcAdmRepository.js';
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

        if (!categoria.nomeCategoria) throw new Error('Categoria obrigatoria')

        const resposta = await Categoria(categoria);
        resp.send(resposta);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});



export default Endpoint;