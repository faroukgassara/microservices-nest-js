import { Module } from '@nestjs/common';
import { ForgotpasswordService } from './forgotpassword.service';
import { ForgotpasswordController } from './forgotpassword.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotPassword, ForgotPasswordSchema } from 'src/schemas/forgotpassword.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),MongooseModule.forFeature([{ name: ForgotPassword.name, schema: ForgotPasswordSchema }])],
  controllers: [ForgotpasswordController],
  providers: [ForgotpasswordService]
})
export class ForgotpasswordModule {}
