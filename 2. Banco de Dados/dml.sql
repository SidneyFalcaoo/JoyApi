use joyeriacristallo;

insert into tabela_adm ( nome, email, senha ) 
		values ( 'Joy', 'joyeriacristallo@gmail.com', 'JoyMGJS@gmail.com' );

select adm_id,
	    nome,
        email
    from tabela_adm
    where email = ?
    and senha = ?;