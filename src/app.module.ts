import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { StocksModule } from './stocks/stocks.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { StocksService } from './stocks/stocks.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService, StocksService],
})
export class AppModule {}
