const sinon = require('sinon')
const { expect } = require('chai')
const request = require('supertest')
const assert = require('assert')
const app = require('../index.js')
const Location = require('./../src/models/Location')

const mockData = {
	city: 'Dusseldorf',
	start_date: '9/16/2012',
	end_date: '8/19/2013',
	price: '17.40',
	color: '#819a11'
}

describe('Location', () => {

	describe('Location routes', () => {
		it('should return 200 OK', (done) => {
			request(app)
				.get('/locations')
				.expect(200, done)
		})
	})

	describe('Location models', () => {

	    it('should fail to create new location if city is not provided', done => {
	        const location = new Location()
	 
	        location.validate(err => {
	            expect(err.errors.city).to.exist
	            done()
	        })
	    })

		it('should create new location if city is provided', done => {
     		const location = new Location(mockData)
	      	location.save()
		      .then(()=>{
		      assert(!location.isNew)
		      done()
       		})
       	})

		it('should return all locations', async () => {
			const res = await request(app).get("/locations")
			assert(res.body.docs.length > 0)
       	})

  	})

})


