import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

const router = Router();

// Route POST /users
router.post('/users', userController.postUser);

// Route POST /login
router.post('/login', userController.login);

// Route GET /users/:id
router.get('/users/:id', userController.getUser);

export default router;
