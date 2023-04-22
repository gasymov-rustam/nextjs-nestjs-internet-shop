import { registerAs } from '@nestjs/config';
import { sqlConfig } from './sql.config';
import { SEQUELIZE_DATABASE_KEY } from './constants';

export const dataBaseConfig = registerAs(SEQUELIZE_DATABASE_KEY, () => ({
  sql: {
    ...sqlConfig(),
  },
}));
