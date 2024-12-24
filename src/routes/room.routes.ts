import express from 'express'
import Router from 'express-promise-router'
import roomController from '../controller/room.controller'

export const router = Router()

router.post('/quarto', roomController.createRoom)
router.get('/quarto', roomController.getAllRoomsAvailable)
router.put('/quarto/alugar/:roomId', roomController.rentRoom)
router.delete('/quarto/:roomId', roomController.deleteRoom)
router.put('/quarto/:roomId', roomController.updateRoom)

export default router