const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';


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

        if (!['admin', 'customer'].includes(role)) {
            return 'usuario invalido Permitidos: admin, customer'
        }
        await db.query(
            "INSERT INTO usuario (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)",
            [parseInt(id_usuario), email, senha, nome, role]
        )
        const response = await getUserById(id_usuario)
        return {
            id: response.id,
            email: response.email,
            name: response.name,
            role: response.role
        }
    } catch (error) {
        console.error(error)
        return "Ocorreu um erro ao criar o usuario"
    }
}

async function getUserById(id: string): Promise<any> {
    try {

        const [result]: any = await db.query(
            "SELECT id, email, name, role FROM usuario WHERE id = ?",
            [id]
        )
        if (result.length > 0) {
            return result[0]
        }
        return null
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar o usuario")
    }
}

async function checkExistingId(id: string): Promise<boolean> {
    try {
        const [result]: any = await db.query(
            "SELECT id FROM usuario WHERE id = ?",
            [id]
        )
        const check = result.length > 0
        if (check) {
            console.log("id existente")
        } else {
            console.log("id nao existente")
        }
        return check
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao verificar se usuario ja existe")
    }
}

async function deleteUser(id: string): Promise<any> {
    try {
        const user = await getUserById(id)
        if (!user) {
            return 'Usuário não encontrado'
        }

        await db.query(
            "DELETE FROM usuario WHERE id = ?",
            [id]
        );
        return 'Usuário removido com sucesso'
    } catch (error) {
        console.error("Erro ao remover usuário", error)
        return "Erro ao remover usuário"
    }
}

async function getAllUsers(role?: string): Promise<any[]> {
    try {
        const query = role
            ? "SELECT id, email, name, role FROM usuario WHERE role = ?"
            : "SELECT id, email, name, role FROM usuario"
        const [result]: any = await db.query(query, role ? [role] : [])
        return result
    } catch (error) {
        console.error("Erro ao buscar todos os usuários", error)
        throw new Error("Erro ao buscar todos os usuários")
    }
}
async function getUserRooms(idUser: string): Promise<any> {
    try {
        const [result]: any = await db.query(
            "SELECT * FROM rooms WHERE user_id = ?",
            [idUser]
        )
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
    checkExistingId,
    deleteUser,
    getAllUsers
}
