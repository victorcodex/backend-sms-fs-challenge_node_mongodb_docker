const express = require('express')
const helmet = require('helmet')
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { logger } = require('./src/config/config')
const { PORT, MONGODB_URI, CURRENT_DATE, MORGAN_LOG_LEVEL } = require('./src/config/constants')
const Location = require('./src/models/Location')

/**
 * Create Express server.
 */
const app = express()

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(MONGODB_URI, () => {
  logger.info(`About to start seeding locations collection :: ${CURRENT_DATE}`)
  Location.seedLocationModel(Location) //Initiate Location Model Data seeding
})
mongoose.connection.on('error', err => {
  logger.error(`MongoDB connection error - ${err} :: ${CURRENT_DATE}`)
})

/**
 * Express configuration.
 */
app.use(helmet())
app.use(cors())
app.use(morgan(MORGAN_LOG_LEVEL))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
	logger.info(`Welcome to sms-fs-challenge :: ${CURRENT_DATE}`)
 	res.send('Welcome to sms-fs-challenge')
})

/**
 * Import Router.
 */
const Router = require("./src/config/router")
Router(app)

/**
 * Start Express server.
 */
app.listen(PORT, () => {
  logger.info(`App is running at http://localhost:${PORT} :: ${CURRENT_DATE}`)
})

module.exports = app

