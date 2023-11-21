import conexao from "./Connection.js";






export async function CriarLogin(login) {
    const comando = `
    insert into tabela_cliente ( cliente, email, senha ) 
                        values ( ?, ?, ?)
    `;

    const [ dados ] = await conexao.query(comando, [
        login.cliente,
        login.email,
        login.senha
    ]);

    login.id = dados.insertId
    return login
};






export async function ConsultarLogin(busca) {
    const comando = `
    select	cliente_id,
            cliente,
            email,
            senha
    from tabela_cliente
    where email like ?
    `;   

    const [ dados ] = await conexao.query(comando, [
        '%' + busca + '%'
    ]);

    return dados;
};









export async function LogarUsuario(email, senha) {
    const comando = `
    select 	cliente_id,
            cliente,
            email,
            senha
    from	tabela_cliente
    where	email = ?
    and 	senha = ?
    `;   


    const [resp] = await conexao.query(comando, [email, senha]);
    return resp[0];
};





export async function AlterarUsuario(id, usuario) {
    const comando = `
    update  tabela_cliente
    set     cliente = ?,
            email = ?,
            senha = ?,
            CadastroPessoa = ?,
            telefone = ?,
            nascimento = ?
	where   cliente_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        usuario.cliente,
        usuario.email,
        usuario.senha,
        usuario.cpf,
        usuario.telefone,
        usuario.nascimento.substr(0, 10),
        id
    ]);

    return dados.affectedRows;
}








export async function DeletarUsuario(id) {
    const comando = `
        delete from     tabela_cliente
        where           cliente_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [id]);
    return dados.affectedRows;
};










export async function BuscarTodosUsuarios() {
    const comando = `
    select  cliente_id,
            cliente,
            email,
            senha,
            CadastroPessoa,
            telefone,
            nascimento
    from    tabela_cliente
    `;


    const [ dados ] = await conexao.query(comando);
    return dados;
};









export async function BuscarUsuarioId(id) {
    const comando = `
    select 	    cliente_id,
                cliente,
                email,
                senha,
                CadastroPessoa,
                telefone,
                nascimento
    from tabela_cliente
    where cliente_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [id]);
    return dados[0];
};







export async function AdicionarPedidos(pedido) {
    const comando = `
    insert into tabela_pedidos 	( cliente_id, total )
                        values	( ?, ? )
    `;
    const [ dados ] = await conexao.query(comando, [
        pedido.cliente,
        pedido.total
    ]);
    pedido.id = dados.insertId;
    return pedido;
}








export async function ConsultarCodigo(busca) {
    const comando = `
        select	        codigoProduto,
                        parcelas,
                        pedidoEntrega,
                        situacao,
                        garantia
        from 	        tabela_pedidos
        where 	        codigoProduto like ?
        order 
        by 	            pedido_id
        `;

    
    const [ dados ] = await conexao.query(comando, [
         '%' + busca + '%'
    ]);
    return dados;
};
















export async function AlterarPedido(id, pedido) {
    const comando = `
        update      tabela_pedidos
        set         codigoProduto = ?,
                    formaPagamento = ?,
                    parcelas = ?,
                    pedidoEntrega = ?,
                    situacao	 = ?,
                    garantia = ?,
                    cliente_id = ?,
                    produto_id = ?
        where       pedido_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        pedido.codigo,
        pedido.pagamento,
        pedido.parcelas,
        pedido.entrega,
        pedido.situacao,
        pedido.garantia,
        pedido.cliente,
        pedido.produto,
        id
    ]);

    return dados.affectedRows
};














export async function ExcluirPedido(id) {
    const comando = `
        delete from     tabela_pedidos
        where           pedido_id = ?
        `;

    
    const [ dados ] = await conexao.query(comando, [id])
    return dados.affectedRows
};













export async function  AdicionarItens(itens) {
    const comando = `
        insert into tabela_pedido_item ( produto_id, pedido_id, itens_quantidade )
                                values ( ?, ?, ? )
    `;

    const [ dados ] = await conexao.query(comando, [
        itens.produto,
        itens.pedido,
        itens.quantidade
    ]);

    itens.id = dados.insertId;
    return dados;
};







export async function AlterarItens(id, itens) {
    const comando = `
        update  tabela_pedido_item
        set	    produto_id = ?,
                pedido_id = ?,
                itens_quantidade = ?
        where   pedido_item_id = ?
    `;

    const [ dados ] = await conexao.query(comando, [
        itens.produto,
        itens.pedido,
        itens.quantidade,
        id
    ]);

    return dados.affectedRows;
};














