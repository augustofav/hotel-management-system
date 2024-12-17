
import express from 'express';
import { userService } from '../services/user';

const userController = {
    createUser: async (req, res): Promise<void> => {
        const {id_usuario, email, senha, nome, role} = req.body;
        try {
            const retorno = await userService.createUser(id_usuario, email, senha, nome, role)
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o usuário.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o usuário.');
        }
        }
}
export default userController