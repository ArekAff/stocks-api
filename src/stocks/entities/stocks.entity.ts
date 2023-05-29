import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@ObjectType()
@Entity()   
export class Stock extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: string;

    @Column()
    @Field()
    ticker: string;

    @Column()
    @Field()
    price: number;

    @Column()
    @Field()
    timestamp: Date;
}


