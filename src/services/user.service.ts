const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


async function createUser(
    id_usuario: string,
    email: string,
    senha: string,
    nome: string,
    role: string
): Promise<any> {
    try {
        if (!email || !senha || !nome) {
            return 'Campos obrigatorios: email, senha e nome'
        }


        await prisma.usuario.create({
            data: {
                email,
                password: senha,
                name: nome,
            },
        });

        return 'Usuario criado com sucesso'
    } catch (error) {
        console.error(error)
        return "Ocorreu um erro ao criar o usuario"
    }
}

async function getUserById(id: number): Promise<any> {
    try {

        const user = await prisma.usuario.findUnique({
            where: { id },
        });

        return user
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar o usuario")
    }
}

async function deleteUser(id: number): Promise<any> {
    try {
        const user = await getUserById(id)
        if (!user) {
            return 'Usuário nao encontrado'
        }

        await prisma.usuario.delete({
            where: { id },
        });

        return 'Usuario removido com sucesso'
    } catch (error) {
        console.error("Erro ao remover usuário", error)
        return "Erro ao remover usuário"
    }
}

async function getAllUsers(): Promise<any[]> {
    try {

        const result = await prisma.usuario.findMany()
        return result
    } catch (error) {
        console.error("Erro ao buscar todos os usuários", error)
        throw new Error("Erro ao buscar todos os usuários")
    }
}
async function getUserRooms(idUser: number): Promise<any> {
    try {

        const result = await prisma.room.findMany({
            where: {
                id: idUser,
            },

        });

        if (result.length > 0) {
            return result
        }
        return "Usuario nao possui quartos"
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar os quartos do usuario")
    }
}

export const userService = {
    createUser,
    getUserById,
    deleteUser,
    getAllUsers,
    getUserRooms
}
