import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testOptions } from 'src/libs/database/typeorm.datasource';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => testOptions,
      dataSourceFactory: async (opt) => {
        const logger = new Logger('DataBaseModule');
        logger.log('♺ Connecting to DataBase');
        const dataSource = await new DataSource(opt).initialize();
        logger.log('✔ DataBase connect Success ');
        return dataSource;
      },
    }),
  ],
})
export class TestDatabaseModule {}
