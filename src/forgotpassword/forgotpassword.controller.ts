import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { ForgotpasswordService } from './forgotpassword.service';
import { CreateForgotpasswordDto } from './dto/create-forgotpassword.dto';
import { UpdateForgotpasswordDto } from './dto/update-forgotpassword.dto';
import { AllExceptionsFilter } from 'src/all-exception.filter';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('forgotpassword')
export class ForgotpasswordController {
  constructor(private readonly forgotpasswordService: ForgotpasswordService) {}


  // ***************** Add Forget password Request To The DataBase *****************
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

  // ***************** Reset Password *****************
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

}
