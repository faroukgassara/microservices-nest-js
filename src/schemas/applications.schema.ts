import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {  Document } from 'mongoose';
import { Roles } from './roles.schema';
import { User } from './user.schema';

export type ApplicationsDocument = Applications & Document;

@Schema()
export class Applications {
  @Prop({required: true,unique:true})
  url: string;

  @Prop({required: true,unique:true})
  name: string;

  @Prop()
  isDeleted: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Roles.name, required: true })
  roles: Roles;
}

export const ApplicationsSchema = SchemaFactory.createForClass(Applications);