const { logger } = require('./../config/config')
const Location = require('./location.model')
const { CURRENT_DATE, PAGINATION_OPTIONS } = require('./../config/constants')
const { formatResponseSuccess, formatResponseAboutTo } = require('./../config/helpers')

/**
 * POST /location/create
 * Add location
 */
exports.create = (req, res, next) => {
	logger.info(`${formatResponseAboutTo('create', 'location')} :: ${CURRENT_DATE}`)
	const newSingleLocation = Location(req.body)
	newSingleLocation.save( err => {
		if (err) return logger.error(`${err} :: ${CURRENT_DATE}`)
			logger.info(`${formatResponseSuccess('created', 'location')}  :: ${CURRENT_DATE}`)
			res.send(`${formatResponseSuccess('created', 'location')}`)
	})
}

/**
 * GET /locations
 * Get many locations
 */
exports.find = (req, res, next) => {
	PAGINATION_OPTIONS.page = req.query.page || PAGINATION_OPTIONS.page
	PAGINATION_OPTIONS.limit = req.query.limit || PAGINATION_OPTIONS.limit
	logger.info(`${formatResponseAboutTo('fetch', 'locations')} :: ${CURRENT_DATE}`)
	Location.paginate({}, PAGINATION_OPTIONS, (err, result) => {
		if (err) return logger.error(`${err} :: ${CURRENT_DATE}`)
		logger.info(`${formatResponseSuccess('fetched', 'locations')}  :: ${CURRENT_DATE}`)
		res.send(result)
    })
}

/**
 * GET /location/:id
 * Get one location
 */
exports.findOne = (req, res, next) => {
	logger.info(`${formatResponseAboutTo('fetch', 'location')} :: ${CURRENT_DATE}`)
	Location.findById(req.params.id, (err, result) => {
		if (err) return logger.error(`${err} :: ${CURRENT_DATE}`)
		logger.info(`${formatResponseSuccess('fetched', 'location')}  :: ${CURRENT_DATE}`)
		res.send(result)
    })   
}

/**
 * PUT /location/:id
 * Update location
 */
exports.update = (req, res, next) => {
	logger.info(`${formatResponseAboutTo('update', 'location')} :: ${CURRENT_DATE}`)
    Location.findById({_id: req.params.id}, (err, result) => {
    	if(err) {
    		logger.error(`${err} :: ${CURRENT_DATE}`)
    		res.send(err)
    	}
        Object.assign(result, req.body).save((err, result) => {
            if(err) {
            	logger.error(`${err} :: ${CURRENT_DATE}`)
            	res.send(err)
        	}
			logger.info(`${formatResponseSuccess('updated', 'location')}  :: ${CURRENT_DATE}`)
            res.json({ message: formatResponseSuccess('updated', 'location'), result })
        })    
    })
}

/**
 * DELETE /location/:id
 * Delete location
 */
exports.destroy = (req, res, next) => {
	logger.info(`${formatResponseAboutTo('delete', 'location')} :: ${CURRENT_DATE}`)
	Location.deleteOne({_id : req.params.id}, (err, result) => {
		if (err) return logger.error(`${err} :: ${CURRENT_DATE}`)
		logger.info(`${formatResponseSuccess('deleted', 'location')}  :: ${CURRENT_DATE}`)
		res.json({ message: formatResponseSuccess('deleted', 'location'), result })
    })
}