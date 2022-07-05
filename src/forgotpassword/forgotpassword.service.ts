import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgotPassword, ForgotPasswordDocument } from 'src/schemas/forgotpassword.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateForgotpasswordDto } from './dto/create-forgotpassword.dto';
import { UpdateForgotpasswordDto } from './dto/update-forgotpassword.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgotpasswordService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,@InjectModel(ForgotPassword.name) private forgotpasswordModel: Model<ForgotPasswordDocument>) {}
  
  async forgot(createForgotpasswordDto: any):Promise<ForgotPassword> {
    return await new this.forgotpasswordModel(createForgotpasswordDto).save();
  }

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

  findAll() {
    return `This action returns all forgotpassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forgotpassword`;
  }

  update(id: number, updateForgotpasswordDto: UpdateForgotpasswordDto) {
    return `This action updates a #${id} forgotpassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} forgotpassword`;
  }
}
