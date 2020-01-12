const sinon = require('sinon')
require('sinon-mongoose')
const { expect } = require('chai')
const request = require('supertest')
const assert = require('assert')
const app = require('../index.js')
const Location = require('./../src/models/Location')
const { LOCATION_MOCK_DATA : mockData } = require('./../src/config/constants')

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
			const LocationMock = sinon.mock(new Location(mockData))
			const location = LocationMock.object
			LocationMock
			  .expects('save')
			  .yields(null)

			location.save((err) => {
			  LocationMock.verify()
			  LocationMock.restore()
			  expect(err).to.be.null
			  done()
			})
		})

		it('should return error if location is not created', done => {
			const LocationMock = sinon.mock(new Location(mockData))
			const location = LocationMock.object
			const expectedError = {
			  name: 'ValidationError',
			}

			LocationMock
			  .expects('save')
			  .yields(expectedError)

			location.save((err, result) => {
			  LocationMock.verify()
			  LocationMock.restore()
			  expect(err.name).to.equal('ValidationError')
			  expect(result).to.be.undefined
			  done()
			})
		})

		it('should find location by city', (done) => {
			const LocationMock = sinon.mock(Location)
			const expectedLocation = {
			  _id: '5700a128bd97c1341d8fb365',
			  city: mockData.city,
			}

			LocationMock
			  .expects('findOne')
			  .withArgs({ city: mockData.city })
			  .yields(null, expectedLocation)

			Location.findOne({ city: mockData.city }, (err, result) => {
			  LocationMock.verify()
			  LocationMock.restore()
			  expect(result.city).to.equal(mockData.city)
			  done()
			})
		})

		it('should remove location by city', done => {
			const LocationMock = sinon.mock(Location)
			const expectedResult = {
			  nRemoved: 1,
			}

			LocationMock
			  .expects('remove')
			  .withArgs({ city: mockData.city })
			  .yields(null, expectedResult)

			Location.remove({ city: mockData.city }, (err, result) => {
			  LocationMock.verify()
			  LocationMock.restore()
			  expect(err).to.be.null
			  expect(result.nRemoved).to.equal(1)
			  done()
			})
		})

  	})

})


