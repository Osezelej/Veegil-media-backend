import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsAlphanumeric, IsStrongPassword, IsPhoneNumber, IsNumberString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
 @Field()
 @IsEmail()
 email:string;

 @Field()
 @IsAlphanumeric()
 @MinLength(5)
 username:string;

 @Field()
 @IsStrongPassword()
 password:string;

 @Field()
 @IsPhoneNumber()
 phoneNumber:string;

 @Field()
 @MinLength(5)
 @MaxLength(5)
 @IsNumberString()
 txPin:string;
}

