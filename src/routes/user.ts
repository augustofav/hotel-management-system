import express from 'express';
import Router from 'express-promise-router';
import userController from '../controller/user'

export const router = Router();

router.post('/usuario', userController.createUser); 
router.get('/usuario/:id', userController.getUserById)

export default router
