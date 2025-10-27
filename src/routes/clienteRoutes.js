const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controller/clienteController');

clienteRoutes.get("/clientes", clienteController.buscarTodosClientes);
clienteRoutes.get("/clientes/:id_cliente", clienteController.selecionarPorId);
clienteRoutes.post("/clientes/adicionar", clienteController.criarCliente);
clienteRoutes.put("/clientes/atualizar/:id_cliente", clienteController.alterarCliente);
clienteRoutes.delete("/clientes/deletar/:id_cliente", clienteController.excluirCliente)
module.exports = {clienteRoutes}