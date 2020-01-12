const { logger } = require('./../config/config')
const Location = require('./../models/Location')
const { CURRENT_DATE, PAGINATION_OPTIONS } = require('./../config/constants')

/**
 * POST /locations/create
 * Add location
 */
exports.create = (req, res, next) => {
	
	logger.info(req.body.status)
	res.send('Successfully added location')
// 	logger.info(`About to add location :: ${CURRENT_DATE}`)
// 	const newSingleLocation = Location({ city: 'Berlin' })
// 	newSingleLocation.save(function (err) {
// 		if (err) return logger.error(`${err} :: ${CURRENT_DATE}`)
// 		logger.info(`Successfully added location :: ${CURRENT_DATE}`)
// 		res.send('Successfully added location')
// 	});
}

/**
 * GET /locations
 * Get many locations
 */
exports.find = (req, res, next) => {
	// PAGINATION_OPTIONS.page = 1
	// PAGINATION_OPTIONS.limit = 10
	logger.info(`About to fetch locations :: ${CURRENT_DATE}`)
	Location.paginate({}, PAGINATION_OPTIONS, function (err, result) {
		if (err) return logger.error(`${err} :: ${CURRENT_DATE}`)
		logger.info(`Successfully fetched location :: ${CURRENT_DATE}`)
		res.send(result)
    });
}

/**
 * GET /locations/:id
 * Get one location
 */
exports.findOne = (req, res, next) => {
	res.send("Get one location")
}

/**
 * PUT /locations/:id/update
 * Update location
 */
exports.update = (req, res, next) => {
	res.send("Update location")
}

/**
 * DELETE /locations/:id/delete
 * Delete location
 */
exports.destroy = (req, res, next) => {
	res.send("Delete location")
}