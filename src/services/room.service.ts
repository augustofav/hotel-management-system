const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';
import { format } from 'date-fns';
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

        if(price < 0){
            return 'Preço invalido'
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
        if (!roomId || !startDate || !endDate || new Date(startDate) > new Date(endDate) || new Date(startDate) < new Date()) {
            return 'dados invalidos'
        }

        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd HH:mm:ss')
        const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd HH:mm:ss')

        const [existingReservation]: any = await db.query(
            "SELECT status FROM rooms WHERE id = ? AND status = 'booked'",
            [roomId]
        )

        await db.query(
            "UPDATE rooms SET status = 'booked', start_date = ?, end_date = ? WHERE id = ?",
            [formattedStartDate, formattedEndDate, roomId]
        )

        return 'quarto alugado com sucesso'
    } catch (error) {
        console.error('erro ao alugar o quarto', error)
        return 'erro ao alugar o quarto'
    }
}


cron.schedule('*/1 * * * *', async () => {
    try {
        await db.query(`
            UPDATE rooms 
            SET status = 'available', start_date = NULL, end_date = NULL
            WHERE end_date <= NOW() AND status = 'booked'
        `)
    } catch (error) {
        console.error('Erro ao liberar quartos', error)
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

    async function deleteRoom(roomId: string): Promise<any> {
        try {
            await db.query("DELETE FROM rooms WHERE id = ?", [roomId]);
            return 'Quarto removido com sucesso';
        } catch (error) {
            console.error('Erro ao remover o quarto', error);
            return 'Erro ao remover o quarto';
        }
    }
    async function updateRoom(roomId: string, hotelId: number, 
        roomNumber: string, 
        type: string, 
        price: number): Promise<any> {
        try {
            if(!hotelId || !roomNumber || !type || !price){
                return 'Campos obrigatorios'
            }
    
            if(price < 0){
                return 'Preço invalido'
            }
            
            await db.query(
                "UPDATE rooms SET hotel_id = ?, room_number = ?, type = ?, price = ? WHERE id = ?",
                [hotelId, roomNumber, type, price, roomId]
            )
    
            return 'Quarto atualizado com sucesso'
        } catch (error) {
            console.error('Erro ao atualizar o quarto:', error)
            return 'Erro ao atualizar o quarto. Tente novamente mais tarde.'
        }
    }
    async function getRoomById(roomId: string): Promise<any> {
        try {
            const [room]: any = await db.query(
                "SELECT * FROM rooms WHERE id = ?",
                [roomId]
            )
    
            return room[0]
        } catch (error) {
            console.error('Erro ao buscar o quarto', error)
            return 'Erro ao buscar o quarto'
        }
    }
    interface RoomFilter {
        lowPrice: number;
        highPrice: number;
    }

    async function filterRoom(filter: RoomFilter, type: string): Promise<any[]> {
        try {
            const { lowPrice, highPrice, } = filter;
            if(type === "Single") {
                const [rooms]: any = await db.query(
                    "SELECT * FROM rooms WHERE price BETWEEN ? AND ? WHERE type = 'Single'",
                    [lowPrice, highPrice]
                ); 
                return rooms
            }
            else{
                const [rooms]: any = await db.query(
                    "SELECT * FROM rooms WHERE price BETWEEN ? AND ? WHERE type = 'Double'",
                    [lowPrice, highPrice]
                );
                return rooms
            }
        } catch (error) {
            console.error('Erro ao filtrar os quartos', error);
            throw error;
        }
    }
    
    


export const roomService = {
    createRoom,
    rentRoom,
    getAllRoomsAvailable,
    deleteRoom,
    updateRoom,
    getRoomById,
    filterRoom,

}
