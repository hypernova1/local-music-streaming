import { DataSourceOptions } from "typeorm";
import env from "../../common/env";

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  username: 'postgres',
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: 'samtreaming',
  synchronize: true,
  logging: ['error', 'schema', 'warn', 'query'],
  entities: ['dist/src/**/*.entity{.js,.ts}'],
}