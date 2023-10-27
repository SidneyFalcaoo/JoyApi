import mysql2 from 'mysql2/promise';


const conexao = await mysql2.createConnection({
	host: process.env.MYQSL_HOST,
	database: process.env.MYQSL_DB,
	user: process.env.MYQSL_USER,
	password: process.env.MYQSL_PWD,
	typeCast: function (field, next) {
		if (field.type === "TINY" && field.length === 1) {
			return (field.string() === '1');
		} else {
			return next();
		}
	}
});



console.log('Banco de dados conectado!');
export default conexao;