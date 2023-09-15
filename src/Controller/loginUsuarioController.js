import { LogarUsuario } from "../Repository/loginUsuarioRepository.js";

import { Router } from "express";
const Endpoint = Router();







Endpoint.post('/usuario/login', async (req, resp) => {
    try {
        const login = req.body;

        if (!login.nome) throw new Error('Nome obrigatorio');
        if (!login.email) throw new Error('Email obrigatorio');
        if (!login.senha) throw new Error('Senha obrigatorio');
        if (!login.cpf) throw new Error('Cpf obrigatorio');
        
        
        const logar = await LogarUsuario(login);

        resp.send(logar);
    } catch (error) {
        resp.status(500).send({ erro: error.message })
    }
});







export default Endpoint;