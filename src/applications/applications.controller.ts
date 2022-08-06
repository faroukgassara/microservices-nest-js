import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AllExceptionsFilter } from 'src/all-exception.filter';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  // ***************** create App *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('createApplication')
  public async create(@Payload() createApplicationDto: CreateApplicationDto,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return await this.applicationsService.create(createApplicationDto);
  }

  // ***************** findAll App *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('findAllApplications')
  public async findAll(@Payload() data: any,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return await this.applicationsService.findAll();
  }

  // ***************** findOne App *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('findOneApplication')
  public async findOne(@Payload() id: number,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return await this.applicationsService.findOne(id);
  }

  // ***************** update App *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('updateApplication')
  public async update(@Payload() updateApplicationDto: UpdateApplicationDto,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return await this.applicationsService.update(updateApplicationDto);
  }

  // ***************** DELETE App *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('removeApplication')
  public async remove(@Payload() _id: string,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return await this.applicationsService.remove(_id);
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
    channel.ack(orginalMessage);
    return await this.applicationsService.updatepush(data._id, data._idRole);
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
    channel.ack(orginalMessage);
    return await this.applicationsService.updatepull(data._id, data._idRole);
  }
}


