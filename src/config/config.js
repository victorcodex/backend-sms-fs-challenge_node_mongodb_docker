const winston = require('winston');
const { WINSTON_LOG_LEVEL, WINSTON_LOG_FILE } = require('./constants');

const logger = winston.createLogger({
  level: WINSTON_LOG_LEVEL,
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: WINSTON_LOG_FILE }),
  ],
});

module.exports = {
  logger,
};
