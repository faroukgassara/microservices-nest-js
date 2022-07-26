import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfirmAccount, ConfirmAccountDocument } from 'src/schemas/confirmaccount.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {

  constructor(private mailService: MailService,@InjectModel(ConfirmAccount.name) private confirmaccountModel: Model<ConfirmAccountDocument>,@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  // ***************** Add User To the DataBase *****************
  async create(createUserDto: CreateUserDto):Promise<User> {
    return await new this.userModel(createUserDto).save();
  }

  // ***************** Add Confirmation Request To The DataBase *****************
  async confirmAccount(confirmAccount: any) {
    return await new this.confirmaccountModel(confirmAccount).save();
  }

  // ***************** Get All Users *****************
  async findAll() {
    return await this.userModel.find();
  }

  // ***************** Get One User *****************
  async findOne(email: string):Promise<User | undefined> {
    return await this.userModel.findOne({email});
  }

  async findOneById(id: number) {
    return await this.userModel.findOne({_id:id});
  }

  // ***************** Update User *****************
  async update(updateUserDto: UpdateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(updateUserDto.password, salt);
    updateUserDto.password = hashPassword;
    const _id =updateUserDto._id;
    return await this.userModel.updateOne({_id},{$set:{...updateUserDto}});
  }

  // ***************** Delete User *****************
  async remove(_id: string) {
    return await this.userModel.deleteOne({_id});
  }

  // ***************** Affect Role To User *****************
  async updatepush(_id: string,_idRole: string) {
    return this.userModel.updateOne({_id}, {
      $set: { roles: _idRole },
    })
  }

  // ***************** Sign Up *****************
  async signup(data: CreateUserDto) {
    try {
      //const checkUser = await this.findOne(data.email);

      //if (checkUser) {
      //  throw new HttpException('USER_EXISTS', HttpStatus.CONFLICT);
      //}

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(data.password, salt);

      data.password = hashPassword;
      data.enabled=false;
      data.locked=false;

      const email = data.email;
      const crypto = require('crypto');
      const token = crypto.randomBytes(10).toString('hex'); 
      const created_at = new Date().getTime();
      const confirmed_at = null;

      await this.mailService.sendUserConfirmation("Confirm your Email",email,token);

      await this.confirmAccount({email,token,created_at,confirmed_at});

      return await this.create(data);

    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // ***************** Confirm Email After Register *****************
  async confirmaccount(createConfirmaccountDto: any) {

    const forget = await this.confirmaccountModel.findOne({token:createConfirmaccountDto.token});

    if(forget.confirmed_at != null || forget == null || forget.email != createConfirmaccountDto.email ){
      throw new HttpException('UNAUTHORIZED', HttpStatus.CONFLICT);
    }

    await this.userModel.updateOne(	{email : createConfirmaccountDto.email},{$set :{"enabled" : true,}})

    const confirmed_at = new Date().getTime();

    await this.confirmaccountModel.updateOne(	{token : createConfirmaccountDto.token},{$set :{"confirmed_at" : confirmed_at,}})
  }
}
