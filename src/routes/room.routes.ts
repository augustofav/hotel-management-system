import express from 'express'
import Router from 'express-promise-router'
import roomController from '../controller/room.controller'

export const router = Router()

router.post('/quarto', roomController.createRoom)
router.get('/quarto', roomController.getAllRoomsAvailable)
router.put('/quarto/:roomId', roomController.rentRoom)


export default router