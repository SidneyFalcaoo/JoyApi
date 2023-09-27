import { Consultar, ConsultarPerfil, LogarUsuario, LoginUsuario, PerfilUser } from "../Repository/funcUsuarioRepository.js";

import { Router } from "express";
const Endpoint = Router();









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











export default Endpoint;