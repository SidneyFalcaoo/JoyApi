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
    
    
    
    


select 	cliente_id,
		cliente,
		email,
        senha
  from	tabela_cliente
 where	email = ?
   and	senha = ?;






-- Inserir nova categoria -- 
insert into tabela_categoria ( categoria )
	 values (?);
     

select * from tabela_categoria;



-- Inserir subCategoria -- 
insert into tabela_subCategoria ( categoriaSub )
	values (?);
    
    



-- Inserir um novo produto --
insert into tabela_produtos ( nome, preco, categoria_id, estoque, composicao, detalhes )
					 values ( ?, ?, ?, ?, ?, ?);
                               
select * from tabela_produtos
inner join tabela_categoria  on tabela_categoria.categoria_id = tabela_produtos.categoria_id
   