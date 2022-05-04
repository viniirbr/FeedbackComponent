import express from 'express';
import { routes } from './feedbackRoutes';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use(express.json(), routes, cors());

app.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`)
})