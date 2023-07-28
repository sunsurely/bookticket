'use strict';
import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import Reservation from './reservation';

class Performance extends Model<
  InferAttributes<Performance>,
  InferCreationAttributes<Performance>
> {
  declare performance_id: CreationOptional<number>;
  declare title: string;
  declare date: Date;
  declare address: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Performance.init(
      {
        performance_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
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
    this.hasMany(Reservation, {
      foreignKey: 'performance_id',
      sourceKey: 'performance_id',
    });
  }
}

export default Performance;
