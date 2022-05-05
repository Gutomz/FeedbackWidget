import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';
const port = 3333;
const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "91fc656aeb9a80",
    pass: "eb58cbca59ea63"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: 'Equipe FeedbackWidget <feedback@feedbackwidget.com>',
    to: 'Time de Reporte <report.team@feedbackwidget.com>',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
      `<p>Tipo do Feedback: ${type}<p>`,
      `<p>Comentário: ${comment}<p>`,
      `<div>`,
    ].join('\n'),
  });
  
  return res.status(201).json({ data: feedback });
});

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`)
});
