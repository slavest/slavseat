import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const getOptions = () => {
  return process.env.NODE_ENV === 'test' ? testOptions : options;
};

export const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  // logging: process.env.NODE_ENV !== 'production',

  entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: false,
  dropSchema: process.env.NODE_ENV === 'test',
  timezone: 'Asia/Seoul',
  // authSource: 'admin',
};

export const testOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  // logging: process.env.NODE_ENV !== 'production',

  entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
  dropSchema: true,
  // timezone: 'Asia/Seoul',
  // authSource: 'admin',
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
