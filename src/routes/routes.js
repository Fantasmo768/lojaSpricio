const express = require('express');
const router = express.Router();
//Referência do arquivo de rotas

const {produtoRoutes} = require('./produtoRoutes');

router.use("/", produtoRoutes);

module.exports = {router}