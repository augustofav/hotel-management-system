const express = require('express')
const app = express()
import { response } from 'express';
import { db } from '../config/database';
import { format } from 'date-fns';
const cron = require('node-cron');
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function createRoom(hotelId: number,
    roomNumber: string,
    type: string,
    price: number
): Promise<any> {
    try {
        if (!hotelId || !roomNumber || !type || !price) {
            return 'Campos obrigatorios'
        }

        if (price < 0) {
            return 'Preço invalido'
        }

        await prisma.room.create({
            data: {
                hotelId,
                roomNumber,
                type,
                price,
                status: 'available',
            },
        });

        return 'Quarto criado com sucesso'
    } catch (error) {
        console.error('Erro ao criar o quarto:', error)
        return 'Erro ao criar o quarto. Tente novamente mais tarde.'
    }
}
async function rentRoom(roomId: number, endDate: Date, startDate: Date, userid: number): Promise<any> {
    try {
        if (!roomId || !startDate || !endDate || !userid || new Date(startDate) > new Date(endDate)) {
            return 'dados invalidos'
        }


        const existingReservation = await prisma.room.findFirst({
            where: {
                id: roomId,
                status: 'booked',
            },
        });

        if (existingReservation) {
            return 'Quarto ja reservado'
        }

        await prisma.room.updateMany({
            where: { id: roomId },
            data: {
                status: 'booked',
                startDate,
                endDate,
                userId: userid,
            },
        });


        return 'quarto alugado com sucesso'
    } catch (error) {
        console.error('erro ao alugar o quarto', error)
        return 'erro ao alugar o quarto'
    }
}


cron.schedule('*/1 * * * *', async () => {
    try {
        await prisma.room.updateMany({
            where: {
                status: 'booked',
                endDate: {
                    lte: new Date(),
                },
            },
            data: {
                status: 'available',
                startDate: null,
                endDate: null,
                userId: null,
            },
        });
    } catch (error) {
        console.error('Erro ao liberar quartos', error)
    }
}
)


async function getAllRoomsAvailable(): Promise<any[]> {
    try {

        const rooms = await prisma.room.findMany({
            where: {
                status: 'available',
            },
        });

        return rooms;
    } catch (error) {
        console.error("erro ao buscar", error);
        throw error;

    }
}

async function deleteRoom(roomId: number): Promise<any> {
    try {

        await prisma.room.delete({
            where: { id: roomId },
        });

        return 'Quarto removido com sucesso';
    } catch (error) {
        console.error('Erro ao remover o quarto', error);
        return 'Erro ao remover o quarto';
    }
}

async function updateRoom(roomId: number, hotelId: number,
    roomNumber: string,
    type: string,
    price: number): Promise<any> {
    try {
        if (!hotelId || !roomNumber || !type || !price) {
            return 'Campos obrigatorios'
        }

        if (price < 0) {
            return 'Preço invalido'
        }
        await prisma.room.update({
            where: { id: roomId },
            data: {
                hotelId,
                roomNumber,
                type,
                price,
            },
        });


        return 'Quarto atualizado com sucesso'
    } catch (error) {
        console.error('Erro ao atualizar o quarto:', error)
        return 'Erro ao atualizar o quarto. Tente novamente mais tarde.'
    }
}

async function getRoomById(roomId: number): Promise<any> {
    try {

        const room = await prisma.room.findUnique({
            where: { id: roomId },
        });


        return room
    } catch (error) {
        console.error('Erro ao buscar o quarto', error)
        return 'Erro ao buscar o quarto'
    }
}

interface RoomFilter {
    lowPrice: number
    highPrice: number
}

async function filterRoom(filter: RoomFilter, type: string): Promise<any[]> {
    try {
        const { lowPrice, highPrice } = filter

        const rooms = await prisma.room.findMany({
            where: {
                price: {
                    gte: lowPrice,
                    lte: highPrice,
                },
                type: type,
            },
        });


        return rooms
    } catch (error) {
        console.error("Erro ao filtrar os quartos", error)
        throw error
    }
}

async function getRoomsByHotel(hotelId: number): Promise<any[]> {
    try {

        const rooms = await prisma.room.findMany({
            where: {
                hotelId,
            },
        });

        return rooms
    } catch (error) {
        console.error("Erro ao obter quartos por hotel", error)
        throw error
    }
}

async function cancelReservation(roomId: number): Promise<string> {
    try {
        await prisma.room.updateMany({
            where: { id: roomId },
            data: {
                status: 'available',
                startDate: null,
                endDate: null,
                userId: null,
            },
        });


        return 'Reserva cancelada com sucesso'
    } catch (error) {
        console.error('Erro ao cancelar a reserva', error)
        return 'Erro ao cancelar a reserva'
    }
}
async function existingId(id: number): Promise<boolean> {
    try {
        const result = await prisma.room.findUnique({
            where: { id: id },
        });

        return result ? true : false
    } catch (error) {
        console.error('Erro ao verificar se o quarto existe', error)
        return false
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
    getRoomsByHotel,
    cancelReservation,
    existingId
};


