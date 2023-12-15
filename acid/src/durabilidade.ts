import db from "../db";

export async function finalizarPedido(pedidoId: number) {
    await db.transaction(async trx => {
        // Atualiza o status do pedido para 'finalizado'
        await trx('pedidos').where({ id: pedidoId }).update({ status: 'Finalizado' });
    });

    // Após o commit da transação, o status atualizado do pedido é durável.
    console.log('Pedido finalizado com sucesso e registrado permanentemente.');
}

(async()=> {
    await finalizarPedido(4);
})()