use joyeriacristallo;



-- Login Adm --
insert into tabela_adm ( nome, email, senha ) 
				values ( 'Joy', 'joyeriacristallo@gmail.com', 'JoyMGJS@gmail.com' );





-- Select que confirma o Login do Adm --
select 	adm_id,
	    nome,
        email
  from 	tabela_adm
 where	email = ?
   and 	senha = ?;
   


    
    

-- Login Usuario --
insert into tabela_cliente ( cliente, email, senha, cadastroPessoaFisica ) 
					values ( ?, ?, ?, ?);
                    





-- 
select	cliente,
		email,
        senha,
        cadastroPessoaFisica
  from tabela_cliente
 where email like ?
	or cadastroPessoaFisica like ?
 order 
    by cliente_id;
    
    
    
    

-- Select que confirma o Login do Usuario --
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
     
     
     
	
     
     
     
select 	categoria_id,
		categoria
  from tabela_categoria
 where	categoria like ?;






-- Inserir subCategoria -- 
insert into tabela_subCategoria ( categoriaSub )
	values (?);
    
    



-- Inserir um novo produto --
insert into tabela_produtos ( nome, preco, categoria_id, estoque, composicao, detalhes )
					 values ( 'ksdfajhsd', 437, 1, 264, 'GDKAGSAagkas', 'kaJHFDSKJAHGDKFAJFSKH');
                     
  
  
  
  
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

  
  
  
  
  
 update  tabela_produtos
    set  categoria_id = ?,
		 nome = ?,
         preco = ?,
         estoque = ?,
         composicao = ?,
         detalhes = ?
  where produto_id = ?;


  



delete from  tabela_produtos
      where  produto_id = ?;


  
                     
                               
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