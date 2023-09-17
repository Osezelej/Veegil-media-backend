import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class TransactionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx =  GqlExecutionContext.create(context)
    const request = ctx.getContext();
    request.body = ctx.getArgs().createTransactionInput;
    return false;
  }
}
