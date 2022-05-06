import express from 'express';
import { routes } from './feedbackRoutes';
import cors from 'cors';

const app = express();

const PORT = 3001;

app.use(cors(), express.json(), routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`)
})