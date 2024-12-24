import { Request, Response } from 'express';
import express from 'express';
import { roomService } from '../services/room.service';

const roomController = {
    createRoom: async (req: Request, res: Response): Promise<void> => {
        const { hotelId, roomNumber, type, price } = req.body;

        try {
            if (!hotelId || !roomNumber || !type || !price) {
                res.status(400).send('Campos obrigatórios hotelId, roomNumber, type, price.')
                return
            }

            const result = await roomService.createRoom(hotelId, roomNumber, type, price)

            res.status(200).send(result)
        } catch (error) {
            console.error('Erro ao criar o quarto:', error)
            res.status(500).send('Ocorreu um erro ao criar o quarto.')
        }
    },

    rentRoom: async (req: Request, res: Response): Promise<void> => {
        const { roomId } = req.params
        const { endDate, startDate } = req.body
        console.log(roomId)

        try {
            if (!roomId) {
                res.status(400).send('id e obrigatorio')
                return
            }
            const result = await roomService.rentRoom(roomId, endDate, startDate)

            res.status(200).send(result)
            
        } catch (error) {
            console.error('Erro ao alugar o quarto:', error)
            res.status(500).send('Ocorreu um erro ao alugar o quarto.')
        }
    },


    getAllRoomsAvailable: async (req: Request, res: Response): Promise<void> => {
        try {
            const rooms = await roomService.getAllRoomsAvailable()
            res.status(200).send(rooms)
        } catch (error) {
            console.error('Erro ao buscar quartos:', error)
            res.status(500).send('Ocorreu um erro ao buscar quartos.')
        }
    },
    deleteRoom: async (req: Request, res: Response): Promise<void> => {
        try {
            const { roomId } = req.params
            const result = await roomService.deleteRoom(roomId)
            res.status(200).send(result)
        } catch (error) {
            console.error('Erro ao deletar o quarto:', error)
            res.status(500).send('Ocorreu um erro ao deletar o quarto.')
        }
},  updateRoom: async (req: Request, res: Response): Promise<void> => {
    const { roomId } = req.params
    const { hotelId, roomNumber, type, price } = req.body

    try {
        if (!hotelId || !roomNumber || !type || !price) {
            res.status(400).send('Campos obrigatórios hotelId, roomNumber, type, price.')
            return
        }

        const result = await roomService.updateRoom(roomId, hotelId, roomNumber, type, price)

        res.status(200).send(result)
    } catch (error) {
        console.error('Erro ao atualizar o quarto:', error)
        res.status(500).send('Ocorreu um erro ao atualizar o quarto.')
    }
}}

export default roomController;


