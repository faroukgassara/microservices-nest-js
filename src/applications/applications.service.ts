import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AffectationService } from 'src/affectation/affectation.service';
import { Applications, ApplicationsDocument } from 'src/schemas/applications.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {

  constructor(private affectationService: AffectationService,@InjectModel(Applications.name) private applicatioModel: Model<ApplicationsDocument>) { }

  // ***************** create App *****************
  async create(createApplicationDto: CreateApplicationDto) {
    return await new this.applicatioModel(createApplicationDto).save();
  }

  // ***************** findAll App *****************
  async findAll() {
    return await this.applicatioModel.find().populate("roles");
  }

  // ***************** findOne App *****************
  async findOne(id: number): Promise<Applications | undefined> {
    return await this.applicatioModel.findOne({ _id: id }).populate("roles");
  }

  // ***************** update App *****************
  async update(updateApplicationDto: UpdateApplicationDto) {
    const _id = updateApplicationDto._id;
    return await this.applicatioModel.updateOne({ _id }, { $set: { ...updateApplicationDto } });
  }

  // ***************** DELETE App *****************
  async remove(_id: string) {
    const i = await this.affectationService.findByApp(_id);
    if(i.length>0){
      for (let j of i) {
        this.affectationService.remove(j._id); 
        console.log(j._id);
      }
    }
    return await this.applicatioModel.deleteOne({ _id });
  }

  // ***************** Affect Role To App *****************
  async updatepush(_id: string, _idRole: mongoose.Schema.Types.ObjectId) {
    return this.applicatioModel.updateOne({_id}, {
      $push: { roles: _idRole },
    })
  }

    // ***************** Delete Role From App *****************
    async updatepull(_id: string, _idRole: mongoose.Schema.Types.ObjectId) {
      return this.applicatioModel.updateOne({_id}, {
        $pull: { roles: _idRole },
      })
    }
}
