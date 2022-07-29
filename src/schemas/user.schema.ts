import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Applications } from './applications.schema';

export type UserDocument = User & Document;

enum Role {
  ADMIN ,
  USER ,
  SUPERADMIN 
}

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

  @Prop({ type: String, enum: Role })
  role: Role

}


export const UserSchema = SchemaFactory.createForClass(User);

