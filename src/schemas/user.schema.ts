import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Applications } from './applications.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop()
  locked : boolean;

  @Prop()
  enabled : boolean;

  @Prop()
  picture : string;

  @Prop()
  address : string;

  @Prop()
  cin : string;

  @Prop()
  phone : string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Applications.name, required: true })
  applications: Applications;

}


export const UserSchema = SchemaFactory.createForClass(User);