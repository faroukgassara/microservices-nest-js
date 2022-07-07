import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ForgotpasswordModule } from './forgotpassword/forgotpassword.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfirmAccount, ConfirmAccountSchema } from './schemas/confirmaccount.schema';

@Module({
  imports: [UsersModule,MongooseModule.forRoot('mongodb://localhost/micro'),MongooseModule.forFeature([{ name: ConfirmAccount.name, schema: ConfirmAccountSchema }]),ForgotpasswordModule],
  controllers: [AppController],
  providers: [AppService
  ]
})
export class AppModule {}
