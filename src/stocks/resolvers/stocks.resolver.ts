import { Args, Mutation, Resolver, Query} from '@nestjs/graphql';
import { Stock } from '../entities/stocks.entity';
import { CreateStockDto } from '../dtos/create-stock.dto';
import { StocksService } from '../stocks.service';

@Resolver(() => Stock) 
export class StocksResolver {

    constructor(private stocksService: StocksService) {}

    @Query(() => [Stock]) 
    async getStocks(): Promise<Stock[]> {
        return this.stocksService.getStocks();
    }

    @Query(() => Stock)
    async getStockByTicker(@Args('ticker') ticker: string): Promise<Stock> {
        return this.stocksService.getStockByTicker(ticker);
    }   

    @Mutation(returns => Stock)
    async createStock(
        @Args('Stock') createStockDto: CreateStockDto
    ): Promise<Stock> {
        return this.stocksService.createStock(createStockDto);
    }
}