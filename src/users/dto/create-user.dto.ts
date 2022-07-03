import { IsAlpha, IsAlphanumeric, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, Length, Max, Min } from 'class-validator';
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

    @IsBoolean()
    locked : boolean;
  
    @IsBoolean()
    enabled : boolean;

    @IsNotEmpty()
    picture : string;

    @IsNumber()
    phone : string;

}
    

