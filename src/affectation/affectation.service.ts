import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Affectation, AffectationDocument } from 'src/schemas/affectation.schema';
import { UsersService } from 'src/users/users.service';
import { CreateAffectationDto } from './dto/create-affectation.dto';
import { UpdateAffectationDto } from './dto/update-affectation.dto';

@Injectable()
export class AffectationService {

  constructor(private userService: UsersService, @InjectModel(Affectation.name) private affectationModel: Model<AffectationDocument>) { }

  // ***************** AFFECT APPLICATION TO USER (SIGN UP IN THE APPLICATION) *****************
  async create(createAffectationDto: any) {

    const user = await this.userService.findOneById(createAffectationDto.users)
    createAffectationDto.users = user;

    const res = await this.findByUserApp(user.email, createAffectationDto.applications)
    console.log(res);
    if (res.length > 0) {
      throw new UnauthorizedException();
    }

    return await new this.affectationModel(createAffectationDto).save();
  }

  async findAll() {
    return await this.affectationModel.find().populate("applications").populate("users");
  }

  // ***************** FIND AFFECTATION BY USER EMAIL*****************
  async findByUserEmail(email: string) {
    return await this.affectationModel.find({
      "users.email": email
    }).populate("applications")
  }

  // ***************** FIND AFFECTATION BY USER EMAIL AND APPLICATION ID *****************
  async findByUserApp(user: any, application: any) {
    return await this.affectationModel.find({
      "users.email": user, "applications": application
    })
  }

  // ***************** findOne AFFECTATION *****************
  async findOne(id: number) {
    return await this.affectationModel.findOne({ id });
  }

  // ***************** update AFFECTATION *****************
  update(id: number, updateAffectationDto: UpdateAffectationDto) {
    return `This action updates a #${id} affectation`;
  }

  // ***************** DELETE AFFECTATION *****************
  async remove(id: number) {
    return await this.affectationModel.deleteOne({ id });
  }

  // ***************** FIND AFFECTATION BY APPLICATION ID *****************
  async findByApp(application: any) {
    return await this.affectationModel.find({
      "applications": application
    })
  }
}
