import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Stock } from '../entities/stocks.entity';
import { CreateStockDto } from '../dtos/create-stock.dto';
import { StocksService } from '../stocks.service';

@Resolver()
export class StocksResolver {

    constructor(private stocksService: StocksService) {}

    @Mutation(() => Stock)
    async createStock(
        @Args('input') createStockDto: CreateStockDto
    ): Promise<Stock> {
        return this.stocksService.CreateStock(createStockDto);
    }

}