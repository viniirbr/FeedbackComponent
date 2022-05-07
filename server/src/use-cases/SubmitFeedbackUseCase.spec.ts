import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

const createFeedbackSpy = jest.fn();
const sendMailkSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailkSpy}
)

describe("Submit feedback", () => {
    it("Should be able to send feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Hello",
            screenshot: "data:image.png"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailkSpy).toHaveBeenCalled()
    })

    it("Should not be able to send feedback without type", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "Hello",
            screenshot: "data:image.png"
        })).rejects.toThrow();
    })

    it("Should not be able to send feedback without comment", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image.png"
        })).rejects.toThrow();
    })

    it("Should not be able to send invalid format for the screenshot feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "A problem!",
            screenshot: "image.png"
        })).rejects.toThrow();
    })
})