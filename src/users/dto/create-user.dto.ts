import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, Length, Max, Min } from 'class-validator';
import { Role } from 'src/schemas/role.enum';

export class CreateUserDto {
    
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

    @IsEmpty()
    locked : boolean;
  
    @IsEmpty()
    enabled : boolean;

    @IsNotEmpty()
    picture : string;

    @IsNumber()
    phone : string;

}
    

