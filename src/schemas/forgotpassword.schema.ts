import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from 'mongoose';
import { Role } from './role.enum';

export type ForgotPasswordDocument = ForgotPassword & Document;

@Schema()
export class ForgotPassword {
  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  created_at: Date;

  @Prop()
  confirmed_at: Date;

}

export const ForgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);