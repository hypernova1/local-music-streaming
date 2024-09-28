import * as dotenv from 'dotenv';
import * as path from 'path';

const nodeEnv = process.env.NODE_ENV || 'prod';

dotenv.config({
  path: path.join(`env/${nodeEnv}.env`),
});

const env = {
  DB_HOST: String(process.env.DB_HOST),
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: String(process.env.DB_USER),
  DB_PASSWORD: String(process.env.DB_PASSWORD),
}

export default env;