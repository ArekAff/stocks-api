import {Test, TestingModule} from '@nestjs/testing';
import { StocksService } from '../stocks.service';
import {CreateStockDto } from '../dtos/create-stock.dto';
import {StocksResolver} from '../resolvers/stocks.resolver';
import { before } from 'node:test';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { StocksRepository } from '../stocks.repository';

describe('StocksResolver', () => {
    let resolver: StocksResolver;
    let module: TestingModule;

beforeAll(async () => {
    module = await Test.createTestingModule({
        imports: [
        TypeOrmModule.forRoot(typeOrmConfig), // Use the actual TypeORM configuration
        TypeOrmModule.forFeature([StocksRepository]), // Import the repository
    ],
    providers: [StocksResolver, StocksService],
    }).compile();

    resolver = module.get<StocksResolver>(StocksResolver);
});

    afterAll(async () => {
    await module.close(); // Close the module after all tests are completed
    });

    it('should be defined', () => {
    expect(resolver).toBeDefined();
    });
    describe('getStocks', () => {
        it('should return all stocks', async () => {
            const stocks = await resolver.getStocks();
            expect(stocks).toEqual([
                {
                    ticker: "AAPL",
                    price: 100,
                    timestamp: new Date(),
                },
                {
                    ticker: "GOOG",
                    price: 200,
                    timestamp: new Date(),
                },
            ]);
        });
    }
    );
    describe('getStockByTicker', () => {
        it('should return stock by ticker', async () => {
            const stock = await resolver.getStockByTicker("AAPL");
            expect(stock).toEqual({
                ticker: "AAPL",
                price: 100,
                timestamp: new Date(),
            });
        });
    }
    );
    describe('createStock', () => {
        it('should create a new stock', async () => {
            const stock = await resolver.createStock({
                ticker: "AAPL",
                price: 100,
                timestamp: new Date(),
            });
            expect(stock).toEqual({
                ticker: "AAPL",
                price: 100,
                timestamp: new Date(),
            });
        });
    }
    );
});