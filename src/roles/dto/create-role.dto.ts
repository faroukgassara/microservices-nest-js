import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';


export class CreateRoleDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;
}
    

