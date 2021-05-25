const { Sequelize } = require('sequelize');
const config = require('../config/config');
const models = require('../models');

class Connection {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config.db.database, config.db.username, config.db.password, {
      host: config.db.host,
      port: config.db.port,
      dialect: config.db.connection,
    });

    Object.keys(models).forEach((model) => {
      models[model].init(this.connection);
    });

    Object.keys(models).forEach((model) => {
      if ('hook' in models[model]) {
        models[model].hook(models);
      }
    });

    Object.keys(models).forEach((model) => {
      if ('associate' in models[model]) {
        models[model].associate(models);
      }
    });
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = Connection;
