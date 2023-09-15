use joyeriacristallo;



-- Login Adm --
insert into tabela_adm ( nome, email, senha ) 
				values ( 'Joy', 'joyeriacristallo@gmail.com', 'JoyMGJS@gmail.com' );

select 	adm_id,
	    nome,
        email
  from 	tabela_adm
 where	email = ?
   and 	senha = ?;

    
    

-- Login Usuario --
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




-- Inserir nova categoria -- 
insert into tabela_categoria ( categoria )
	 values (?);
     



-- Inserir subCategoria -- 
insert into tabela_subCategoria ( categoriaSub )
	values (?);
