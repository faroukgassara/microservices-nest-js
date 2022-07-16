import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from 'mongoose';

export type ApplicationsDocument = Applications & Document;

@Schema()
export class Applications {
  @Prop()
  url: string;

  @Prop()
  name: string;

  @Prop()
  isDeleted: boolean;


}

export const ApplicationsSchema = SchemaFactory.createForClass(Applications);