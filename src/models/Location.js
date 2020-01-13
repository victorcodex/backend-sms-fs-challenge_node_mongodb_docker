const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema
const { LOCATION_STATUS_ENUM } = require('./../config/constants')

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

LocationSchema.plugin(mongoosePaginate)

const Location = mongoose.model('Location', LocationSchema)

module.exports = Location