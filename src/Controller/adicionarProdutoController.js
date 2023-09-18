import { AdicionarProduto } from "../Repository/adicionarProdutoRepository.js";
import { Router } from "express";

const Endpoint = Router();




Endpoint.post('/adicionar', async (req, resp) => {
    try {
        const adicionar = req.body;

        const resposta = AdicionarProduto(adicionar);
        resp.send(resposta);
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});



export default Endpoint;