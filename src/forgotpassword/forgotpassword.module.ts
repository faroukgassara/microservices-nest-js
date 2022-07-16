import { Module } from '@nestjs/common';
import { ForgotpasswordService } from './forgotpassword.service';
import { ForgotpasswordController } from './forgotpassword.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotPassword, ForgotPasswordSchema } from 'src/schemas/forgotpassword.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { ConfirmAccount, ConfirmAccountSchema } from 'src/schemas/confirmaccount.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ConfirmAccount.name, schema: ConfirmAccountSchema }]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),MongooseModule.forFeature([{ name: ForgotPassword.name, schema: ForgotPasswordSchema }])],
  controllers: [ForgotpasswordController],
  providers: [UsersService,ForgotpasswordService,MailService]
})
export class ForgotpasswordModule {}
