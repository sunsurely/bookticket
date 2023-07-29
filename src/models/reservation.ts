'use strict';
import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import User from './user';
import Seat from './seat';
import Performance from './performance';

class Reservation extends Model<
  InferAttributes<Reservation>,
  InferCreationAttributes<Reservation>
> {
  declare reservation_id: CreationOptional<number>;
  declare seat_id: number;
  declare user_id: number;
  declare performance_id: number;

  static initiate(sequelize: Sequelize.Sequelize) {
    Reservation.init(
      {
        reservation_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        seat_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        performance_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Reservation',
        tableName: 'reservations',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate() {
    this.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
    this.belongsTo(Seat, { foreignKey: 'seat_id', targetKey: 'seat_id' });
    this.belongsTo(Performance, {
      foreignKey: 'performance_id',
      targetKey: 'performance_id',
    });
  }
}

export default Reservation;
