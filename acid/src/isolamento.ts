import db from "../db";

type Pedido = {
    produtoId: number, 
    clienteId:number, 
    quantidade:number
}
// Faça um update no estoque para ter apenas uma unidade do produto 1
// UPDATE estoque SET quantidade = 1 WHERE produto_id = 1

// Função para processar o pedido
async function processarPedido(input: Pedido) {
    await db.transaction(async trx => {
        // Bloqueia e verifica o estoque
        console.log(`Cliente: ${input.clienteId} , Comprando o produto: ${input.produtoId}`);
        const estoque = await trx('estoque').forUpdate().where({ produto_id: input.produtoId }).first();

        if (!estoque || estoque.quantidade < input.quantidade) {
            throw new Error(`Estoque insuficiente! Produto: ${input.produtoId}, Cliente: ${input.clienteId}`);
        }

        // Atualiza o estoque
        await trx('estoque').where({ produto_id: input.produtoId }).decrement('quantidade', input.quantidade);

        console.log(`Produto: ${input.produtoId}, Cliente: ${input.clienteId}`);

        // Simula um delay para demonstrar o isolamento
        await new Promise(resolve => setTimeout(resolve, 10000));
    });
}


(async ()=> {
    const pedidoClienteA:Pedido = {produtoId: 1,clienteId: 1, quantidade: 1};
    const pedidoClienteB:Pedido = {produtoId: 1,clienteId: 2, quantidade: 1};
    try{
       await Promise.all([
           processarPedido(pedidoClienteA),
           processarPedido(pedidoClienteB)
        ])
        console.log("Pedidos bem sucedidos!!");
    }catch(e){
        console.log('Error', e);
    }
})()
