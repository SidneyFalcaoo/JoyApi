import { Logar } from '../Repository/loginAdmRepository.js'

import { Router } from 'express'
const Endpoint = Router();


Endpoint.post('/adm/login', async (req, resp) => {
    try {

        const { email, senha } = req.body;
        const linhas = await Logar( email, senha );
    
        if (!linhas) {
            throw new Error ('Login invalido');
        }
    
        resp.send(linhas);

    } catch (Err) {
        resp.status(500).send({ erro: Err.message })
    }
});

export default Endpoint;