import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from 'mongoose';


export type ConfirmAccountDocument = ConfirmAccount & Document;

@Schema()
export class ConfirmAccount {
  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  created_at: Date;

  @Prop()
  confirmed_at: Date;

}

export const ConfirmAccountSchema = SchemaFactory.createForClass(ConfirmAccount);