const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../db.js'
import bcrypt from 'bcrypt'

async function createUser(
    id_usuario: string,
    email: string,
    senha: string,
    nome: string,
    role: string
): Promise<any> {
    let res

    try {

        if (!email || !senha || !nome) {
            res = 'Campos obrigatorios: email, senha e nome'
            return res
        }

        if (!['admin', 'customer'].includes(role)) {
            res = 'usuario invalido Permitidos: admin, customer'
            return res
        }

       
        const hashedPassword = await bcrypt.hash(senha, 10)

        
        await db.query(
            "INSERT INTO usuario (id, email, password, name, role) VALUES ($1, $2, $3, $4, $5)",
            [parseInt(id_usuario), email, hashedPassword, nome, role]
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
        res = "Ocorreu um erro ao criar o usuario"
        return res
    }
}


async function getUserById(id: string): Promise<any> {
    try {
        const result = await db.query("SELECT id, email, name, role FROM usuario WHERE id = $1", [id])
        if (result.rows.length > 0) {
            return result.rows[0]
        }
        return null
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar o usuario")
    }
}
async function checkExistingId(id: string): Promise<boolean> {
    try {
        const result = await db.query("SELECT id FROM usuario WHERE id = $1", [id])
       const check = result.rows.length > 0
       if(check === true){
        console.log("id existente")
       }
       else{
        console.log("id não existente")
       }
    return check;
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
