import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Roles } from './roles.schema';

export type ApplicationsDocument = Applications & Document;
const opts = { toJSON: { virtuals: true } };
@Schema(opts)
export class Applications {
  @Prop({required: true,unique:true})
  url: string;

  @Prop({required: true,unique:true})
  name: string;

  @Prop()
  isDeleted: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Roles.name ,unique:true})
  roles:[mongoose.Schema.Types.ObjectId];
}

export const ApplicationsSchema = SchemaFactory.createForClass(Applications);