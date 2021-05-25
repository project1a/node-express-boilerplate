/* eslint-disable no-restricted-syntax */
const { Model } = require('sequelize');

class BaseModel extends Model {
  static toJSON() {
    const attributes = { ...this.get() };
    for (const a of this.PROTECTED_ATTRIBUTES) {
      delete attributes[a];
    }
    return attributes;
  }
}
BaseModel.PROTECTED_ATTRIBUTES = [];

module.exports = BaseModel;
