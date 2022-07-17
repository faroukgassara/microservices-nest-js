import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles, RolesDocument } from 'src/schemas/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Roles.name) private roleModel: Model<RolesDocument>) {}

  // ***************** Add Role To the DataBase *****************
  async create(createRoleDto: CreateRoleDto):Promise<Roles> {
    return await new this.roleModel(createRoleDto).save();
  }

  // ***************** Get All Roles *****************
  async findAll() {
    return await this.roleModel.find();
  }

  // ***************** Get One Role *****************
  async findOne(id: number):Promise<Roles | undefined> {
    return await this.roleModel.findOne({id});
  }

  async update(updateRoleDto: UpdateRoleDto) {
    const _id =updateRoleDto._id;
    return await this.roleModel.updateOne({_id},{$set:{...updateRoleDto}});
  }

  async remove(id: number) {
    return await this.roleModel.deleteOne({id});
  }
}
