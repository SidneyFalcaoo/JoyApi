import { AdicionarPedidos, ConsultarCodigo, ExcluirPedido,AdicionarItens,
         AlterarItens, CriarLogin, ConsultarLogin, LogarUsuario, DeletarUsuario,
         BuscarTodosUsuarios, BuscarUsuarioId,  AlterarUsuario, AdicionarEndereco,
         BuscarCategoriaRelogio, BuscarCategoriaEscapulario, BuscarCategoriaAlianca,
         BuscarCategoriaCorrente, BuscarCategoriaPulseira, BuscarCategoriaBrinco,
          BuscarCategoriaPingente } from "../Repository/funcUsuarioRepository.js";

import { BuscarImg } from "../Repository/funcAdmRepository.js";

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
        

        const alterar = await AlterarUsuario(id, resposta);
        resp.send();

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});










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

        if(!pedido.cliente) throw new Error('Cliente não inserido');
        if(!pedido.total) throw new Error('total não inserido');


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
Endpoint.post('/pedido/item', async (req, resp) => {
    try {
        
        const resposta = req.body;


        if (!resposta.produto) throw new Error ('Produto Obrigatorio');
        if (!resposta.pedido) throw new Error ('Pedido Obrigatorio');
        if (!resposta.quantidade) throw new Error ('Quantidade Obrigatoria')

        console.log(resposta);
        const adicionar = await AdicionarItens(resposta)
        resp.send(adicionar);

    } catch (error) {
        resp.status(500).send({ erro: error.message });
    }
});








// // Alterar Quantidade //
// Endpoint.put('/alterar/quantidade/:id', async (req, resp) => {
//     try {
//         const quantidade = req.body;
//         const { id } = req.params;
    

//         if (!quantidade.produto) throw new Error('Produto obrigatorio');
//         if (!quantidade.pedido) throw new Error('Pedido obrigatorio');
//         if (!quantidade.quantidade) throw new Error('Quantidade obrigatoria');
    
//         const resposta = await AlterarItens(id, quantidade);
//         resp.send();

//     } catch (error) {
//         resp.status(500).send({ erro: error.message });
//     }
// });









Endpoint.post('/usuario/endereco', async (req, resp) => {
    try {

        const endereco = req.body;

        if (!endereco.nome) throw new Error('Nome obrigatorio');
        if (!endereco.cep) throw new Error('Cep obrigatorio');
        if (!endereco.enderecoRua) throw new Error('Endereço da rua obrigatorio');
        if (!endereco.numeroCasa) throw new Error('Numero da casa obrigatorio');
        if (!endereco.complemento) throw new Error('Complemento obrigatorio');
        if (!endereco.cidade) throw new Error('Cidade obrigatoria');
        if (!endereco.estado) throw new Error('Estado obrigatorio');
        if (!endereco.bairro) throw new Error('Bairro obrigatorio');

        const resposta = await AdicionarEndereco(endereco);
        resp.send(resposta)
        
    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});











Endpoint.get('/buscar/categoria/relogio', async (req, resp) => {
    try {
        
        const resposta = await BuscarCategoriaRelogio();

        for(let cont = 0; cont < resposta.length; cont++){
            let imagens = await BuscarImg(resposta[cont].produto_id)

            resposta[cont].imagem = imagens[0].imagem
        }

        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});










Endpoint.get('/buscar/categoria/escapulario', async (req, resp) => {
    try {
        
        const resposta = await BuscarCategoriaEscapulario();

        for(let cont = 0; cont < resposta.length; cont++){
            let imagens = await BuscarImg(resposta[cont].produto_id)

            resposta[cont].imagem = imagens[0].imagem
        }

        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});








Endpoint.get('/buscar/categoria/alianca', async (req, resp) => {
    try {
        
        const resposta = await BuscarCategoriaAlianca();

        for(let cont = 0; cont < resposta.length; cont++){
            let imagens = await BuscarImg(resposta[cont].produto_id)

            resposta[cont].imagem = imagens[0].imagem
        }

        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});









Endpoint.get('/buscar/categoria/corrente', async (req, resp) => {
    try {
        
        const resposta = await BuscarCategoriaCorrente();

        for(let cont = 0; cont < resposta.length; cont++){
            let imagens = await BuscarImg(resposta[cont].produto_id)

            resposta[cont].imagem = imagens[0].imagem
        }

        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});






Endpoint.get('/buscar/categoria/pulseira', async (req, resp) => {
    try {
        
        const resposta = await BuscarCategoriaPulseira();

        for(let cont = 0; cont < resposta.length; cont++){
            let imagens = await BuscarImg(resposta[cont].produto_id)

            resposta[cont].imagem = imagens[0].imagem
        }

        resp.send(resposta);

    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});







Endpoint.get('/buscar/categoria/brinco', async (req, resp) => {
    try {
        
        const resposta = await BuscarCategoriaBrinco();

        for(let cont = 0; cont < resposta.length; cont++){
            let imagens = await BuscarImg(resposta[cont].produto_id)

            resposta[cont].imagem = imagens[0].imagem
        }

        resp.send(resposta);

    } catch (error) {
        
    }
});






Endpoint.get('/buscar/categoria/pingente', async (req, resp) => {
    try {
        
        const resposta = await BuscarCategoriaPingente();

        for(let cont = 0; cont < resposta.length; cont++){
            let imagens = await BuscarImg(resposta[cont].produto_id)

            resposta[cont].imagem = imagens[0].imagem
        }

        resp.send(resposta);

    } catch (error) {
        
    }
})




export default Endpoint;