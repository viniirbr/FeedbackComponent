import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/SubmitFeedbackUseCase';
import { PrismaFeedbacksRespository } from './repositories/prisma/PrismaFeedbacksRepository';
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const PrismaFeedbacksRepository = new PrismaFeedbacksRespository();
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        PrismaFeedbacksRepository,
        nodemailerMailAdapter);

    submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
});