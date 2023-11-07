import { AdicionarPedidos, ConsultarCodigo, ExcluirPedido,
         AdicionarItens,
         AlterarItens,
         DeletarQuantidade,
         CriarLogin,
         ConsultarLogin,
         AlterarPerfil,
         LogarUsuario,
         DeletarUsuario,
<<<<<<< HEAD
         BuscarTodosUsuarios
=======
         BuscarUsuarioId
>>>>>>> 960e59cda6098f074f5ac211db59b2490194a0eb
        } from "../Repository/funcUsuarioRepository.js";

import { Router } from "express";
import multer from "multer";


const Endpoint = Router();
const upload = multer({ dest: 'storage/Cliente' });






// Criar um login //
Endpoint.post('/usuario/login', async (req, resp) => {
    try {
        
        const resposta = req.body;


        if (!resposta.cliente) throw new Error ('Nome não inserido');
        if (!resposta.email) throw new Error ('Email não inserido');
        if (!resposta.senha) throw new Error ('Senha não inserida');

        const resp1 = await ConsultarLogin(resposta.email);
        if (resp1.length > 0) 
        throw new Error('Email Já cadastrado');


        const login = await CriarLogin(resposta);
        resp.send(login);
    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});









// Cadastrar o usuario //
Endpoint.post('/usuario/logar', async (req, resp) => {
    try {
        
        const { email, senha } = req.body;
        const linhas = await LogarUsuario( email, senha );
    
        if (!linhas) {
            throw new Error ('Login inválido');
        }                    
    
        resp.send(linhas);

    } catch (error) {
        resp.status(401).send({ erro: error.message });
    }
})












// Alterar e inserir informações no perfil //
Endpoint.put('/usuario/alterar/:id', async (req, resp) => {
    try {

        const resposta = req.body;
        const { id } = req.params;
        

        if (!resposta.cliente) throw new Error ('Nome não inserido');
        if (!resposta.email) throw new Error ('Email não inserido');
        if (!resposta.senha) throw new Error ('Senha não inserida');
        if (!resposta.telefone) throw new Error ('Telefone não inserido');
        if (!resposta.cpf) throw new Error ('Cpf não inserido');
        if (!resposta.nascimento) throw new Error ('Data de nascimento não inserida');
        

        const alterar = await AlterarPerfil(resposta, id);
        resp.send();
    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
})










// Deletar o perfil do usuario //
Endpoint.delete('/deletar/usuario/:id', async (req, resp) => {
    try {
        
        const { id } = req.params;
        const resposta = await DeletarUsuario(id);

        resp.send();
    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});










// Buscar todos os usuarios //
Endpoint.get('/buscar/usuarios', async (req, resp) => {
    try {
        
        const resposta = await BuscarTodosUsuarios();

        resp.send(resposta);
    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
})











// Buscar um usuario //
Endpoint.get('/buscar/usuario/:id', async (req, resp) => {
    try {
        
        const { id } = req.params;
        const resposta = await BuscarUsuarioId(id);

        resp.send(resposta);
    } catch (error) {
        resp.status(500).send({ erro: error.message });
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