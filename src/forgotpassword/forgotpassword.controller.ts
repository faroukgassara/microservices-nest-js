import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { ForgotpasswordService } from './forgotpassword.service';
import { CreateForgotpasswordDto } from './dto/create-forgotpassword.dto';
import { UpdateForgotpasswordDto } from './dto/update-forgotpassword.dto';
import { AllExceptionsFilter } from 'src/all-exception.filter';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('forgotpassword')
export class ForgotpasswordController {
  constructor(private readonly forgotpasswordService: ForgotpasswordService) {}


  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('forgot-password')
  public async forgot(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.forgotpasswordService.forgot(data);
  }


  @UseFilters(new AllExceptionsFilter())
  @MessagePattern('reset-password')
  public async resetpassword(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    return this.forgotpasswordService.resetpassword(data);
  }

  @Get()
  findAll() {
    return this.forgotpasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forgotpasswordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForgotpasswordDto: UpdateForgotpasswordDto) {
    return this.forgotpasswordService.update(+id, updateForgotpasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forgotpasswordService.remove(+id);
  }
}
