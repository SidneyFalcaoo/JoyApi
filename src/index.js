import 'dotenv/config';
import cors from 'cors';
import express from 'express';



const servidor = express();
servidor.use(cors());
servidor.use(express.json());



servidor.listen(process.env.PORT,() => console.log('API subiu'));