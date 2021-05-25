const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { init: initDatabase, setup: setupDatabase } = require('./database/setup');

let server;
let sequelize;
async function init() {
  sequelize = await initDatabase();
  sequelize
    .authenticate()
    .then(async () => {
      logger.info('Connected to Sequelize');
      await setupDatabase();
      server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
      });
    })
    .catch((error) => {
      logger.error(`Unable to connect to the database: ${error}`);
    });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      if (sequelize) {
        sequelize.close();
      }
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
  if (sequelize) {
    sequelize.close();
  }
});

init();
