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



export const userService = {
    createUser,
    getUserById,
    checkExistingId
}
