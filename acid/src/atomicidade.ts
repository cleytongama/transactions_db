import db from "../db";
type Pedido = {
    produtoId: number, 
    clienteId:number, 
    quantidade:number
}

export async function processarPedido(input: Pedido) {
    try {
        await db.transaction(async trx => {

            //0) Busca produto
            const produto = await trx('produtos').where({ id: input.produtoId }).first();
            
            // 1) Verifica o estoque
            const estoque = await trx('estoque').forUpdate().where({ produto_id: input.produtoId }).first();

            if (!estoque || estoque.quantidade < input.quantidade) {
                throw new Error('Estoque insuficiente');
            }

            // 2) Atualiza o estoque
            await trx('estoque').where({ produto_id: input.produtoId }).decrement('quantidade', input.quantidade);

            // 3) Cria pedido
            const [pedido] = await trx('pedidos').insert({
                produto_id: input.produtoId,
                cliente_id: input.clienteId,
                quantidade: input.quantidade,
                status: 'Processado' // ou 'Pago'
            }).returning('id');

            // 4) Calcula o total e insere a fatura
            // Supondo que você já tenha o preço do produto disponível
            const total = input.quantidade * produto.preco;
            await trx('faturas').insert({ pedido_id: pedido.id, total, pago: true });

            // 5) Atualiza pontos de fidelidade
            await trx('fidelidade').where({ cliente_id: input.clienteId }).increment('pontos', input.quantidade * 10);
            // Se todas as operações acima forem bem-sucedidas, o commit é feito automaticamente.
        });

        console.log('Pedido processado com sucesso');
    } catch (error: any) {
        console.error('Falha ao processar pedido:', error.message);
        // Em caso de erro, o rollback é feito automaticamente.
    }
}

(async ()=> {
    const pedido:Pedido = {produtoId: 1, clienteId: 1, quantidade: 1}
    await processarPedido(pedido)
})()