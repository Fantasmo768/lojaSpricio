const { clienteModel } = require("../model/clienteModel");

const clienteController = {
    buscarTodosClientes: async (req, res) => {
        try {

            const id_cliente = req.query.id_cliente;

            const idNum = Number(id_cliente)

            let clientes;

            if (!id_cliente) {
                clientes = await clienteModel.selecionarTodosClientes();
            } else {
                if (!Number.isInteger(idNum)) {
                    return res.status(405).json({ message: "O id não é válido" });
                }
                clientes = await clienteModel.selecionarClienteId(id_cliente);
                if (clientes.length === 0) {
                    return res.status(404).json({ message: "Cliente não encontrado" });
                }
            }

            if (clientes.length === 0) {
                return res.status(200).json({ message: "Nenhum cliente cadastrado na tabela" });
            }

            return res.status(200).json({ message: "Usuários:", clientes })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    // selecionarPorId: async (req, res) => {
    //     try {
    //         const id_cliente = req.query.id_cliente;

    //         const idNum = Number(id_cliente);

    //         if (!Number.isInteger(idNum)) {
    //             return res.status(405).json({ message: "O id não é válido" })
    //         }

    //         const clienteConsultado = await clienteModel.selecionarClienteId(id_cliente);

    //         if (clienteConsultado.length === 0) {
    //             return res.status(404).json({ message: "Cliente não ecnontrado" });
    //         }

    //         return res.status(200).json({ message: "Cliente encontrado", clienteConsultado })

    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
    //     }
    // },

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
                throw new Error(`Falha ao adicionar o cliente`);
            }
        } catch (error) {
            console.error(error);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Este cpf já existe no sistema" });
            }

            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },

    alterarCliente: async (req, res) => {
        try {
            const id_cliente = req.params.id_cliente;
            const { nome_cliente, cpf_cliente } = req.body;

            const idNum = Number(id_cliente);

            if (!Number.isInteger(idNum)) {
                return res.status(405).json({ message: "O id não é válido" });
            }

            const clienteAtual = await clienteModel.selecionarClienteId(id_cliente);

            if (clienteAtual.length === 0) {
                return res.status(404).json({ message: "Cliente não encontrado" })
            }

            const novoNome = nome_cliente ?? clienteAtual[0].nome_cliente;
            const novoCpf = cpf_cliente ?? clienteAtual[0].cpf_cliente;

            if (!novoNome || !novoCpf || !isNaN(novoNome) || novoCpf.length !== 11 || novoNome.length < 3) {
                return res.status(405).json({ message: "Você inseriu algum valor de maneira inadequada" });
            }

            const clienteAtualizado = await clienteModel.atualizarCliente(novoNome, novoCpf, id_cliente);

            if (clienteAtualizado.length === 0 || clienteAtualizado.changedRows === 0) {
                throw new Error("Erro ao atualizar o cliente");
            }

            return res.status(200).json({ message: "Cliente atualizado com sucesso", data: clienteAtualizado });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    },
    excluirCliente: async (req, res) => {

        try {
            const id_cliente = req.params.id_cliente;

            const idNum = Number(id_cliente);

            if (!Number.isInteger(idNum)) {
                return res.status(405).json({ message: "Insira um id válido" });
            }

            const clienteSelecionado = await clienteModel.selecionarClienteId(id_cliente);

            if (clienteSelecionado.length === 0) {
                return res.status(404).json({ message: "Cliente não localizado" });
            } else {
                const clienteDeletado = await clienteModel.deletarCliente(id_cliente);

                if (clienteDeletado.affectedRows === 1) {
                    return res.status(200).json({ message: "Cliente excluído com sucesso", data: clienteDeletado });
                } else {
                    throw new Error('Não foi possível excluir o cliente')
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "Erro interno do servidor", errorMessage: error.message });
        }
    }
}

module.exports = { clienteController }