export async function AdicionarEndereco(endereco) {
    const comando = `
        insert into tabela_endereco ( nome, cep, enderecoRua, numeroCasa, complemento, cidade, estado, bairro )
					         values ( ?, ?, ?, ?, ?, ?, ?, ? )
    `;

    const [ dados ] = await conexao.query(comando, [
            endereco.nome,
            endereco.cep,
            endereco.enderecoRua,
            endereco.numeroCasa,
            endereco.complemento,
            endereco.cidade,
            endereco.estado,
            endereco.bairro
    ]);

    endereco.id = dados.insertId;
    return endereco;
};











export async function BuscarCategoriaRelogio() {
    const comando = `
    select p.produto_id,
           p.nome,
           p.preco,
           p.disponivel,
           p.estoque,
           p.detalhes,
           p.composicao,
           c.categoria,
           e.categoriaSub
      from tabela_produtos as p
   inner join tabela_categoria as c 
        on p.categoria_id = c.categoria_id
   inner join tabela_subCategoria as e 
        on p.subCategoria_id = e.subCategoria_id
   where c.categoria like 'Relógio'
   order by produto_id;
    `;


    const [ dados ] = await conexao.query(comando);
    return dados;
};









export async function BuscarCategoriaEscapulario() {
    const comando = `
        select p.produto_id,
        p.nome,
        p.preco,
        p.disponivel,
        p.estoque,
        p.detalhes,
        p.composicao,
        c.categoria,
        e.categoriaSub
    from tabela_produtos as p
    inner join tabela_categoria as c 
    on p.categoria_id = c.categoria_id
    inner join tabela_subCategoria as e 
    on p.subCategoria_id = e.subCategoria_id
    where c.categoria like 'Escapulário'
    order by produto_id
    `;

    const [ dados ] = await conexao.query(comando);
    return dados;
};






export async function BuscarCategoriaAlianca() {
    const comando = `
        select p.produto_id,
		p.nome,
		p.preco,
		p.disponivel,
		p.estoque,
		p.detalhes,
		p.composicao,
		c.categoria,
        e.categoriaSub
    from tabela_produtos as p
    inner join tabela_categoria as c 
        on p.categoria_id = c.categoria_id
    inner join tabela_subCategoria as e 
        on p.subCategoria_id = e.subCategoria_id
    where c.categoria like 'Aliança'
    order by produto_id
    `;


    const [ dados ] = await conexao.query(comando);
    return dados;
};











export async function BuscarCategoriaCorrente() {
    const comando = `
    select p.produto_id,
            p.nome,
            p.preco,
            p.disponivel,
            p.estoque,
            p.detalhes,
            p.composicao,
            c.categoria,
                e.categoriaSub
    from tabela_produtos as p
    inner join tabela_categoria as c 
    on p.categoria_id = c.categoria_id
    inner join tabela_subCategoria as e 
    on p.subCategoria_id = e.subCategoria_id
    where c.categoria like 'Corrente'
    order by produto_id
    `;

    const [ dados ] = await conexao.query(comando);
    return dados;
};








export async function BuscarCategoriaPulseira() {
    const comando = `
    select p.produto_id,
            p.nome,
            p.preco,
            p.disponivel,
            p.estoque,
            p.detalhes,
            p.composicao,
            c.categoria,
            e.categoriaSub
    from tabela_produtos as p
    inner join tabela_categoria as c 
    on p.categoria_id = c.categoria_id
    inner join tabela_subCategoria as e 
    on p.subCategoria_id = e.subCategoria_id
    where c.categoria like 'Pulseira'
    order by produto_id
    `;

    const [ dados ] = await conexao.query(comando);
    return dados;
};







export async function BuscarCategoriaBrinco() {
    const comando = `
    select p.produto_id,
        p.nome,
        p.preco,
        p.disponivel,
        p.estoque,
        p.detalhes,
        p.composicao,
        c.categoria,
        e.categoriaSub
    from tabela_produtos as p
    inner join tabela_categoria as c 
    on p.categoria_id = c.categoria_id
    inner join tabela_subCategoria as e 
    on p.subCategoria_id = e.subCategoria_id
    where c.categoria like 'Brinco'
    order by produto_id
    `;

    const [ dados ] = await conexao.query(comando);
    return dados;
};



export async function BuscarCategoriaPingente() {
    const comando = `
    select  p.produto_id,
            p.nome,
            p.preco,
            p.disponivel,
            p.estoque,
            p.detalhes,
            p.composicao,
            c.categoria,
            e.categoriaSub
    from tabela_produtos as p
    inner join tabela_categoria as c 
    on p.categoria_id = c.categoria_id
    inner join tabela_subCategoria as e 
    on p.subCategoria_id = e.subCategoria_id
    where c.categoria like 'Pingente'
    order by produto_id
    `;

    const [ dados ] = await conexao.query(comando);
    return dados;
};