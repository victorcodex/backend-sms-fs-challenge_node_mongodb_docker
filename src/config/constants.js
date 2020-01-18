const dotenv = require('dotenv');
const { getLocationSeedDataFromFile } = require('./helpers');

/**
 * General
 */
dotenv.config({ path: '.env' }); // Load environment variables from .env file
const { PORT = '3000', MONGODB_URI } = process.env;
const CURRENT_DATE = new Date();
const PAGINATION_OPTIONS = {
  page: 1,
  limit: 10,
};

/**
 * Winston related
 */
const MORGAN_LOG_LEVEL = 'dev';
const WINSTON_LOG_LEVEL = 'info';
const WINSTON_LOG_FILE = 'logfile.log';

/**
 * Location module related
 */
const LOCATION_STATUS_ENUM = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Seldom', 'Once', 'Often', 'Never'];
const LOCATION_MOCK_DATA = {
  city: 'Dusseldorf',
  start_date: '9/16/2012',
  end_date: '8/19/2013',
  price: '17.40',
  color: '#819a11',
};
const LOCATION_MODEL_SEED_DATA = getLocationSeedDataFromFile();


module.exports = {
  PORT,
  MONGODB_URI,
  LOCATION_STATUS_ENUM,
  CURRENT_DATE,
  MORGAN_LOG_LEVEL,
  WINSTON_LOG_LEVEL,
  WINSTON_LOG_FILE,
  PAGINATION_OPTIONS,
  LOCATION_MOCK_DATA,
  LOCATION_MODEL_SEED_DATA,
};
