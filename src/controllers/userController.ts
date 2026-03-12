import type { Request, Response } from 'express';
import * as userService from '../services/userService.ts';

export const postUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = req.body;
        const userRecord = await userService.createUser(userData);
        res.status(201).json({
            message: 'User created successfully',
            user: userRecord,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userData = await userService.getUserById(id);
        res.status(200).json(userData);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};
