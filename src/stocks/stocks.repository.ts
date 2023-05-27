import { Repository } from "typeorm";
import { Stock } from "./entities/stocks.entity";
import { CreateStockDto } from "./dtos/create-stock.dto";
import { InternalServerErrorException } from "@nestjs/common";

export class StocksRepository extends Repository<Stock> {
    async createStock({ ticker, price }: CreateStockDto) {
        const stock = this.create({
            ticker,
            price,
            timestamp: new Date()
        });

        try {
            await stock.save();
            return stock;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
