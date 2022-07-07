import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgotPassword, ForgotPasswordDocument } from 'src/schemas/forgotpassword.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateForgotpasswordDto } from './dto/create-forgotpassword.dto';
import { UpdateForgotpasswordDto } from './dto/update-forgotpassword.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ForgotpasswordService {

  constructor(private mailService: MailService,@InjectModel(User.name) private userModel: Model<UserDocument>,@InjectModel(ForgotPassword.name) private forgotpasswordModel: Model<ForgotPasswordDocument>) {}
   
  // ***************** Add Forget password Request To The DataBase *****************
  async forgot(createForgotpasswordDto: any) {
    await this.mailService.sendUserConfirmation("Reset your Password",createForgotpasswordDto.email,createForgotpasswordDto.token);
    return new this.forgotpasswordModel(createForgotpasswordDto).save();
  }

  // ***************** Reset Password *****************
  async resetpassword(createForgotpasswordDto: any) {
    const forget = await this.forgotpasswordModel.findOne({token:createForgotpasswordDto.token});

    if(forget.confirmed_at != null || forget == null || forget.email != createForgotpasswordDto.email ){
      throw new HttpException('UNAUTHORIZED', HttpStatus.CONFLICT);
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createForgotpasswordDto.password, salt);

    await this.userModel.updateOne(	{email : createForgotpasswordDto.email},{$set :{"password" : password,}})

    const confirmed_at = new Date().getTime();

    await this.forgotpasswordModel.updateOne(	{token : createForgotpasswordDto.token},{$set :{"confirmed_at" : confirmed_at,}})
  }

}
