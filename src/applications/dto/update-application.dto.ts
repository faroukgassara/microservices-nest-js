import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';
import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { Exclude } from 'class-transformer';
export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {

    @IsOptional()
    @Exclude()
    _id: string;

    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsString()
    url: string;
  

    @IsNotEmpty()
    isDeleted: boolean;
}
