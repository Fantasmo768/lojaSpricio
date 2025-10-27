const pool = require('../config/db');

const produtoModel = {

    /**
     * Seleciona todos os produtos cadastrados na tabela
     * 
     * 
     * @async
     * @function selecionarTodos
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
     * @async
     * @function selecionarPorId
     * Seleciona um produto de acordo com o id_produto especificado
     * @param {Number} id Identificador que deve ser pesquisado no banco de dados
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

    /**
     * @async
     * @function inserirProduto
     * @param {String} descricao 
     * @param {Number} valor 
     * 
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades que representam as infomações do produto a ser adicionado
     * 
     * @example
     * let resultado = await produtoModel.inserirProduto('ProdutoTeste', 123.99);
     * console.log(resultado);
     * //Resultado esperado
     * "Result": {
     * "fieldCount":0,
     * "affectedRows": 1,
     * "insertId": 11,
     * "info": "",
     * "serverStatus": 2,
     * "warningStatus": 0,
     * "changedRows": 0
     * }
     */

    inserirProduto: async (descricao, valor) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?, ?);';
        const values = [descricao, valor];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * @async
     * @function atualizarProduto
     * @param {String} descricao 
     * @param {Number} valor 
     * @param {Number} id 
     * @returns {Promise<object>} Retorna um objeto contendo as informações que foram alteradas pelo update 
     * 
     * @example 
     * 
     * let resultado = await produtoModel.atualizarProduto("Mouse", 125, 1);
     * 
     * console.log(resultado);
     * 
     * //Resultado esperado
     * {
        "resultado": {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 0,
            "info": "Rows matched: 1  Changed: 1  Warnings: 0",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 1
            }
        }
     */

    atualizarProduto: async (descricao, valor, id) => {
        const sql = 'UPDATE produtos SET descricao = ?, valor = ? WHERE id_produto = ?;';
        const values = [descricao, valor, id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * @async
     * @function deletarProduto
     * @param {Number} id 
     * @returns {Promise<Object>} Retorna o objeto contendo as informações do delete
     * @example
     * const resultado = await alunoModel.deletarProduto(1);
     * console.log(resultado)
     * 
     * //Resultado esperado
        * "data": {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 0,
            "info": "",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 0
	        }
        }
     */

    deletarProduto: async (id) =>{
        const sql = 'DELETE FROM produtos WHERE id_produto = ?';
        const values = [id];
        const [rows] = await pool.query(sql, values)
        return rows;
    }


};

module.exports = { produtoModel }