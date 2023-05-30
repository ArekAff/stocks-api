import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';
import { CreateStockDto } from './dtos/create-stock.dto';
import { Stock } from './entities/stocks.entity';

@Injectable()
export class StocksService {
    constructor( private stocksRepository: StocksRepository) {}

    async getStocks(): Promise<Stock[]> {
    return await this.stocksRepository.getStocks();
    }

    async getStockByTicker(ticker: string): Promise<Stock> {
    return await this.stocksRepository.getStockByTicker(ticker);
    }

    async createStock(createStockDto: CreateStockDto): Promise<Stock> {
    return await this.stocksRepository.createStock(createStockDto);
    }
}
