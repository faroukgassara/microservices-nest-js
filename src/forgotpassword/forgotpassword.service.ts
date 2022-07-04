import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgotPassword, ForgotPasswordDocument } from 'src/schemas/forgotpassword.schema';
import { CreateForgotpasswordDto } from './dto/create-forgotpassword.dto';
import { UpdateForgotpasswordDto } from './dto/update-forgotpassword.dto';

@Injectable()
export class ForgotpasswordService {

  constructor(@InjectModel(ForgotPassword.name) private forgotpasswordModel: Model<ForgotPasswordDocument>) {}
  
  async forgot(createForgotpasswordDto: any):Promise<ForgotPassword> {
    return await new this.forgotpasswordModel(createForgotpasswordDto).save();
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
