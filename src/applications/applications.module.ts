import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Applications, ApplicationsSchema } from 'src/schemas/applications.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AffectationService } from 'src/affectation/affectation.service';
import { UsersService } from 'src/users/users.service';
import { AffectationModule } from 'src/affectation/affectation.module';
import { UsersModule } from 'src/users/users.module';
import { Affectation, AffectationSchema } from 'src/schemas/affectation.schema';
import { MailService } from 'src/mail/mail.service';
import { ConfirmAccount, ConfirmAccountSchema } from 'src/schemas/confirmaccount.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports : [MongooseModule.forFeature([{ name: ConfirmAccount.name, schema: ConfirmAccountSchema }]), MongooseModule.forFeature([{ name: Applications.name, schema: ApplicationsSchema }]),MongooseModule.forFeature([{ name: Affectation.name, schema: AffectationSchema }]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService,AffectationModule,UsersModule,AffectationService,UsersService,MailService]
})
export class ApplicationsModule {}
