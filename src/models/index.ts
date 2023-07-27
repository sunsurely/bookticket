import Sequelize from 'sequelize';
import configObj from '../../config/config';
import User from './user';
import Seat from './seat';
import Performance from './performance';
import Reservation from './reservation';

const env = (process.env.NODE_ENV as 'production') || 'development';
const config = configObj[env];

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);
Reservation.initiate(sequelize);
Performance.initiate(sequelize);
Seat.initiate(sequelize);

User.associate();
Reservation.associate();
Performance.associate();
Seat.associate();

export { sequelize, User, Reservation, Performance, Seat };
