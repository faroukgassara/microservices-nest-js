import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { AffectationService } from './affectation/affectation.service';
import { ApplicationsService } from './applications/applications.service';
@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly affectationService: AffectationService,
    private readonly applicationsservice: ApplicationsService

  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // ***************** Sign In With One Of The Applications*****************
  async signin(data:any){

    const application = await this.applicationsservice.findOne(data.application);

    const aff = await this.affectationService.findByUserApp(data.email,application);
    console.log(aff);

    const user = await this.usersService.findOne(data.email);

    const isMatch = await bcrypt.compare(data.password, user.password);
    
    if (aff.length ==1 && isMatch && user.locked == false && user.enabled == true) {
      return user;
    }else {
      throw new UnauthorizedException();
    }
  }
}
