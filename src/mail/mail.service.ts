import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(subject : string,user: string, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user,
      subject: 'Welcome to Nice App! ' + subject,
      context: { 
        name: user+token,
        url,
      },
      template: './confirmation',
    });
  }
}
