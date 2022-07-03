import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/schemas/role.enum';
import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, Length, Max, Min } from 'class-validator';
import { Exclude } from 'class-transformer';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @IsOptional()
    @Exclude()
    _id: string;
    
    @IsEmail()
    email: string;
  

    @IsNotEmpty()
    password: string;

    @IsAlpha()
    firstname: string;

    @IsAlpha()
    lastname: string;

    @IsEnum(Role)
    readonly role: Role;
    
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
