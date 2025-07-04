import express from 'express';
import { deleteUserController, getUserByIdController, getUsersController, loginUser, logout, updateUserController, userRegistrationController } from '../controllers/userController.js';
import authProtector from '../middlewares/auth.middleware.js';

const userRoutes = express.Router();

userRoutes.post('/', authProtector, userRegistrationController)
userRoutes.get('', authProtector, getUsersController)
userRoutes.delete('/:id', authProtector, deleteUserController)
userRoutes.patch('/:id', authProtector, updateUserController)
userRoutes.get('/:id', authProtector, getUserByIdController)
userRoutes.post('/login', loginUser)
userRoutes.post('/logout', logout)

export {
    userRoutes
}
