import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class CreateForgotpasswordDto {

    
    @IsAlphanumeric()
    token: string;
  
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    created_at: Date;
  
    
    confirmed_at: Date;
}
