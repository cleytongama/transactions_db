import db from '../db'

export const main = async ()=>{
  try {
    const result:any = await db.raw('SELECT 1+1 AS result');
    console.log("Conexão bem-sucedida. Resultado: ", result.rows[0]); 
    return result.rows[0];
  }catch(err){
    console.error("Falha ao conectar ao banco de dados:", err);
    throw err;
  }finally {
    await db.destroy();
  }
}