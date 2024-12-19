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
        console.log(roomId)

        try {
            if (!roomId) {
                res.status(400).send('id e obrigatorio')
                return
            }
            const result = await roomService.rentRoom(roomId)

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
    }
};

export default roomController;


