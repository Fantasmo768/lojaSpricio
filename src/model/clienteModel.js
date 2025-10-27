const pool = require('../config/db');

const clienteModel = {

    selecionarTodosClientes: async() => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarClienteId: async (id) =>{
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?'
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    adicionarCliente: async(nome, cpf)=>{
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [nome, cpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    atualizarCliente: async (nome, cpf, id) =>{
        const sql = 'UPDATE clientes SET nome_cliente = ?, cpf_cliente = ? WHERE id_cliente = ?;';
        const values = [nome, cpf, id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deletarCliente: async (id) =>{
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?;';
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
    
}

module.exports = {clienteModel}