const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';

async function createRoom(hotelId: number, 
    roomNumber: string, 
    type: string, 
    price: number
):  Promise<any> {
    try {
        if(!hotelId || !roomNumber || !type || !price){
            return 'Campos obrigatorios'
        }
        
        await db.query(
            "INSERT INTO rooms (hotel_id, room_number, type, price) VALUES (?, ?, ?, ?)",
            [hotelId, roomNumber, type, price]
        )

        return 'Quarto criado com sucesso'
    } catch (error) {
        console.error('Erro ao criar o quarto:', error)
        return 'Erro ao criar o quarto. Tente novamente mais tarde.'
    }
}
async function rentRoom(roomId: string): Promise<any> {
    try {
        if (!roomId) {
            return 'ID do quarto e obrigatorio'
        }

        await db.query(
            "UPDATE rooms SET status = 'rented' WHERE id = ?",
            [roomId]
        )

        return 'Quarto alugado com sucesso'
    } catch (error) {
        console.error('Erro ao alugar o quarto:', error)
        return 'Erro ao alugar o quarto'
    }
}
async function getAllRoomsAvailable(): Promise<any[]> {
    try {
        const [rooms]: any = await db.query(
            "SELECT * FROM rooms WHERE status = 'available'"
        );
        return rooms;
    } catch (error) {
        console.error("erro ao buscar", error);
        throw error;
  
    }}


export const roomService = {
    createRoom,
    rentRoom,
    getAllRoomsAvailable,
}
