import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';


export class CreateApplicationDto {
    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsString()
    url: string;
  

    @IsNotEmpty()
    isDeleted: boolean;
}
