import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { Stock } from '../entities/stocks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
describe('StocksService', () => {
  let service: StocksService;

  const stockRepositoryMock: MockType<StocksRepository> = {
    getStocks: jest.fn(),
    getStockByTicker: jest.fn(),
    createStock: jest.fn(),

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksService,
        {
          provide: StocksRepository,
          useClass: StocksRepository,
        },
      ],
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => typeOrmConfig,
        }),
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe("getStocks", () =>{
    it("should return all stocks", async () => {
      const stocks = [
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
      ];
      stockRepositoryMock.getStocks.mockReturnValue(stocks);
      const foundStocks = await service.getStocks();
      expect(foundStocks).toContainEqual({
        ticker: "AAPL",
        price: 100,
        timestamp: new Date(),
      });
      expect(stockRepositoryMock.getStocks).toHaveBeenCalled();
    });
  });
  describe("getStockByTicker", () =>{ 
    it("should return stock by ticker", async () => {
      const stock = {
        ticker: "AAPL",
        price: 100,
        timestamp: new Date(),
      };
      stockRepositoryMock.getStockByTicker.mockReturnValue(stock);
      const foundStock = await service.getStockByTicker("AAPL");
      expect(foundStock).toEqual({
        ticker: "AAPL",
        price: 100,
        timestamp: new Date(),
      });
      expect(stockRepositoryMock.getStockByTicker).toHaveBeenCalled();
    });
  });
  describe("createStock", () => {
    it("should create a new stock", async () => {
      const stockDTO = {
        ticker: "AAPL",
        price: 100,
        timestamp: new Date(),
      };
      stockRepositoryMock.createStock.mockReturnValue(stockDTO);
      const createdStock = await service.createStock(stockDTO);
      expect(createdStock).toMatchObject(stockDTO);
      expect(stockRepositoryMock.createStock).toHaveBeenCalledWith(stockDTO);
    });
  });
});
