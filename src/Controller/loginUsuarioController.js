import { Consultar, LogarUsuario, LoginUsuario } from "../Repository/loginUsuarioRepository.js";

import { Router } from "express";
const Endpoint = Router();







Endpoint.post('/usuario/login', async (req, resp) => {
    try {
        const login = req.body;

        if (!login.nome) throw new Error ('Nome obrigatorio');
        if (!login.email) throw new Error ('Email obrigatorio');
        if (!login.senha) throw new Error ('Senha obrigatorio');
        if (!login.cpf) throw new Error ('Cpf obrigatorio');

        
        let resp1 = await Consultar(login.email);
        if (resp1.length > 0) 
        throw new Error ('Email ja cadastrado');

        let resp2 = await Consultar(login.cpf)
        if (resp2.length > 0) 
        throw new Error ('Cpf ja cadastrado');


        const Logar = await LogarUsuario(login);
        resp.send(Logar);
    } 
    catch (error) {
        resp.status(500).send({ erro: error.message })
    }    
});






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










export default Endpoint;