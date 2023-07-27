'use strict';
import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from 'sequelize';

import Reservation from './reservation';
import Performance from './performance';

class Seat extends Model<InferAttributes<Seat>, InferCreationAttributes<Seat>> {
  declare seat_id: number;
  declare performance_id: number;
  declare seat_number: string;
  declare seat_grade: string;
  declare price: number;
  declare reserved: boolean;

  static initiate(sequelize: Sequelize.Sequelize) {
    Seat.init(
      {
        seat_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        performance_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        seat_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        seat_grade: {
          type: DataTypes.ENUM('b', 'a', 's', 'r', 'vip'),
          allowNull: false,
        },
        reserved: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
