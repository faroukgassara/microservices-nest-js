import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Applications, ApplicationsDocument } from 'src/schemas/applications.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  
  constructor(@InjectModel(Applications.name) private applicatioModel: Model<ApplicationsDocument>) {}

  async create(createApplicationDto: CreateApplicationDto) {
    return await new this.applicatioModel(createApplicationDto).save();
  }

  async findAll() {
    return await this.applicatioModel.find();
  }

  async findOne(id: number):Promise<Applications | undefined> {
    return await this.applicatioModel.findOne({_id:id});
  }

  async update(updateApplicationDto: UpdateApplicationDto) {
    const _id =updateApplicationDto._id;
    return await this.applicatioModel.updateOne({_id},{$set:{...updateApplicationDto}});
  }

  async remove(id: number) {
    return await this.applicatioModel.deleteOne({id});
  }
}
