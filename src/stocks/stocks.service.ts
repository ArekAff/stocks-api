import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

    async deleteStockByID(id: string): Promise<string> {
        const deleteResult = await this.stocksRepository.delete({ id });

        if (deleteResult.affected === 0) {
            throw new InternalServerErrorException(
                `Stock with ID ${id} not found.`
            );
        } else {
            return id;
        }
    }

    async updateStock(ticker: string, updateStockDto: CreateStockDto): Promise<Stock> {
        return await this.stocksRepository.updateStock(ticker, updateStockDto);
    }



    
}
