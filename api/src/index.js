import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import loginAdmController from './Controller/loginAdmController.js';
import loginUsuarioController from './Controller/loginUsuarioController.js';
import funcAdmController from './Controller/funcAdmController.js'


const servidor = express();
servidor.use(express.json())
servidor.use(cors());

servidor.use(loginAdmController);
servidor.use(loginUsuarioController);
servidor.use(funcAdmController);

servidor.listen(process.env.PORT,() => console.log('API subiu'));