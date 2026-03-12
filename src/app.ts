import express, { type Request, type Response } from 'express';

const app = express();

// Middlewares
app.use(express.json()); // Allows parsing JSON bodies

// Rotas de teste /
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'API is running successfully!' });
});

export default app;
