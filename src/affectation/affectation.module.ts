import { Module } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { AffectationController } from './affectation.controller';
import { Affectation, AffectationSchema } from 'src/schemas/affectation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [MongooseModule.forFeature([{ name: Affectation.name, schema: AffectationSchema }])],
  controllers: [AffectationController],
  providers: [AffectationService]
})
export class AffectationModule {}
