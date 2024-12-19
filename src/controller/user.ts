import { Request, Response } from 'express';
import express from 'express';
import { userService } from '../services/user';

const userController = {
    createUser: async (req: Request, res: Response): Promise<void> => {
        const { id_usuario, email, senha, nome, role } = req.body;
        try {
            const retorno = await userService.createUser(id_usuario, email, senha, nome, role);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o usuário.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuario:', error);
            res.status(500).send('Ocorreu um erro no servidor.');
        }
    },

    getUserById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        console.log("ID recebido na rota:", id)
    
        try {
            const retorno = await userService.getUserById(id);
            console.log(retorno)
            if (!retorno) {
                console.log("Usuario nao encontrado no serviço para o ID:", id)
                res.status(404).send("Usuario nao encontrado.")
            } else {
                console.log("Usuário encontrado e retornado:", retorno)
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error("Erro ao buscar usuario no controller:", error)
            res.status(500).send("Ocorreu um erro no servidor.")
        }
    }
    
}

export default userController;
