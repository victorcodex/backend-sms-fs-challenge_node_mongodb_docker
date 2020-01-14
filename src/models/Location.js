const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema
const { CURRENT_DATE, LOCATION_STATUS_ENUM, LOCATION_MODEL_SEED_DATA } = require('./../config/constants')
const { logger } = require('./../config/config')

/**
 * Location Schema.
 */
const LocationSchema = new Schema({
    id: {
    	type: Number
    },
    city: {
    	type: String,
        required: 'Kindly provide a city'
    },
    start_date: {
    	type: String
    },
    end_date: {
    	type: String
    },
    price: {
    	type: String
    },
    statuss: {
    	type: String,
    	enum : LOCATION_STATUS_ENUM,
        default: 'Daily'
    },
    color: {
    	type: String
    }
},{ 
  timestamps: { createdAt: true, updatedAt: true }
})

/**
 * Seed location data to MongoDB.
 * When this method is called, it will reset the DB collection with the Seed data (data.json)
 */
LocationSchema.statics.seedLocationModel = Location => {
    Location.deleteMany({}, err => {
        if (err) return logger.error(`${err} :: ${CURRENT_DATE}`)
        LOCATION_MODEL_SEED_DATA.forEach(location => {
            Location.create(location)
        })
    })
    // logger.info(`Completed seeding locations collection :: ${CURRENT_DATE}`)
}

LocationSchema.plugin(mongoosePaginate)

const Location = mongoose.model('Location', LocationSchema)

module.exports = Location