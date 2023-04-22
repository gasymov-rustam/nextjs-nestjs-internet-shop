import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { SEQUELIZE_DATABASE_KEY } from './constants';

export const sqlConfig = registerAs(SEQUELIZE_DATABASE_KEY, () => ({
  dialect: <Dialect>process.env.SQL_DIALECT ?? 'mysql',
  logging: process.env.SQL_LOGGING === 'true',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadModels: true,
  synchronize: true,
}));
