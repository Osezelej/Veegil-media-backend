import { ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {v4 as uuid} from 'uuid';
import { User as UserType} from './user.type';
import * as bcrypt from "bcrypt"
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { assert } from 'console';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
  userData = [
    {
      "id": "bc4c8774-af1b-452b-bb45-01841ad6ba61",
      "email": "2osezelejoseph@gmail.com",
      "username": "osezeleJ",
      "phoneNumber": "08076320300",
      "acctBalance": "0.00",
      "txPin": "1234",
      "password":"@Bestboy123"
    },
    {
      "id": "4b5b61ad-28de-436b-95dd-addf3e0f1f94",
      "email": "2osezelejoseph@gmail.com",
      "username": "etoDavid",
      "phoneNumber": "08076320300",
      "acctBalance": "0.00",
      "txPin": "1234",
      "password":"@Bestboy123"
    },
    {
      "id": "2a405d5b-114f-4fa1-8762-87ecdb4bb92e",
      "email": "2osezelejoseph@gmail.com",
      "username": "joshua emmanuel",
      "phoneNumber": "08076320300",
      "acctBalance": "0.00",
      "txPin": "1234"
    }
  
  ]
  validatePhone(phoneNumber:string){
    if(phoneNumber[0] == '+' && phoneNumber[4] == '0'){
      return phoneNumber.slice(5)
      
    }else if(phoneNumber[0] == '+' && phoneNumber[4] != '0'){
      return phoneNumber.slice(4)
      
    }else if(phoneNumber[0] == '0'){
     return phoneNumber.slice(1)
      
    }else{
      return phoneNumber
    }
  }

  async create(createUserInput: CreateUserInput):Promise<UserType> {
    let phone = this.validatePhone(createUserInput.phoneNumber);
    
    let user  =  await this.findOne(phone)
    if(user){
       throw new HttpException({
        message:'user already exists'
       }, HttpStatus.FORBIDDEN)
    }
    let password_ = await bcrypt.hash(createUserInput.password, 10)
    const data = {
      password:password_,
      email:createUserInput.email,
      username:createUserInput.username,
      txPin:createUserInput.txPin,
      phoneNumber:phone,
      id:uuid(),
      acctBalance: '0.00'

    }
    let singleUser = this.userRepository.create(data)
    const {password, ...result} = await this.userRepository.save(singleUser) ;
    return{...result};
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(phoneNumber:string){
  
    const user = await this.userRepository.findOneBy({
      phoneNumber
    })
    if (user){
      return user
    }
    return null
  }

  async updateBal(phoneNumber:string, to:string = null, type:'credit'|'debit', amount:string) {
    let phoneNumber_ = this.validatePhone(phoneNumber);
    let to_ = this.validatePhone(to);
    let sender = await this.findOne(phoneNumber_);
    let reciever = await this.findOne(to_);
    console.log(phoneNumber_,sender)
    console.log(to_, reciever)
    if (type === 'credit' && sender){
      return await this.depositandUpdateBal(sender, amount, sender.username)
    }
    if(type ==='debit' && reciever  && sender ){
      return await this.transferAndUpdateBal(sender, reciever, amount)
    }
    throw new ForbiddenException()
  } 

  async depositandUpdateBal(user:User, amount: string, from:string) {
      let preBal = parseFloat(user.acctBalance)
      let curBal = parseFloat(amount)
      let newBaL = preBal +curBal;
      return await this.userRepository.update({phoneNumber:user.phoneNumber}, {acctBalance:newBaL.toString(),})
  }
  async transferAndUpdateBal(sender:User, reciever:User, amount:string){
    let senderPrevBal = parseFloat(sender.acctBalance);
    let senderCurBal = parseFloat(amount);
    if (senderCurBal > senderPrevBal){
      return null
    }
    
    let senderNewBal = senderPrevBal - senderCurBal
    this.depositandUpdateBal(reciever, amount, sender.phoneNumber)
    return await this.userRepository.update({phoneNumber:sender.phoneNumber}, {acctBalance:senderNewBal.toString(),})
  }
}