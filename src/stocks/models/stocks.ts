import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class Stock{

    @Field(type => ID)
    id: string;

    @Field()
    ticker: string;

    @Field()
    price: number;

    @Field()
    timestamp: Date;
}