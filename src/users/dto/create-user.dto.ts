import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, Length, Max, Min } from 'class-validator';


export class CreateUserDto {
    
    @IsEmail()
    email: string;
  

    @IsNotEmpty()
    password: string;

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
    

