import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, Length, Max, Min } from 'class-validator';
import { Exclude } from 'class-transformer';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @IsOptional()
    @Exclude()
    _id: string;
    
    @IsEmail()
    email: string;
  


    @IsAlpha()
    firstname: string;

    @IsAlpha()
    lastname: string;
    
    @IsNumber()
    age: number;

    @IsAlphanumeric()
    address : string;

    @IsNumber()
    cin : string;

    @IsBoolean()
    locked : boolean;
  
    @IsBoolean()
    enabled : boolean;

    @IsNotEmpty()
    picture : string;

    @IsNumber()
    phone : string;

}
