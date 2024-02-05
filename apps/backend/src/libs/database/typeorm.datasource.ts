import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: false,
  // authSource: 'admin',
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
