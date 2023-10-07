use joyeriacristallo;

-- -------------------------------------------------------------------------------------------------------------------------------------------------

-- Login Adm --
insert into tabela_adm ( nome, email, senha ) 
				values ( 'Joy', 'joyeriacristallo@gmail.com', '@JoyMGJS' );



-- ------------------------------------------------------------------------------------------------------------------------------------------------ --



-- Select que confirma o Login do Adm --
select 	adm_id,
	    nome,
        email
  from 	tabela_adm
 where	email = ?
   and 	senha = ?;
   


-- ------------------------------------------------------------------------------------------------------------------------------------------------ --

    
    

-- Login Usuario --
insert into tabela_login_cliente ( cliente, email, senha, cpf ) 
						  values ( ?, ?, ?, ?);
                    



-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Select que confirma o Login do Usuario --
select 	cliente_id,
		cliente,
		email,
        senha
  from	tabela_cliente
 where	email = ?
   and	senha = ?;







-- ------------------------------------------------------------------------------------------------------------------------------------------------ --







-- Select que consulta se ja foi cadastrado --
select	cliente,
		email,
        senha,
        cadastroPessoaFisica
  from tabela_cliente
 where email like ?
	or cadastroPessoaFisica like ?
 order 
    by cliente_id;
    
    
    
    

-- ------------------------------------------------------------------------------------------------------------------------------------------------ --
   
    
    
    


-- Inserir nova categoria -- 
insert into tabela_categoria ( categoria )
	 values (?);
     

	select * from tabela_categoria;
	
    
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





-- Select que busca todas as sub-categorias -- 
 select	subCategoria_id,
		categoriaSub
   from	tabela_subCategoria;






-- ---------------------------------------------------------------------------------------------------------------------------------------------------------





-- Inserir um novo produto --
insert into tabela_produtos ( nome, preco, estoque, disponivel, composicao, detalhes, categoria_id, subCategoria_id, imagem_produto_id )
					 values ( ?, ?, ?, ?, ?, ?, ?, ?, ?);
                     
  
  
  
-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Select que consulta se o produto ja foi cadastrado --
select 	produto_id,
		nome,
		preco,
        estoque,
        composicao,
        detalhes,
        subCategoria_id,
		categoria_id,
		imagem_produto_id
  from	tabela_produtos
 where	nome like ''
    or  composicao like ''
    or  detalhes like '';


  
  
-- ------------------------------------------------------------------------------------------------------------------------------------------------ --



-- Para alterar os valores da tabela --
 update  tabela_produtos
    set  nome = ?,
         preco = ?,
         estoque = ?,
         disponivel = ?,
         composicao = ?,
         detalhes = ?,
         subCategoria = ?,
         categoria_id = ?,
         imagem_produto_id = ?
  where produto_id = ?;






-- ------------------------------------------------------------------------------------------------------------------------------------------------ --






-- select que consuta todos os valores e colunas --
 select p.produto_id,
		p.nome,
		p.preco,
		p.disponivel,
		p.estoque,
		p.detalhes,
		p.composicao,
		p.categoria_id,
		p.subCategoria_id,
		p.imagem_produto_id,
		c.categoria,
		d.imagem,
        e.categoriaSub
   from tabela_produtos as p
inner join tabela_categoria as c 
     on p.categoria_id = c.categoria_id
inner join tabela_imagem as d 
     on p.imagem_produto_id = d.imagem_produto_id
inner join tabela_subCategoria as e 
     on p.subCategoria_id = e.subCategoria_id
     order by p.produto_id;





-- ------------------------------------------------------------------------------------------------------------------------------------------------ --







-- select que consuta todos os valores por id--
 select p.produto_id,
		p.nome,
		p.preco,
		p.disponivel,
		p.estoque,
		p.detalhes,
		p.composicao,
		p.categoria_id,
		p.subCategoria_id,
		p.imagem_produto_id,
		c.categoria,
		d.imagem,
        e.categoriaSub
   from tabela_produtos as p
inner join tabela_categoria as c 
     on p.categoria_id = c.categoria_id
inner join tabela_imagem as d 
     on p.imagem_produto_id = d.imagem_produto_id
inner join tabela_subCategoria as e 
     on p.subCategoria_id = e.subCategoria_id
where produto_id = 6
order by produto_id;





-- ------------------------------------------------------------------------------------------------------------------------------------------------ --





-- Inserir imagem -- 
insert into tabela_imagem ( imagem )
		values (?);




-- ------------------------------------------------------------------------------------------------------------------------------------------------ --




-- Deletar um produto --
delete from  tabela_produtos
      where  produto_id = ?;
      
      
      
      
-- ------------------------------------------------------------------------------------------------------------------------------------------------- --



-- Adicionar um pedido --
	insert into tabela_pedidos 	( cliente_id, produto_id, codigoProduto, formaPagamento, parcelas, pedidoEntrega, situacao, garantia )
						values	( ?, ?, ?, ?, ?, ?, ?, ? );
                        



-- ---------------------------------------------------------------------------------------------------------------------------------------------------




-- Select que consulta se o codigo do pedido ja foi cadastrado  --
        select	        codigoProduto,
                        formaPagamento,
                        parcelas,
                        pedidoEntrega,
                        situacao,
                        garantia
        from 	        tabela_pedidos
        where 	        codigoProduto like ?
        order 
        by 	            pedido_id;
        
        
        
        
-- --------------------------------------------------------------------------------------------------------------------------------------------------------

-- Select que busca todos os pedidos --
 select p.pedido_id,
		p.codigoProduto,
		p.formaPagamento,
		p.parcelas,
		p.pedidoEntrega,
		p.situacao,
		p.garantia,
		p.cliente_id,
		p.produto_id,
        c.cliente,
        d.nome
   from tabela_pedidos as p
inner join tabela_cliente as c 
     on p.cliente_id = c.cliente_id
inner join tabela_produtos as d 
     on p.produto_id = d.produto_id
     order by p.produto_id;
     
     
     
     
     
-- -------------------------------------------------------------------------------------------------------------------------------------------------------





-- Select que busca por ID --
        select      p.pedido_id,
                    p.codigoProduto,
                    p.formaPagamento,
                    p.parcelas,
                    p.pedidoEntrega,
                    p.situacao,
                    p.garantia,
                    p.cliente_id,
                    p.produto_id,
                    c.cliente,
                    d.nome
        from        tabela_pedidos as p
        inner join tabela_cliente as c 
        on p.cliente_id = c.cliente_id
        inner join tabela_produtos as d 
        on p.produto_id = d.produto_id
        where       pedido_id = ?
        order by    p.pedido_id;
        
        
        
        
        
        
-- ---------------------------------------------------------------------------------------------------------------------------------------------------



-- Deletar pedidos --
 delete from	tabela_pedidos
	   where    pedido_id = ?
       
       
       
-- ----------------------------------------------------------------------------------------------------------------------------------------------------