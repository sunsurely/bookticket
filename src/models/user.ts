'use strict';
import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Reservation from './reservation';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare user_id: CreationOptional<number>;
  declare email: string;
  declare nickname: string;
  declare status: CreationOptional<string>;
  declare point: CreationOptional<number>;
  declare call: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare provider: CreationOptional<string>;
  declare sns_id: CreationOptional<string>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        call: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provider: {
          type: Sequelize.ENUM('local', 'kakao'),
          allowNull: false,
          defaultValue: 'local',
        },
        sns_id: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        status: {
          type: Sequelize.ENUM('normal', 'admin'),
          allowNull: false,
          defaultValue: 'normal',
        },
        point: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 1000000,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate() {
    this.hasMany(Reservation, { foreignKey: 'user_id', sourceKey: 'user_id' });
  }
}

export default User;
