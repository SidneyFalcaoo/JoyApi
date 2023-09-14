import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import loginAdmController from './Controller/loginAdmController.js'

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(loginAdmController);

servidor.listen(process.env.PORT,() => console.log('API subiu'));