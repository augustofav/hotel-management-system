import express from 'express';
import Router from 'express-promise-router';
import userController from '../controller/user'

export const router = Router();

router.post('/', userController.createUser); 

export default router
