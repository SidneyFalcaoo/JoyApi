import Mysql2 from 'mysql2/promise';


const conexao = await Mysql2.createConnection({
	host: process.env.HOST,
	database: process.env.BD,
	user: process.env.USER,
	password: process.env.PWD
});

export default conexao;