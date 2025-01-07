import { Request, Response } from 'express';
import express from 'express';
import { userService } from '../services/user.service';

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
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor.');
        }
    },

    getUserById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const retorno = await userService.getUserById(Number(id));
            if (!retorno) {
                res.status(404).send('Usuário não encontrado.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor.');
        }
    },

    deleteUser: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const retorno = await userService.deleteUser(Number(id));
            if (!retorno) {
                res.status(404).send('Usuário não encontrado.');
            } else {
                res.status(200).send('Usuário excluído com sucesso.');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor.');
        }
    },
    getAllUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            const retorno = await userService.getAllUsers();
            res.status(200).send(retorno);
        } catch (error) {
            console.error('Erro ao buscar todos os usuários:', error);
            res.status(500).send('Ocorreu um erro no servidor.');
        }
    },
    getUserRooms: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const retorno = await userService.getUserRooms(Number(id));
            res.status(200).send(retorno);
        } catch (error) {
            console.error('Erro ao buscar salas do usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor.');
        }
    },

};




export default userController;
