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

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = req.body;
        const loginResponse = await userService.loginUser(userData);
        res.status(200).json(loginResponse);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }
        await userService.sendPasswordResetEmail(email);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
