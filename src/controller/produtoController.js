const { produtoModel } = require("../model/produtoModel.js")
const express = require('express');
const app = express();

const produtoController = {
    /**
     * Retorna os produtos cadastrados no banco de dados
     * Rota: GET /produtos
     * @async
     * @function buscarTodosProdutos
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<object>} Conteúdo com os dados da requisição
     */
    buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarTodos();

            if (resultado.length === 0) {
                return res.status(200).json({ message: "A tabela selecionada não contém dados" });
            }

            return res.status(200).json({ message: "Dados: ", resultado })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    /**
     * Retorna o produto cadastrado no banco de dados com id pesquisado
     * Rota: GET /produtos/:id
     * @async
     * @function buscarProdutoPorId
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Array<Object>>} Conteúdo com os dados da requisição
     */

    buscarProdutoPorId: async (req, res) => {
        try {
            const id = req.params.id;

            const idNum = Number(id);

            if (!Number.isInteger(idNum) || !idNum) {
                return res.status(400).json({ message: "Insira um número inteiro" });
            }

            let resultado = await produtoModel.selecionarPorId(id);

            return res.status(200).json({message: "Usuário:", resultado});

        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    adicionarProduto: async (req, res) =>{

        const {descricao, valor} = req.body;
        const valorNum = parseFloat(valor)

        if (isNaN(valorNum) || !valorNum || !descricao) {
            return res.status(400).json({message: "Insira os dois valores de maneira adequada"});
        }
        
        let resultado = await produtoModel.inserirProduto(descricao, valor);
        
        if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
            return res.status(201).json({message: "Registro incluido com sucesso", result: resultado})
        } else {
            throw new Error('ocorreu um erro ao incluir o registro')
        }
    }
};

module.exports = { produtoController };