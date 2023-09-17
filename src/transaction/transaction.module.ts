import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports:[UserModule, AuthModule, TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
