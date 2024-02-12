import { config } from 'dotenv';
import { Floor } from 'src/modules/floor/entity/floor.entity';
import { ObjectMeta } from 'src/modules/object-storage/entity/objectMeta.entity';
import { Reserve } from 'src/modules/reserve/entity/reserve.entity';
import { Seat } from 'src/modules/seat/entity/seat.entity';
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
  // logging: process.env.NODE_ENV !== 'production',
  entities: [Seat, Floor, Reserve, ObjectMeta],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: false,
  dropSchema: process.env.NODE_ENV === 'test',
  // timezone: 'Asia/Seoul',
  // authSource: 'admin',
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
