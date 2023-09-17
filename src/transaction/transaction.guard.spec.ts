import { TransactionGuard } from './transaction.guard';

describe('TransactionGuard', () => {
  it('should be defined', () => {
    expect(new TransactionGuard()).toBeDefined();
  });
});
