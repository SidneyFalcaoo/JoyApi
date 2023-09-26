use joyeriacristallo;



-- Login Adm --
insert into tabela_adm ( nome, email, senha ) 
				values ( 'Joy', 'joyeriacristallo@gmail.com', 'JoyMGJS@gmail.com' );



-- ------------------------------------------------------------------------------------------------------------------------------------------------ --



-- Select que confirma o Login do Adm --
select 	adm_id,
	    nome,
        email
  from 	tabela_adm
 where	email = ?
   and 	senha = ?;
   




-- ------------------------------------------------------------------------------------------------------------------------------------------------ --
   
    
    
    


-- Inserir nova categoria -- 
insert into tabela_categoria ( categoria )
	 values (?);
     


	
    
-- ------------------------------------------------------------------------------------------------------------------------------------------------ --
	

    
    
    
     
-- Select que confirma se a categoria já foi cadastrada --
select 	categoria_id,
		categoria
  from tabela_categoria
 where	categoria like ?;





-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Inserir subCategoria -- 
insert into tabela_subCategoria ( categoriaSub )
	values (?);
    
    




-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Select que consulta se a Subcategoria já foi cadastrada --
select 	subCategoria_id,
		categoriaSub
  from 	tabela_subCategoria
 where	categoriaSub like ?;



-- ------------------------------------------------------------------------------------------------------------------------------------------------ --







-- Inserir um novo produto --
insert into tabela_produtos ( nome, preco, categoria_id, estoque, composicao, detalhes )
					 values ( ?, ?, ?, ?, ?, ?);
                     
  
  
  
-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Select que consulta se o produto ja foi cadastrado --
select 	produto_id,
		nome,
		preco,
        categoria_id,
        estoque,
        composicao,
        detalhes
  from	tabela_produtos
 where	nome like ?
    or  composicao like ?
    or  detalhes like ?;

  
  
  
-- ------------------------------------------------------------------------------------------------------------------------------------------------ --



-- Para alterar os valores da tabela --
 update  tabela_produtos
    set  categoria_id = ?,
		 nome = ?,
         preco = ?,
         estoque = ?,
         composicao = ?,
         detalhes = ?
  where produto_id = ?;






-- ------------------------------------------------------------------------------------------------------------------------------------------------ --






-- select que consuta todos os valores e colunas --
 select         p.produto_id,
				p.categoria_id,
				p.nome,
				p.preco,
				p.disponivel,
				p.estoque,
				p.detalhes,
				p.composicao
from            tabela_produtos as p
inner           join tabela_categoria  as c
on              p.categoria_id = c.categoria_id
order by 		p.produto_id;






-- ------------------------------------------------------------------------------------------------------------------------------------------------ --







-- select que consuta todos os valores por id--
select      	p.produto_id,
				p.categoria_id,
				p.nome,
				p.preco,
				p.disponivel,
				p.estoque,
				p.detalhes,
				p.composicao
from            tabela_produtos as p
inner           join tabela_categoria  as c
on              p.categoria_id = c.categoria_id
where produto_id = ?
order by produto_id;





-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Inserir imagem -- 
insert into tabela_imagem ( imagem )
		values (?);







-- ------------------------------------------------------------------------------------------------------------------------------------------------ --




-- Deletar um produto --
delete from  tabela_produtos
      where  produto_id = ?;
      
      


-- ------------------------------------------------------------------------------------------------------------------------------------------------ --

    
    

-- Login Usuario --
insert into tabela_loginUser ( cliente, email, senha, cadastroPessoaFisica ) 
					values ( ?, ?, ?, ?);
                    



-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Select que confirma o Login do Usuario --
select  loginUser_id,
		cliente,
		email,
        senha
  from	tabela_loginUser
 where	email = ?
   and	senha = ?;







-- ------------------------------------------------------------------------------------------------------------------------------------------------ --







-- Select que consulta se ja foi cadastrado --
select	cliente,
		email,
        senha,
        cadastroPessoaFisica
  from tabela_loginUser
 where email like ?
	or cadastroPessoaFisica like ?
 order 
    by loginUser_id;
    
    
    
    
-- ------------------------------------------------------------------------------------------------------------------------------------------------ --


-- Inserir o perfil do Usuario --
insert into tabela_cliente ( telefone, nascimento ) 
                    values ( ?, ? );
                    
                    
                    
                    
-- ------------------------------------------------------------------------------------------------------------------------------------------------ --