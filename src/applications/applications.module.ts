import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Applications, ApplicationsSchema } from 'src/schemas/applications.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [MongooseModule.forFeature([{ name: Applications.name, schema: ApplicationsSchema }])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
