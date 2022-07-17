import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { Exclude } from 'class-transformer';
export class UpdateRoleDto extends PartialType(CreateRoleDto) {

    @IsOptional()
    @Exclude()
    _id: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}
