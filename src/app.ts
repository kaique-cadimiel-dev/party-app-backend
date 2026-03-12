import express, { type Request, type Response } from 'express';
import userRoutes from './routes/userRoutes.ts';

const app = express();

// Middlewares
app.use(express.json()); // Allows parsing JSON bodies

// Rotas de teste /
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'API is running successfully!' });
});

// User Routes
app.use('/api', userRoutes);

export default app;
