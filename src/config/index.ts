import dotenv from 'dotenv';
import path from 'path';

// describes a secrets object
type Secrets = Readonly<{
  env: string;
  version: string;
  port: string;
  secrets: {
    jwtSecret: string;
    jwtExpiresIn: string;
    dbURL: string;
    testDbURL: string;
  };
}>;

const env = process.env.NODE_ENV || 'development';
let envfile: string;

switch (env) {
  case 'production':
    envfile = '.env';
    break;
  case 'test':
    envfile = '.env.test';
    break;
  case 'development':
  default:
    envfile = '.env.local';
    break;
}

const envpath: string = path.join(__dirname, '../..', envfile);
let cache: Secrets;

export default function config() {
  if (!cache) {
    dotenv.config({ path: envpath });
    cache = Object.freeze({
      env,
      version: process.env.API_VERSION || 'v1',
      port: process.env.PORT || '3000',
      secrets: {
        jwtSecret: process.env.JWT_SECRET || '',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '',
        dbURL: process.env.MONGO_URI || '',
        testDbURL: process.env.MONGO_URI_TEST || '',
      },
    });
  }
  return cache;
}
