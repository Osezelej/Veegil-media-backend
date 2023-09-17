import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsCurrency, IsDateString, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';


@InputType()
export class CreateTransactionInput {
  @Field()
  @IsPhoneNumber('NG')
  phoneNumber:string;

  @Field()
  @IsPhoneNumber('NG')
  to:string = null;
  
  @Field()
  @IsAlphanumeric()
  @MinLength(5)
  username:string

  @Field()
  @MinLength(5)
  @MaxLength(6)
  @IsAlpha()
  txType: 'credit'| 'debit';

  @Field()
  @IsCurrency()
  txAmount:string;

  @Field()
  @IsDateString()
  txDate:string;

  @Field()
  txTime:string;
}
