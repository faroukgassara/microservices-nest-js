import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Applications } from './applications.schema';
import { Roles } from './roles.schema';
import { User } from './user.schema';

export type AffectationDocument =  Affectation & Document;

@Schema()
export class  Affectation {


  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Roles.name, required: true })
  roles: Roles;

  @Prop({ type: User, ref: User.name, required: true })
  users: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Applications.name, required: true })
  applications: Applications;

}


export const  AffectationSchema = SchemaFactory.createForClass( Affectation);
AffectationSchema.index({ "users": 1, "applications": 1}, { "unique": true });