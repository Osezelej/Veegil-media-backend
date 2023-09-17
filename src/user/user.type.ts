import { ObjectType, Field, ID } from "@nestjs/graphql";


@ObjectType('User')
export class User{ 
    @Field(()=>ID)
    id:string;

    @Field()
    email:string;

    @Field()
    username:string;

    @Field()
    phoneNumber:string;

    @Field()
    acctBalance:string;

    @Field()
    txPin:string;
}