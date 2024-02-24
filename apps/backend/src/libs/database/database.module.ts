import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { ConfigurationModule } from '../config/config.module';
import { getOptions } from './typeorm.datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: getOptions,
      dataSourceFactory: async (opt) => {
        const logger = new Logger('DataBaseModule');
        logger.log('♺ Connecting to DataBase');
        const dataSource = await addTransactionalDataSource(
          new DataSource(opt),
        ).initialize();
        logger.log('✔ DataBase connect Success ');
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
