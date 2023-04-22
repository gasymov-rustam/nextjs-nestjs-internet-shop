import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { User } from '../users/Users.model';
import { SEQUELIZE_DATABASE_KEY } from './constants';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const { sql } = this.configService.get(SEQUELIZE_DATABASE_KEY);
    const { logging, dialect, host, port, username, password, database } = sql;

    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      //for russian language in database in other case can use just latins letters
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    };
  }
}
