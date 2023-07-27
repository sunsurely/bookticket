import dotenv from 'dotenv';
dotenv.config();

const env: NodeJS.ProcessEnv = process.env;

const development: any = {
  use_env_variable: false,
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  //port: env.MYSQL_PORT
};

const production: any = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  //port: env.MYSQL_PORT
};

const test: any = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  //port: env.MYSQL_PORT
};

export { development, production, test };
