import { AdicionarProduto, Alterar, BuscarPorId, BuscarTodosProdutos, 
         Categoria, Consultar, ConsultarCategoria, ConsultarSubCategoria, 
         Deletar, InserirImg, SubCategoria, Logar } from '../Repository/funcAdmRepository.js';

import { Router } from "express";
import multer from 'multer'

const Endpoint = Router();
const upload = multer({ dest: 'storage/Produto' });








// Login do ADM //
Endpoint.post('/adm/login', async (req, resp) => {
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
})











// Adicionar Produto //
Endpoint.post('/produto', async (req, resp) => {
    try {
        const produto = req.body;

        if (!produto.nome) throw new Error('Nome obrigatorio');
        if (!produto.preco) throw new Error('Preço obrigatorio');
        if (!produto.categoria) throw new Error('Categoria obrigatoria');
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










// Adicionar Imagem //
Endpoint.post('/produto/img', upload.single('Pingente') , async (req, resp) => {
    try {
        const img = req.file.path;

        const resposta = await InserirImg(img)
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});










// Buscar Todos os Produtos //
Endpoint.get('/consultar', async (req, resp) => {
    try {
        
        const resposta = await BuscarTodosProdutos();
        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});









// Consultar Por ID //
Endpoint.get('/consultar/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        
        const resposta = await BuscarPorId(id);
        resp.send(resposta)
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});









// Alterar Produto //
Endpoint.put('/alterar/:id', async (req, resp) => {
    try {
        const produto = req.body;
        const { id } = req.params;
    

        if (!produto.nome) throw new Error('Nome obrigatorio');
        if (!produto.preco) throw new Error('Preço obrigatorio');
        if (!produto.categoria) throw new Error('Categoria obrigatoria');
        if (!produto.estoque) throw new Error('Estoque obrigatorio');
        if (!produto.composicao) throw new Error('Composição obrigatorio');
        if (!produto.detalhes) throw new Error('Detalhes obrigatorios');

    
        const resposta = await Alterar(id, produto);
        resp.send();

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});











// Deletar Produto //
Endpoint.delete('/deletar/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const resposta = await Deletar(id);
        
        
        resp.send();
    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});









export default Endpoint;