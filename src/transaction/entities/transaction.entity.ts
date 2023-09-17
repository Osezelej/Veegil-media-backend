
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Transaction{
    @ObjectIdColumn()
    _id:string;

    @PrimaryColumn()
    id:string;
    
    @Column()
    acctNo:string;

    @Column()
    to:string | null = null;

    @Column()
    from:string | null = null;

    @Column()
    username:string;
  
    @Column()
    txType: 'credit'| 'debit';
  
    @Column()
    txAmount:string;
  
    @Column()
    txDate:string;
  
    @Column()
    txTime:string;
}