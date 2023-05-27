import { Repository,EntityRepository, Entity } from "typeorm";
import { Stock } from "./entities/stocks.entity";
import { CreateStockDto } from "./dtos/create-stock.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@EntityRepository(Stock)
export class StocksRepository extends Repository<Stock> {

    async getStocks(): Promise<Stock[]> {
        const query = this.createQueryBuilder('stock');
        const stocks = await query.getMany();
        return stocks;
    }

    async createStock({ ticker, price}: CreateStockDto): Promise<Stock> {
        const stock = this.create({
            ticker,
            price,
        });

        try {
            await stock.save();
            return stock;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
