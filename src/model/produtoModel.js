const pool = require('../config/db');

const produtoModel = {

    /**
     * Seleciona todos os produtos cadastrados na tabela
     * 
     * 
     * @async
     * @function
     * @returns Retorna o resultado com um array de objetos, cada objeto representa um registro da tabela.
     * 
     * @example
     * const produtos = await produtoModel.selecionarTodos();
     * //Saída esperada
     * 
     * [
     *      {id_produto: 1, descricao: "Teclado", valor: 150.00},
     *      {id_produto: 2, descricao: "mouse", valor: 399.99}
     * ] 
     */

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Seleciona um produto de acordo com o id_produto especificado
     * @param {*} id Identificador que deve ser pesquisado no banco de dados
     * @returns {Promise<Array<Object>>} Retorna os objetos da tabela com o mesmo identificador escolhido
     * 
     * @example
     * const produto = await produtoModel.selecionarPorId(1);
     * console.log(produto)
     * //Resultado esperado
     * [{id_produto: 1, descricao "teclado", valor: 150.00}]
     */
    selecionarPorId: async (id) => {
        const sql = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    inserirProduto: async (descricao, valor) =>{
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?, ?);';
        const values = [descricao, valor];
        const [rows] = await pool.query(sql, values);
        return rows;
    }



};

module.exports = { produtoModel }