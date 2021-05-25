const { DataTypes } = require('sequelize');
const BaseModel = require('./base/BaseModel');
const { tokenTypes } = require('../config/tokens');

class AuthToken extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM(Object.values(tokenTypes)),
          allowNull: false,
        },
        expires: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        blacklisted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'AuthToken',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

module.exports = AuthToken;
