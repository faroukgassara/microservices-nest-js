import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Affectation, AffectationDocument } from 'src/schemas/affectation.schema';
import { UsersService } from 'src/users/users.service';
import { CreateAffectationDto } from './dto/create-affectation.dto';
import { UpdateAffectationDto } from './dto/update-affectation.dto';

@Injectable()
export class AffectationService {

  constructor(private userService:UsersService,@InjectModel(Affectation.name) private affectationModel: Model<AffectationDocument>) {}

  async create(createAffectationDto: any) {
    const user = await this.userService.findOneById(createAffectationDto.users)
    createAffectationDto.users=user;
    return await new this.affectationModel(createAffectationDto).save();
  }

  async findAll() {
    return await this.affectationModel.find().populate("applications").populate("users");
  }

  async findByUserApp(user:any,application:any){
    return await this.affectationModel.find({
      "users.email":user,"applications":application
    })
  }

  async findOne(id: number) {
    return await this.affectationModel.findOne({id});
  }

  update(id: number, updateAffectationDto: UpdateAffectationDto) {
    return `This action updates a #${id} affectation`;
  }

  async remove(id: number) {
    return await this.affectationModel.deleteOne({id});
  }
}
