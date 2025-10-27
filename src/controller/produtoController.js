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

            if (resultado.length === 0) {
                return res.status(400).json({ message: "Esse ID não existe" })
            }

            return res.status(200).json({ message: "Usuário:", resultado });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    /**
     * Adiciona produto de acordo com as informações fornecidas pelo usuário
     * Rota: POST /produtos/adicionar
     * @async
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @function incluirProduto
     * @returns {Promise<object>} Retorna o objeto inserido na tabela
     */

    adicionarProduto: async (req, res) => {
        try {
            const { descricao, valor } = req.body;
            const valorNum = parseFloat(valor)

            if (isNaN(valorNum) || !valorNum || !descricao || descricao.length < 3) {
                return res.status(400).json({ message: "Insira os dois valores de maneira adequada" });
            }

            let resultado = await produtoModel.inserirProduto(descricao, valor);

            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                return res.status(201).json({ message: "Registro incluido com sucesso", result: resultado })
            } else {
                throw new Error('ocorreu um erro ao incluir o registro')
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    /**
     * Altera as informações de um produto selecionado pelo id
     * Rota: PUT /produtos/atualizar/:id 
     * @async
     * @function alterarProduto
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Promise<object>} Retorna o produto atualizado escolhido pelo id inserido pelo usuário
     */
    alterarProduto: async (req, res) => {

        try {
            const { valor, descricao } = req.body;

            const id = Number(req.params.id);
            const valorNum = parseFloat(valor);

            if (!Number.isInteger(id)) {
                return res.status(400).json({ message: "Você não inseriu algum dos valores de maneira adequada" });
            }

            let produtoAtual = await produtoModel.selecionarPorId(id);

            if (produtoAtual.length === 0) {
                throw new Error('Registro não localizado')
            }


            const novaDescricao = descricao ?? produtoAtual[0].descricao;
            const novoValor = valor ?? produtoAtual[0].valor;

            if (isNaN(novoValor) || !isNaN(novaDescricao) || novaDescricao.trim().length < 3 || novoValor <= 0) {
                return res.status(400).json({ message: "Você inseriu algum valor de maneira incorreta" });
            }

            const resultado = await produtoModel.atualizarProduto(novaDescricao, novoValor, id);

            if (resultado.length === 0) {
                throw new Error('Registro não localizado')
            }

            if (resultado.changedRows === 0) {
                throw new Error("Occoreu um erro ao atualizar o produto");
            }

            return res.status(200).json({ message: "Sucesso ao atualizar o produto", data: resultado })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    /**
         * Exclui as informações de um produto de acordo com ID selecionado
         * Rota: DELETE /produtos/excluir/:id 
         * @async
         * @function excluirProduto
         * @param {Request} req 
         * @param {Response} res 
         * @returns {Promise<object>} Retorna o produto deletado escolhido pelo id inserido pelo usuário
         */

    excluirProduto: async (req, res) => {

        try {
            const id = req.params.id;

            const idNum = Number(id);

            if (!Number.isInteger(idNum) || !id) {
                return res.status(400).json({ message: "Insira um id válido" });
            }

            const produtoSelecionado = await produtoModel.selecionarPorId(id)

            if (produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado')
            } else {

                const resultado = await produtoModel.deletarProduto(id);

                if (resultado.affectedRows === 1) {
                    return res.status(200).json({ message: "Produto excluído com sucesso", data: resultado })
                } else {
                    throw new Error('Não foi possível excluir o produto')
                }
            }

            return res.status(200).json({ message: "Produto deletado com sucesso", data: resultado })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    }
};

module.exports = { produtoController };