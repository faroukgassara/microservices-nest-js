import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
require('dotenv').config();
@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService,private mailerService: MailerService) {}

  // CONFIRM ACCOUNT
  async sendUserConfirmation(subject : string,user: string, token: string) {
    const url = `http://localhost:3001/emailconfirmation/`+user+`/`+token;
    await this.mailerService.sendMail({
      // SUPERADMIN EMAIL
      to: process.env.SUPERADMIN_EMAIL ,
      subject: 'Welcome ! ' + subject,
      context: { 
        name: user,
        url,
      },
      template: './confirmation',
    });
  }

  // FORGOT PASSWORD
  async sendresetpassword(subject : string,user: string, token: string) {
    const url = `http://localhost:3001/resetpassword/`+user+`/`+token;
    await this.mailerService.sendMail({
      to: user,
      subject: 'Welcome! ' + subject,
      context: { 
        name: user,
        url,
      },
      template: './confirmation',
    });
  }
}

