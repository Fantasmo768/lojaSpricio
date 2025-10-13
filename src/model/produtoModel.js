const pool = require ('../config/db');

const produtoModel={

    //Selecionar todos os produtos

    selecionarTodos: async()=>{
        const sql= 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    selecionarPorId: async(id)=>{
        const sql = 'SELECT FROM produtos WHERE id = ?';
        values = [id];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
    
};

module.exports = {produtoModel}