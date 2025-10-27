const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controller/clienteController');

clienteRoutes.get("/clientes", clienteController.buscarTodosClientes);
clienteRoutes.post("/clientes/adicionar", clienteController.criarCliente);

module.exports = {clienteRoutes}