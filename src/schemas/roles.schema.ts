import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from 'mongoose';

export type RolesDocument = Roles & Document;
const opts = { toJSON: { virtuals: true } };
@Schema(opts)
export class Roles {
    
  @Prop({required: true,unique:true})
  name: string;

}

export const RolesSchema = SchemaFactory.createForClass(Roles);