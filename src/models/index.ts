import Sequelize from 'sequelize';
import configObj from '../../config/config';
import User from './user';

const env = (process.env.NODE_ENV as 'production') || 'development';
const config = configObj[env];

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);

User.associate();

export { sequelize, User };
