import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'iphonefarouk1998@gmail.com',
          pass: 'ckwpsxqngiujjmvf',
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
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
