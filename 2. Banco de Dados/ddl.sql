create database joyeriacristallo;
use joyeriacristallo;


drop database joyeriacristallo;


create table tabela_adm ( 
	adm_id							int primary key auto_increment,
	nome							varchar(100),
    email							varchar(100),
    senha							varchar(100)
);







create table tabela_categoria (
	categoria_id					int primary key auto_increment,
    categoria						char(100)
);






create table tabela_subCategoria (
	subCategoria_id					int primary key auto_increment,
    categoriaSub					varchar(100)
);






create table tabela_produtos ( 
	produto_id						int primary key auto_increment,
    nome							varchar(100),
    preco							int,
    disponivel						boolean,
    estoque							int,
	tamanho							int,
    composicao						varchar(5000),
	detalhes						varchar(5000),
	categoria_id					int,
    subCategoria_id					int,

    
    foreign key ( categoria_id ) references tabela_categoria ( categoria_id ),
	foreign key ( subCategoria_id ) references tabela_subCategoria ( subCategoria_id )
);










create table tabela_imagem_produto ( 
	imagem_produto_id				int primary key auto_increment,
    produto_id						int,
    imagem							varchar(100),
    
    
	foreign key ( produto_id ) references tabela_produtos  ( produto_id )
);










create table tabela_cliente (
	cliente_id						int primary key auto_increment,
	cliente 						varchar(100),
    email							varchar(100),
    senha							varchar(100),
    CadastroPessoa					int,
    telefone						varchar(100),
    nascimento						date,
	imagem							varchar(100)
);







create table tabela_pedidos (
	pedido_id						int primary key auto_increment,
	cliente_id						int,
	total							decimal(5, 2),

    foreign key ( cliente_id ) references tabela_cliente ( cliente_id )
);







create table tabela_pedido_item (
	pedido_item_id					int primary key auto_increment,
    produto_id						int,
    pedido_id						int,
    itens_quantidade				int,
    
    
	foreign key ( produto_id ) references tabela_produtos ( produto_id ),
    foreign key ( pedido_id ) references tabela_pedidos ( pedido_id )
);







create table tabela_endereco (
	endereco_id						int primary key auto_increment,
    nome							varchar(100),
    cep								varchar(100),
    enderecoRua						varchar(100),
    numeroCasa						int,
    complemento						varchar(100),
    cidade							varchar(100),
    estado							varchar(100),
    bairro							varchar(100)
);