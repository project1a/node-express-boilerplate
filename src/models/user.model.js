/* eslint-disable no-param-reassign */
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const BaseModel = require('./base/BaseModel');
const { roles } = require('../config/roles');
// const logger = require('../config/logger');

class User extends BaseModel {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter your name',
            },
          },
        },
        lastName: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING(80),
          unique: true,
          allowNull: false,
          set(value) {
            this.setDataValue('email', String(value).trim());
          },
          validate: {
            isEmail: {
              args: true,
              msg: 'Please enter an email',
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          get() {
            return () => this.getDataValue('password');
          },
          validate: {
            notEmpty: true,
          },
        },
        role: {
          type: DataTypes.ENUM(roles),
          defaultValue: 'user',
        },
        isEmailVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        hooks: {},
        sequelize,
        modelName: 'User',
      }
    );

    return this;
  }

  async isPasswordMatch(comparedPassword) {
    const result = (await bcrypt.compare(comparedPassword, this.password())) || false;
    return result;
  }

  static async generatePasswordHash(password) {
    const hashedPassword = await bcrypt.hash(String(password).trim(), 8);
    return hashedPassword;
  }

  static hook(/* models */) {}

  static associate(models) {
    this.hasMany(models.AuthToken);
  }
}

User.PROTECTED_ATTRIBUTES = ['password'];

module.exports = User;
