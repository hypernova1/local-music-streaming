import { DataSourceOptions } from "typeorm";
import env from "../../common/env";

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  username: 'postgres',
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: 'samtreaming',
  synchronize: false,
  logging: ['error', 'schema', 'warn'],
  entities: ['dist/src/**/*.entity{.js,.ts}'],
}