import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AffectationService } from './affectation.service';
import { CreateAffectationDto } from './dto/create-affectation.dto';
import { UpdateAffectationDto } from './dto/update-affectation.dto';

@Controller()
export class AffectationController {
  constructor(private readonly affectationService: AffectationService) {}

  @MessagePattern('createAffectation')
  create(@Payload() createAffectationDto: CreateAffectationDto) {
    return this.affectationService.create(createAffectationDto);
  }

  @MessagePattern('findAllAffectation')
  findAll() {
    return this.affectationService.findAll();
  }

  @MessagePattern('findOneAffectation')
  findOne(@Payload() id: number) {
    return this.affectationService.findOne(id);
  }

  @MessagePattern('updateAffectation')
  update(@Payload() updateAffectationDto: UpdateAffectationDto) {
    return this.affectationService.update(updateAffectationDto.id, updateAffectationDto);
  }

  @MessagePattern('removeAffectation')
  remove(@Payload() id: number) {
    return this.affectationService.remove(id);
  }
}
