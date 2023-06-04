import {Test, TestingModule} from '@nestjs/testing';
import { StocksService } from '../stocks.service';
import {CreateStockDto } from '../dtos/create-stock.dto';
import {UpdateStockDto} from '../dtos/update-stock.dto';
import {StocksResolver} from '../resolvers/stocks.resolver';
import { before } from 'node:test';

describe('StocksResolver', () => {
    let resolver: StocksResolver;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StocksResolver,
                {
                    provide: StocksService,
                    useFactory: () => ({
                        createStock: jest.fn((stock: CreateStockDto) => ({
                            ...stock,
                        })),
                        updateStock: jest.fn((stock: UpdateStockDto) => ({
                            ...stock,
                        })),
                        getStocks: jest.fn(() => [
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
                        ]),
                        getStockByTicker: jest.fn((ticker: string) => ({
                            ticker: ticker,
                            price: 100,
                            timestamp: new Date(),
                        })),
                    }),
                }
            ]
        }).compile();
        resolver = module.get<StocksResolver>(StocksResolver);
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
    describe('updateStock', () => {
        it('should update a stock', async () => {
            const stock = await resolver.updateStock({
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
    });
});