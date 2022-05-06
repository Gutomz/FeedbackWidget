import nodemailer from 'nodemailer';
import { MailService, SendMailData } from "../mail-service";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "91fc656aeb9a80",
    pass: "eb58cbca59ea63"
  }
});

export class NodemailerMailService implements MailService {

  async sendMail ({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe FeedbackWidget <feedback@feedbackwidget.com>',
      to: 'Time de Reporte <report.team@feedbackwidget.com>',
      subject,
      html: body,
    });
  };
}
