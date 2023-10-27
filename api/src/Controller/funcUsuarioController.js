import { ConsultarLogin, ConsultarPerfil,
         PerfilUser, AdicionarPedidos, ConsultarCodigo, ExcluirPedido,
         AdicionarItens,
         AlterarItens,
         DeletarQuantidade,
         LoginUsuario
        } from "../Repository/funcUsuarioRepository.js";

import { Router } from "express";
import multer from "multer";


const Endpoint = Router();
const upload = multer({ dest: 'storage/Cliente' });







// Usuario criar login //
Endpoint.post('/usuario/login', async (req, resp) => {
    try {

        const login = req.body;

        if (!login.nome) throw new Error('Nome não inserido');
        if (!login.email) throw new Error('Email não inserido');
        if (!login.senha) throw new Error('Senha não criada');




        const resp1 = await ConsultarLogin(login.email);
        if (resp1.length > 0)
        throw new Error('Email já inserido');

        const resposta = await LoginUsuario(login);
        resp.send(resposta);
    } catch (error) {
        
    }
});









// Usuario poder Logar //
Endpoint.post('/usuario/logar', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const linhas = await LoginUsuario(email, senha);
    
        if(!linhas) throw new Error('Credenciais invalidas!');
    
        resp.send(linhas);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});











// Usuario pode criar seu perfil //
Endpoint.post('/perfil/usuario', async (req, resp) => {
    try {
        const perfil = req.body;


        if (!perfil.telefone) throw new Error ('Telefone obrigatorio');
        if (!perfil.nascimento) throw new Error ('Data de nascimento obrigatoria');

        const resp1 = await ConsultarPerfil(perfil.telefone);
        if (resp1.length > 0) 
        throw new Error ('Telefone ja cadastrado');


        const criar = await PerfilUser(perfil)
        resp.send(criar);
    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});









// Adicionar um novo pedido //
Endpoint.post('/pedido', async (req, resp) => {
    try {
        
        const pedido = req.body;

        if(!pedido.cliente) throw new Error('Id do cliente obridatorio');
        if(!pedido.produto) throw new Error('Produto obridatorio');
        if(!pedido.codigo) throw new Error('Codigo obridatorio');
        if(!pedido.pagamento) throw new Error('Pagamento obridatorio');
        if(!pedido.parcelas) throw new Error('Parcelas obridatoria');
        if(!pedido.entrega) throw new Error('Entrega obridatoria');
        if(!pedido.situacao) throw new Error('Situação obridatoria');
        if(!pedido.garantia) throw new Error('Garantia obridatoria');



        const resp3 = await ConsultarCodigo(pedido.codigo)
        if (resp3.length > 0)
        throw new Error('Codigo ja cadastrado');



        const resposta = await AdicionarPedidos(pedido);
        resp.send(resposta)

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});







// Deletar um pedido //
Endpoint.delete('/deletar/pedido/:id', async (req, resp) => {
    try {
    
        const { id } = req.params;
        const resposta = await ExcluirPedido(id);
        
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








// Alterar Quantidade //
Endpoint.put('/alterar/quantidade/:id', async (req, resp) => {
    try {
        const quantidade = req.body;
        const { id } = req.params;
    

        if (!quantidade.produto) throw new Error('Produto obrigatorio');
        if (!quantidade.pedido) throw new Error('Pedido obrigatorio');
        if (!quantidade.quantidade) throw new Error('Quantidade obrigatoria');
    
        const resposta = await AlterarItens(id, quantidade);
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
});




export default Endpoint;