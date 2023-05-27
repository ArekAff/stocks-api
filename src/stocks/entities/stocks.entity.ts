import { Field, ObjectType, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
@ObjectType()
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


