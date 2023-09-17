import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
@Entity()
export class User{  
    @ObjectIdColumn()
    _id:string;

    @PrimaryColumn()
    id:string;

    @Column()
    email:string;

    @Column()
    username:string;

  
    @Column()
    password:string;

    @PrimaryColumn()
    phoneNumber:string;

    @Column()
    acctBalance:string;

    @Column()
    txPin:string;
}