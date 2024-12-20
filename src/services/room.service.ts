const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';
const cron = require('node-cron');




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
async function rentRoom(roomId: string, endDate: Date, startDate: Date): Promise<any> {
    try {
        if (!roomId || !startDate || !endDate) {
            return 'id do quarto, data de inicio e data de fim sao obrigatorios'
        }

        const [existingReservation]: any = await db.query(
            "SELECT status FROM reservas WHERE room_id = ? AND status = 'booked'",
            [roomId]
        )



        await db.query(
            "UPDATE reservas SET status = 'booked', start_date = ?, end_date = ? WHERE room_id = ?",
            [startDate, endDate, roomId]
        )

        return 'quarto alugado com sucesso'
    } catch (error) {
        console.error('erro ao alugar o quarto', error)
        return 'erro ao alugar o quarto'
    }
}


    cron.schedule('*/1 * * * *', async () => {
    try {
        const [reservas]: any = await db.query(
            "SELECT room_id FROM reservas WHERE status = 'booked' AND end_date <= NOW()"
        )

        for (const reserva of reservas) {
            await db.query(
                "UPDATE reservas SET status = 'available' WHERE room_id = ?",
                [reserva.room_id]
            )
            console.log(`status do quarto ${reserva.room_id} atualizado'`)
        }
    } catch (error) {
        console.error('erro ao atualizar status dos quartos', error)
    }
})

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
