import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ForgotpasswordModule } from './forgotpassword/forgotpassword.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfirmAccount, ConfirmAccountSchema } from './schemas/confirmaccount.schema';
import { MailModule } from './mail/mail.module';
import { ApplicationsModule } from './applications/applications.module';
import { RolesModule } from './roles/roles.module';
import { AffectationModule } from './affectation/affectation.module';
import { AffectationService } from './affectation/affectation.service';
import { Affectation, AffectationSchema } from './schemas/affectation.schema';
import { ApplicationsService } from './applications/applications.service';
import { Applications, ApplicationsSchema } from './schemas/applications.schema';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),MongooseModule.forFeature([{ name: Applications.name, schema: ApplicationsSchema }]),UsersModule,MongooseModule.forRoot('mongodb://localhost/micro'),MongooseModule.forFeature([{ name: Affectation.name, schema: AffectationSchema }]),MongooseModule.forFeature([{ name: ConfirmAccount.name, schema: ConfirmAccountSchema }]),ForgotpasswordModule, MailModule, ApplicationsModule, RolesModule, AffectationModule],
  controllers: [AppController],
  providers: [AppService,AffectationModule,AffectationService,ApplicationsService,ApplicationsModule
  ]
})
export class AppModule {}
