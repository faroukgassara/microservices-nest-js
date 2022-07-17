import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UsePipes, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import { AllExceptionsFilter } from 'src/all-exception.filter';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ***************** Get All Users *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('user-findall')
  public async findAll(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.usersService.findAll();
  }

  // ***************** Get One User *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('user-findone')
  public async findOne(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.usersService.findOne(data);
  }

  // ***************** Update User *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('user-update')
  public async update(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.usersService.update(data);
  }

  // ***************** Delete User *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('user-delete')
  public async remove(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.usersService.remove(data);
  }

  // ***************** Sign Up *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('user-management')
  public async signup(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.usersService.signup(data);
  }


  // ***************** Confirm Email After Register *****************
  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('confirm-findall')
  public async confirmaccount(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.usersService.confirmaccount(data);
  }

    // ***************** Affect Role To User *****************
    @UseFilters(new AllExceptionsFilter())
    @MessagePattern('user-AffectRoleToUser')
    public async updatepush(
      @Payload() data: any,
      @Ctx() context: RmqContext
    ) {
      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();
      console.log('data', data);
      channel.ack(orginalMessage);
      return this.usersService.updatepush(data._id,data._idRole);
    }
}
