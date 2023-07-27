'use strict';
import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from 'sequelize';

import Seat from './seat';
import Reservation from './reservation';

class Performance extends Model<
  InferAttributes<Performance>,
  InferCreationAttributes<Performance>
> {
  declare performance_id: number;
  declare title: string;
  declare date: Date;
  declare address: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Performance.init(
      {
        performance_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Performance',
        tableName: 'performance',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate() {
    this.hasMany(Seat, {
      foreignKey: 'performance_id',
      sourceKey: 'performance_id',
    });
    this.hasMany(Reservation, {
      foreignKey: 'performance_id',
      sourceKey: 'performance_id',
    });
  }
}

export default Performance;
