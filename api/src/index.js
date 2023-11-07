import 'dotenv/config';
import cors from 'cors';
import express from 'express';


import funcAdmController from './Controller/funcAdmController.js';
import funcUsuarioController from './Controller/funcUsuarioController.js'


const servidor = express();
servidor.use(express.json())
servidor.use(cors());
servidor.use('/storage/Produto', express.static('storage/Produto'));


servidor.use(funcAdmController);
servidor.use(funcUsuarioController);




servidor.listen(process.env.PORT,() => console.log('API subiu'));