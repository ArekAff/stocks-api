import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'postgres-service',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'stocks-management',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
};