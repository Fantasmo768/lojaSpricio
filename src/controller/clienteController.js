const { clienteModel } = require("../model/clienteModel");

const clienteController = {
    buscarTodosClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.selecionarTodosClientes();

            if (clientes.length === 0) {
                return res.status(200).json({ message: "Nenhum cliente cadastrado na tabela" });
            }

            return res.status(200).json({ message: "Usuários:", clientes })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    criarCliente: async (req, res) => {

        try {
            const { nome_cliente, cpf_cliente } = req.body;

            if (!nome_cliente || !cpf_cliente || !isNaN(nome_cliente) || cpf_cliente.length !== 11 || nome_cliente.length < 3) {
                return res.status(405).json({ message: "Algum dos dois valores não foi inserido ou foi inserido de maneira inválida" });
            }


            const clienteAdicionado = await clienteModel.adicionarCliente(nome_cliente, cpf_cliente);

            if (clienteAdicionado.affectedRows === 1 && clienteAdicionado.insertId !== 0) {
                return res.status(201).json({ message: "Cliente adicionado com sucesso", data: clienteAdicionado })
            } else {
                throw new Error (`Falha ao adicionar o cliente`);
            }
        } catch (error) {
            console.error(error);

            if(error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({message: "Este cpf já existe no sistema"});
            }

            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    }
}

module.exports = { clienteController }