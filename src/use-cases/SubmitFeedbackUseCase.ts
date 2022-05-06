import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

export interface SubmitFeedbackCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubmitFeedbackCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error("Type is required");
        }
        
        if (!comment) {
            throw new Error("Comment is required");
        }

        if (screenshot  && !screenshot.startsWith("data:image")) {
            throw new Error("Invalid screenshot format")
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: ['<div style="font-family:sans-serif; font-size:16px; color:#111;">',
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null].join('\n')
        })
    }
}