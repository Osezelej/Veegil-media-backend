import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginResposeType } from './login_response.type';
import { LoginUserInput } from './login_user.input';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth_guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly authservice:AuthService){}

    @Query(()=>LoginResposeType)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginInput') LoginUserInput:LoginUserInput, @Context() context){
        
        return this.authservice.login(context.user)
    }
}
