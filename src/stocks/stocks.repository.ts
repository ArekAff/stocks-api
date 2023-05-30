import { Repository, DataSource} from "typeorm";
import { Stock } from "./entities/stocks.entity";
import { CreateStockDto } from "./dtos/create-stock.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class StocksRepository extends Repository<Stock> {

    constructor(private dataSource: DataSource) {
        super(Stock, dataSource.createEntityManager());
    }
    async getStocks(): Promise<Stock[]> {
        const query = this.createQueryBuilder('stock');
        const stocks = await query.getMany();
        return stocks;
    }

    async getStockByTicker(ticker: string): Promise<Stock> {
        const query = this.createQueryBuilder('stock');
        query.where('stock.ticker = :ticker', { ticker });
        try {
            const stock = await query.getOne();
            return stock;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }


    async createStock({ ticker, price, timestamp}: CreateStockDto): Promise<Stock> {
        // if the stock already exists, update it
        const check = await this.getStockByTicker(ticker);
        if (check) {
            return await this.updateStock(ticker, {ticker, price, timestamp});
        }
        const stock = this.create({
            ticker,
            price,
            timestamp
        });

        try {
            await stock.save();
            return stock;
        } catch (error) {
            throw error.message;
        }
    }
    async updateStock(ticker: string, { price, timestamp}: CreateStockDto): Promise<Stock> {
        const stock = await this.getStockByTicker(ticker);
        // if the stock doesn't exist, create it
        if (!stock) {
            return await this.createStock({ticker, price, timestamp});
        }
        stock.price = price;
        stock.timestamp = timestamp;
        try {
            await stock.save();
            return stock;
        } catch (error) {
            throw error.message;
        }
    }
    
}
