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
        const { endDate, startDate, userid } = req.body
        console.log(roomId)
        console.log(req.body)

        try {
            if (!roomId) {
                res.status(400).send('id e obrigatorio')
                return
            }
            const result = await roomService.rentRoom(parseInt(roomId), endDate, startDate, userid)

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
            const existingId = await roomService.existingId(Number(roomId))
            if (!existingId) {
                res.status(404).send('Quarto nao encontrado.')
                return
            }

            const result = await roomService.deleteRoom(parseInt(roomId))
            res.status(200).send(result)
        } catch (error) {
            console.error('Erro ao deletar o quarto:', error)
            res.status(500).send('Ocorreu um erro ao deletar o quarto.')
        }
    },

    updateRoom: async (req: Request, res: Response): Promise<void> => {
        const { roomId } = req.params
        const { hotelId, roomNumber, type, price } = req.body

        try {
            if (!hotelId || !roomNumber || !type || !price) {
                res.status(400).send('Campos obrigatórios hotelId, roomNumber, type, price.')
                return
            }
            const result = await roomService.updateRoom(Number(roomId), hotelId, roomNumber, type, price)
            res.status(200).send(result)
        } catch (error) {
            console.error('Erro ao atualizar o quarto:', error)
            res.status(500).send('Ocorreu um erro ao atualizar o quarto.')
        }
    },

    getRoomById: async (req: Request, res: Response): Promise<void> => {
        try {
            const { roomId } = req.params
            const room = await roomService.getRoomById(Number(roomId))
            res.status(200).send(room)
        } catch (error) {
            console.error('Erro ao buscar quarto:', error)
            res.status(500).send('Ocorreu um erro ao buscar quarto.')
        }
    },

    filterRoom: async (req: Request, res: Response): Promise<void> => {
        try {
            const { filter, type } = req.body
            const rooms = await roomService.filterRoom(filter, type)
            res.status(200).send(rooms)
        }
        catch (error) {
            console.error('Erro ao filtrar os quartos', error);
            res.status(500).send('Ocorreu um erro ao filtrar os quartos.')
        }

    },

    getRoomsByHotel: async (req: Request, res: Response): Promise<void> => {
        try {
            const { hotelId } = req.params
            const rooms = await roomService.getRoomsByHotel(Number(hotelId))
            res.status(200).send(rooms)
        } catch (error) {
            console.error('Erro ao buscar quartos:', error)
            res.status(500).send('Ocorreu um erro ao buscar quartos.')
        }
    },

    cancelReservation: async (req: Request, res: Response): Promise<void> => {
        try {
            const { roomId } = req.params
            const result = await roomService.cancelReservation(Number(roomId))
            res.status(200).send(result)
        } catch (error) {
            console.error('Erro ao cancelar a reserva:', error)
            res.status(500).send('Ocorreu um erro ao cancelar a reserva.')
        }
    }


}


export default roomController;


