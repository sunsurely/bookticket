'use strict';
import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import Reservation from './reservation';
import Performance from './performance';

class Seat extends Model<InferAttributes<Seat>, InferCreationAttributes<Seat>> {
  declare seat_id: CreationOptional<number>;
  declare performance_id: number;
  declare seat_number: number;
  declare seat_grade: string;
  declare price: number;

  static initiate(sequelize: Sequelize.Sequelize) {
    Seat.init(
      {
        seat_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        performance_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        seat_number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        seat_grade: {
          type: Sequelize.ENUM('B', 'A', 'S', 'R', 'VIP'),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Seat',
        tableName: 'seats',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate() {
    this.hasMany(Reservation, { foreignKey: 'seat_id', sourceKey: 'seat_id' });
    this.belongsTo(Performance, {
      foreignKey: 'performance_id',
      targetKey: 'performance_id',
    });
  }
}

export default Seat;
