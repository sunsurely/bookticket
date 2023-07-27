'use strict';
import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from 'sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare user_id: CreationOptional<number>;
  declare email: string;
  declare nickname: string;
  declare call: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare provider: CreationOptional<string>;
  declare sns_id: CreationOptional<string>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        call: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        provider: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sns_id: {
          type: DataTypes.STRING(30),
          allowNull: true,
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

  static associate() {}
}

export default User;
