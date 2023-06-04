import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksRepository } from './stocks.repository';
import { StocksResolver } from './resolvers/stocks.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StocksRepository])],
  providers: [StocksResolver,StocksService, StocksRepository],
})
export class StocksModule {}
