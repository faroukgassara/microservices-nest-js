import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AllExceptionsFilter } from 'src/all-exception.filter';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('createRole')
  public async create(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.rolesService.create(data);
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('findAllRoles')
  findAll(@Payload() id: number,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.rolesService.findAll();
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('findOneRole')
  findOne(@Payload() id: number,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.rolesService.findOne(id);
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('updateRole')
  update(@Payload() updateRoleDto: UpdateRoleDto,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.rolesService.update(updateRoleDto);
  }

  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('removeRole')
  remove(@Payload() _id: string,
    @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.rolesService.remove(_id);
  }
}
