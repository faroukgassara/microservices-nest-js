import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @MessagePattern('createApplication')
  create(@Payload() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @MessagePattern('findAllApplications')
  findAll() {
    return this.applicationsService.findAll();
  }

  @MessagePattern('findOneApplication')
  findOne(@Payload() id: number) {
    return this.applicationsService.findOne(id);
  }

  @MessagePattern('updateApplication')
  update(@Payload() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(updateApplicationDto.id, updateApplicationDto);
  }

  @MessagePattern('removeApplication')
  remove(@Payload() id: number) {
    return this.applicationsService.remove(id);
  }
}
