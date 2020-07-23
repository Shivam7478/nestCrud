import {IsString, IsNotEmpty, IsOptional, IsEmail, minLength, MinLength, Length, MaxLength, Matches} from 'class-validator'; 
export class authDTO{
@IsNotEmpty()
@IsString()
firstName: string;

@IsNotEmpty()
@IsString()
lastName: string;

@IsNotEmpty()
@IsString()
@IsEmail()
email: string;


@IsNotEmpty()
@IsString()
dob: string;

@IsNotEmpty()
@IsOptional()
@IsString()
@MinLength(5)
@MaxLength(8)
password:string;

@IsNotEmpty()
@IsString()
cpassword:string;

@IsNotEmpty()
@IsString()
@Length(10)
phone: number;
}