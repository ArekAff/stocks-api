import { Field, InputType} from '@nestjs/graphql';
import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class UpdateStockDto {
    @IsNotEmpty()
    @Field()
    ticker: string;

    @IsNotEmpty()
    @Field()
    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    price: number;

    @IsNotEmpty()
    @Field()
    timestamp: Date;
}