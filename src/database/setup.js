/* eslint-disable  */
const config = require('../config/config');
const glob = require('glob');
const path = require('path');
const logger = require('../config/logger');
const Connection = require('./connection');
const seederGenerator = require('./seeders');

async function init() {
  logger.info('Recreating and seeding the database.');

  // Loading sequelize models
  const sequelize = new Connection().getConnection();

  return sequelize;
}

async function setup() {
  logger.info('Recreating and seeding the database.');

  // Loading sequelize models
  const sequelize = new Connection().getConnection();

  if (config.env === 'development') {
    await sequelize.sync({ force: true });
    logger.info('Database synchronized');
  }

  // Database seeding
  await seederGenerator();

  logger.info('Database configuration is done.');
  return sequelize;
}

module.exports = { init, setup };
