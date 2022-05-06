import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';


var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c3108912fb5985",
    pass: "3bc7057d477c39"
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