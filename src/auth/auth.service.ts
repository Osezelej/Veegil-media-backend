import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.type';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,
        private readonly jwtService:JwtService){

    }

    async validateUser(phoneNumber:string, password:string){
        let phone = this.userService.validatePhone(phoneNumber)
        console.log(phone)
        const user = await this.userService.findOne(phone)
        const valid = await bcrypt.compare(password, user.password)
        if (user && valid){
            let {password, ...result} = user
            return result
        }
        return null
    }
    login(user:User){
        console.log(user)
        return{
            access_token:this.jwtService.sign({phoneNumber:user.phoneNumber, sub:user.id}),
            user,
        }
    }
}
