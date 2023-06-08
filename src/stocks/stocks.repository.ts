import { Repository, DataSource} from "typeorm";
import { Stock } from "../entities/stocks.entity";
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


    async createStock({ ticker, price, timestamp }: CreateStockDto): Promise<Stock> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
    
        try {
          // Remove existing quote for the ticker, if any
        await queryRunner.manager.delete(Stock, { ticker });
          // Create the new quote
        const stock = this.create({ ticker, price, timestamp });
        await queryRunner.manager.save(stock);
        await queryRunner.commitTransaction();

        return stock;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error.message);
        } finally {
            await queryRunner.release();
        }
    }
    
}
