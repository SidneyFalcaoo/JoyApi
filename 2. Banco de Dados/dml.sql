use joyeriacristallo;

insert into tabela_adm ( nome, email, senha ) 
				values ( 'Joy', 'joyeriacristallo@gmail.com', 'JoyMGJS@gmail.com' );

select 	adm_id,
	    nome,
        email
  from 	tabela_adm
 where	email = ?
   and 	senha = ?;
    
    


insert into tabela_cliente ( cliente, email, senha, cadastroPessoaFisica ) 
					values ( ?, ?, ?, ?);
                    


select	cliente,
		email,
        senha,
        cadastroPessoaFisica
  from tabela_cliente
 where email like ?
	or cadastroPessoaFisica like ?
 order 
    by cliente_id;



