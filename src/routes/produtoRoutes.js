const express = require('express');
const produtoRoutes = express.Router();

const {produtoController} = require('../controller/produtoController');

produtoRoutes.get("/produtos", produtoController.buscarTodosProdutos);
produtoRoutes.get("/produtos/:id", produtoController.buscarProdutoPorId);
produtoRoutes.post("/produtos/adicionar", produtoController.adicionarProduto)
produtoRoutes.put("/produtos/atualizar/:id", produtoController.alterarProduto)
produtoRoutes.delete("/produtos/excluir/:id", produtoController.excluirProduto)

module.exports = {produtoRoutes};