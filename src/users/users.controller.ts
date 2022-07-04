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

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

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
}
