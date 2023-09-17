import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.type";

@ObjectType()
export class LoginResposeType{
    @Field()
    access_token: string;

    @Field()
    user:User;
}
