import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ForgotpasswordModule } from './forgotpassword/forgotpassword.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule.forRoot({
    transport:{
      host:'',
      auth:{
        user:'',
        pass:''
      }
    }

  }),
  UsersModule,MongooseModule.forRoot('mongodb://localhost/micro'), ForgotpasswordModule],
  controllers: [AppController],
  providers: [AppService
  ]
})
export class AppModule {}
