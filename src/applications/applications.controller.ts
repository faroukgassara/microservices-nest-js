import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AllExceptionsFilter } from 'src/all-exception.filter';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('createApplication')
  create(@Payload() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('findAllApplications')
  findAll() {
    return this.applicationsService.findAll();
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('findOneApplication')
  findOne(@Payload() id: number) {
    return this.applicationsService.findOne(id);
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('updateApplication')
  update(@Payload() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(updateApplicationDto);
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('removeApplication')
  remove(@Payload() _id: string) {
    return this.applicationsService.remove(_id);
  }

  // ***************** Affect Role To User *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('app-AffectRoleToApp')
  public async updatepush(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.applicationsService.updatepush(data._id, data._idRole);
  }

    // ***************** Affect Role To App *****************
    @UseFilters(new AllExceptionsFilter())
    @MessagePattern('app-DeleteRoleFromApp')
    public async updatepull(
      @Payload() data: any,
      @Ctx() context: RmqContext
    ) {
      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();
      console.log('data', data);
      channel.ack(orginalMessage);
      return this.applicationsService.updatepull(data._id, data._idRole);
    }
}


