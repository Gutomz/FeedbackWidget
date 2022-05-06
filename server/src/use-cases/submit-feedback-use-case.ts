import { UseCase } from ".";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailService } from "../services/mail-service";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase implements UseCase<SubmitFeedbackUseCaseRequest, void>{

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailService: MailService,
  ) {}

  async execute(param: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = param;

    if (!type) {
      throw new Error('Field [type] is required');
    }

    if (!comment) {
      throw new Error('Field [comment] is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailService.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do Feedback: ${type}<p>`,
        `<p>Comentário: ${comment}<p>`,
        `<div>`,
      ].join('\n'),
    });
  }
}
