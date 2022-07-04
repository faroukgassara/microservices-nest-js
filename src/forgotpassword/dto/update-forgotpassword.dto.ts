import { PartialType } from '@nestjs/mapped-types';
import { CreateForgotpasswordDto } from './create-forgotpassword.dto';

export class UpdateForgotpasswordDto extends PartialType(CreateForgotpasswordDto) {}
