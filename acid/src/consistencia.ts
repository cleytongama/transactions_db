import db from "../db";

export async function inserirFaturaInvalida() {
    try {
        await db.transaction(async trx => {
            await trx('faturas').insert({
                pedido_id: 999, // Supondo que este ID não exista na tabela 'pedidos'
                total: 100,
                pago: true
            });
        });
        console.log('Sucesso ao criar fatura!!');
    } catch (error: any) {
        console.error('Erro ao inserir fatura:', error.message);
    }
}

(async ()=> {
    await inserirFaturaInvalida()
})()