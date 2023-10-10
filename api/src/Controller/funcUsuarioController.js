import { Consultar, ConsultarPerfil, LogarUsuario, LoginUsuario,
         PerfilUser, AdicionarPedidos, ConsultarCodigo, ExcluirPedido, InserirImgUsuario
        } from "../Repository/funcUsuarioRepository.js";

import { Router } from "express";
import multer from "multer";


const Endpoint = Router();
const upload = multer({ dest: 'storage/Cliente' });






// Usuario adicionar uma foto //
Endpoint.post('/usuario/img', upload.single('Usuario') , async (req, resp) => {
     try {
        
        const img = req.file.path;

        const resposta = await InserirImgUsuario(img)
        resp.send(resposta);

     } catch (error) {
        resp.status(204).send({ erro: error.message })
     }
})







// Usuario criar um login //
Endpoint.post('/usuario/login', async (req, resp) => {
    try {
        const login = req.body;

        if (!login.nome) throw new Error ('Nome obrigatorio');
        if (!login.email) throw new Error ('Email obrigatorio');
        if (!login.senha) throw new Error ('Senha obrigatorio');
        if (!login.cpf) throw new Error ('Cpf obrigatorio');

        
        const resp1 = await Consultar(login.email);
        if (resp1.length > 0) 
        throw new Error ('Email ja cadastrado');

        const resp2 = await Consultar(login.cpf)
        if (resp2.length > 0) 
        throw new Error ('Cpf ja cadastrado');


        const Logar = await LogarUsuario(login);
        resp.send(Logar);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message })
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










export default Endpoint;