import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';


var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "9f9c3f84495cde",
        pass: "61d7f5230f60b9"
    }
});

export class NodemailerMailAdapter implements MailAdapter{

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: "Vinicius <vayne99@gmail.com>",
            subject,
            html: body
        });
    }
}