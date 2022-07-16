import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from 'src/schemas/roles.schema';

@Module({
  imports : [MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
