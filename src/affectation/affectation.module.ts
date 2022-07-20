import { Module } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { AffectationController } from './affectation.controller';
import { Affectation, AffectationSchema } from 'src/schemas/affectation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { ConfirmAccount, ConfirmAccountSchema } from 'src/schemas/confirmaccount.schema';

@Module({
  imports : [MongooseModule.forFeature([{ name: ConfirmAccount.name, schema: ConfirmAccountSchema }]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),MongooseModule.forFeature([{ name: Affectation.name, schema: AffectationSchema }])],
  controllers: [AffectationController],
  providers: [AffectationService,UsersService,UsersModule,MailService]
})
export class AffectationModule {}
