import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";


@ObjectType()
@Entity()   
export class Stock extends BaseEntity {
    @PrimaryColumn()
    @Field()
    ticker: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    @Field()
    price: number;

    @Column()
    @Field()
    timestamp: Date;
}


