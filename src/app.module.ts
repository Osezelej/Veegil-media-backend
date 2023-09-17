import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Transaction } from './transaction/entities/transaction.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile:join(process.cwd(), 'src/schema.gql'),
    driver:ApolloDriver,
    playground:true
  }),
  TypeOrmModule.forRoot({
    type:'mongodb',
    url:'mongodb+srv://osezelejoseph:5GvQFZDBg4ZZ7XYH@cluster0.7uwgrbb.mongodb.net/?retryWrites=true&w=majority',
    synchronize:true,
    autoLoadEntities:true,
    useUnifiedTopology:true,
  }),
  UserModule,
  AuthModule,
  TransactionModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
