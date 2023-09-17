import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionType } from './transaction.type';
import {v4 as uuid} from 'uuid';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionService {
  constructor(private readonly userService:UserService,
    @InjectRepository(Transaction) private transactionRepository:Repository<Transaction>){}
  async create(createTransaction: CreateTransactionInput):Promise<TransactionType>{
    let phone = this.userService.validatePhone(createTransaction.phoneNumber);
    let phone2 = this.userService.validatePhone(createTransaction.to)
    let tx = this.transactionRepository.create({
      acctNo: phone,
      txAmount:createTransaction.txAmount,
      txDate:createTransaction.txDate,
      txType:createTransaction.txType,
      txTime:createTransaction.txTime,
      id:uuid(),
      username:createTransaction.username,
      from:phone,
      to: phone2
      
    });
    let tx2:Transaction | boolean = false
    if (createTransaction.txType == 'debit'){
      tx2 = this.transactionRepository.create({
        acctNo: phone2,
        txAmount:createTransaction.txAmount,
        txDate:createTransaction.txDate,
        txType:'credit',
        txTime:createTransaction.txTime,
        id:uuid(),
        username:createTransaction.username,
        from:phone,
        to: phone2
        
      });
    }
    let d = await this.userService.updateBal(
      createTransaction.phoneNumber, 
      createTransaction.to,
      createTransaction.txType, 
      createTransaction.txAmount)
    
      if(!d){
        throw new HttpException({
          message:'insufficient balance in your account'
        }, HttpStatus.FORBIDDEN)
      }    
      if(tx2){
       await this.transactionRepository.save(tx2)
      }
      return await this.transactionRepository.save(tx)
    
  }

  async findAll(acctNo:string):Promise<TransactionType[]> {
    return await this.transactionRepository.find({
      where:{
        acctNo:acctNo
      }
    })
  }

  findOne(id: number) {
    return {};
  }


}
