const pool = require('../config/db');

const clienteModel = {

    selecionarTodosClientes: async() => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    adicionarCliente: async(nome, cpf)=>{
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [nome, cpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
    
}

module.exports = {clienteModel}