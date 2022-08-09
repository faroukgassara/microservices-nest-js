import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AffectationService } from './affectation.service';
import { CreateAffectationDto } from './dto/create-affectation.dto';
import { UpdateAffectationDto } from './dto/update-affectation.dto';

@Controller()
export class AffectationController {
  constructor(private readonly affectationService: AffectationService) {}

  @MessagePattern('createAffectation')
  create(@Payload() createAffectationDto: CreateAffectationDto,
  @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.affectationService.create(createAffectationDto);
  }

  @MessagePattern('findAllAffectation')
  findAll(@Payload() data: any,
  @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.affectationService.findAll();
  }

  @MessagePattern('findOneAffectation')
  findOne(@Payload() id: number,
  @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.affectationService.findOne(id);
  }

  @MessagePattern('updateAffectation')
  update(@Payload() updateAffectationDto: UpdateAffectationDto,
  @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.affectationService.update(updateAffectationDto.id, updateAffectationDto);
  }

  @MessagePattern('removeAffectation')
  remove(@Payload() id: number,
  @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.affectationService.remove(id);
  }

  @MessagePattern('findByUserEmail')
  findByUserEmail(@Payload() email: string,
  @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.affectationService.findByUserEmail(email);
  }

  @MessagePattern('findByUserID')
  findByUserID(@Payload() _id: string,
  @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return this.affectationService.findByUserID(_id);
  }
}
