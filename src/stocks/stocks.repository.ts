import { Repository,EntityRepository, DataSource} from "typeorm";
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

    async createStock({ ticker, price}: CreateStockDto): Promise<Stock> {
        const stock = this.create({
            ticker,
            price,
            timestamp: new Date(),
        });

        try {
            await stock.save();
            return stock;
        } catch (error) {
            throw error.message;
        }
    }
}
