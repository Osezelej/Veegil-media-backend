import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { TransactionType } from './transaction.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';


@Resolver(() => TransactionType)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => TransactionType)
  @UseGuards(JwtAuthGuard)
  createTransactions(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput, ) {
    return this.transactionService.create(createTransactionInput);
  }


  @Query(() => [TransactionType], { name: 'getTransaction' })
  @UseGuards(JwtAuthGuard)
  findAll(@Args('acctno') acctno:string) {
    return this.transactionService.findAll(acctno);
  }

  @Query(() => TransactionType, { name: 'transaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.findOne(id);
  }
}
