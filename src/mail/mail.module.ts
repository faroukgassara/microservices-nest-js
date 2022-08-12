import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: process.env.SUPERADMIN_EMAIL,
          pass: process.env.SUPERADMIN_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply"',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: false,
        },
      },
     
    }),
  ],
  providers: [MailService,ConfigService],
  exports: [MailService],
})
export class MailModule {}
