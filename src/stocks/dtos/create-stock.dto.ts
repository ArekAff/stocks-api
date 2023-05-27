import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateStockDto {
    @IsNotEmpty()
    @Field()
    ticker: string;

    @IsNotEmpty()
    @Field()
    price : number;

    @IsNotEmpty()
    @Field()
    timestamp : Date;
}