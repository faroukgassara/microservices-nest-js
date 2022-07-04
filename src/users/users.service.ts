import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  async create(createUserDto: CreateUserDto):Promise<User> {
    return await new this.userModel(createUserDto).save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(email: string):Promise<User | undefined> {
    return await this.userModel.findOne({email});
  }

  async update(updateUserDto: UpdateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(updateUserDto.password, salt);
    updateUserDto.password = hashPassword;
    const _id =updateUserDto._id;
    return await this.userModel.updateOne({_id},{$set:{...updateUserDto}});
  }

  async remove(email: string) {
    return await this.userModel.deleteOne({email});
  }

  async signup(data: CreateUserDto) {
    try {
      const checkUser = await this.findOne(data.email);
      if (checkUser) {
        throw new HttpException('USER_EXISTS', HttpStatus.CONFLICT);
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(data.password, salt);
      data.password = hashPassword;
      return await this.create(data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
