const dotenv = require('dotenv')

/**
 * Load environment variables from .env file
 */
dotenv.config({ path: '.env' })

const { PORT = '3000', MONGODB_URI } = process.env
const LOCATION_STATUS_ENUM = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Seldom', 'Once', 'Often', 'Never']
const CURRENT_DATE = new Date()
const MORGAN_LOG_LEVEL = 'dev'
const WINSTON_LOG_LEVEL = 'info'
const WINSTON_LOG_FILE = 'logfile.log'
const PAGINATION_OPTIONS = {
    page: 1,
    limit: 10
};

module.exports = {
	PORT,
	MONGODB_URI,
	LOCATION_STATUS_ENUM,
	CURRENT_DATE,
	MORGAN_LOG_LEVEL,
	WINSTON_LOG_LEVEL,
	WINSTON_LOG_FILE,
	PAGINATION_OPTIONS
}