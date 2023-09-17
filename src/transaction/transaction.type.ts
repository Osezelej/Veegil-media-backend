import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TransactionType{
    @Field(()=>ID)
    id:string;
    
    @Field()
    acctNo:string

    @Field()
    to:string | null;

    @Field()
    from: string | null;
  
    @Field()
    txType: 'credit'| 'debit';
  
    @Field()
    txAmount:string;
  
    @Field()
    txDate:string;
  
    @Field()
    txTime:string;
}