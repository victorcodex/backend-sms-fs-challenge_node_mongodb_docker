const sinon = require('sinon')
require('sinon-mongoose')
const { expect } = require('chai')
const request = require('supertest')
const assert = require('assert')
const app = require('../index.js')
const { LOCATION_MOCK_DATA : mockData } = require('./../src/config/constants')
const Location = require('./../src/models/Location')

/**
 * Location module tests
 */
describe('Location Module Unit Test', () => {

	// Routes
	describe('Location Routes', () => {
		it('/locations should return 200 OK', (done) => {
			request(app)
				.get('/locations')
				.expect(200, done)
		})
	})

	// Models
	describe('Location Models', () => {

		// Create new location
		describe("Create new location", () => {

			it('should fail to create new location if city is not provided - Validation', done => {
				const location = new Location()
				location.validate(err => {
					expect(err.errors.city).to.exist
					done()
				})
			})

			it("should create new location", done => {
				const LocationMock = sinon.mock(new Location(mockData))
				const location = LocationMock.object
				const expectedResult = { 
					status: true 
				}
				LocationMock.expects('save').yields(null, expectedResult)
				location.save( (err, result) => {
					LocationMock.verify()
					LocationMock.restore()
					expect(result.status).to.be.true
					done()
				})
			})

			it("should return error, if location is not saved", done => {
				const LocationMock = sinon.mock(new Location(mockData))
				const location = LocationMock.object
				const expectedResult = { status: false }
				LocationMock.expects('save').yields(expectedResult, null)
				location.save((err, result) => {
					LocationMock.verify()
					LocationMock.restore()
					expect(err.status).to.not.be.true
					done()
				})
			})

		})

		// Fetch locations
		describe("Fetch all locations", () => {

			it('should find location by city', done => {
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

			it('should fail to get location if city is not provided - Validation', done => {
				const location = new Location()
				location.validate(err => {
					expect(err.errors.city).to.exist
					done()
				})
			})

			it("should pass if we get all locations", done => {
				const LocationMock = sinon.mock(Location)
				const expectedResult = {
					status: true, 
					location: []
					}
				LocationMock.expects('find').yields(null, expectedResult)
				Location.find((err, result) => {
					LocationMock.verify()
					LocationMock.restore()
					expect(result.status).to.be.true
					done()
				})
			})

			it("should pass if we fail to get a location(s)", done => {
				const LocationMock = sinon.mock(Location)
				const expectedResult = {
					status: false, 
					error: "Oops, Something went wrong"
					}
				LocationMock.expects('find').yields(expectedResult, null)
				Location.find((err, result) => {
					LocationMock.verify()
					LocationMock.restore()
					expect(err.status).to.not.be.true
					done()
				})
			})

		})

		// Update location
		describe("Update existing location by _id", () => {

			it("should updated a location by _id", done => {
			  const LocationMock = sinon.mock(new Location(mockData))
			  const location = LocationMock.object
			  const expectedResult = { 
				  status: true 
			  }
			  LocationMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult)
			  location.save((err, result) => {
				LocationMock.verify()
				LocationMock.restore()
				expect(result.status).to.be.true
				done()
			  })
			})
			
			it("should return error if update action is failed", done => {
			  const LocationMock = sinon.mock(new Location(mockData))
			  const location = LocationMock.object
			  const expectedResult = { 
				  status: false 
			  }
			  LocationMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null)
			  location.save((err, result) => {
				LocationMock.verify()
				LocationMock.restore()
				expect(err.status).to.not.be.true
				done()
			  })
			})

		})

		// Delete location
		describe("Delete location by _id", () => {

			it("should delete a location by _id", done => {
				var LocationMock = sinon.mock(Location)
				var expectedResult = { status: true }
				LocationMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult)
				Location.remove({_id: 12345}, (err, result) => {
					LocationMock.verify()
					LocationMock.restore()
					expect(result.status).to.be.true
					done()
				})
			})

			it("should return error if delete action is failed", done => {
				var LocationMock = sinon.mock(Location)
				var expectedResult = { status: false }
				LocationMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null)
				Location.remove({_id: 12345}, (err, result) => {
					LocationMock.verify()
					LocationMock.restore()
					expect(err.status).to.not.be.true
					done()
				})
			})

		})


		// describe('Location model', () => {

		// 	it('should find location by city', (done) => {
		// 		const LocationMock = sinon.mock(Location)
		// 		const expectedLocation = {
		// 		_id: '5700a128bd97c1341d8fb365',
		// 		city: mockData.city,
		// 		}

		// 		LocationMock
		// 		.expects('findOne')
		// 		.withArgs({ city: mockData.city })
		// 		.yields(null, expectedLocation)

		// 		Location.findOne({ city: mockData.city }, (err, result) => {
		// 		LocationMock.verify()
		// 		LocationMock.restore()
		// 		expect(result.city).to.equal(mockData.city)
		// 		done()
		// 		})
		// 	})

		// 	it('should remove location by city', done => {
		// 		const LocationMock = sinon.mock(Location)
		// 		const expectedResult = {
		// 		nRemoved: 1,
		// 		}

		// 		LocationMock
		// 		.expects('remove')
		// 		.withArgs({ city: mockData.city })
		// 		.yields(null, expectedResult)

		// 		Location.remove({ city: mockData.city }, (err, result) => {
		// 		LocationMock.verify()
		// 		LocationMock.restore()
		// 		expect(err).to.be.null
		// 		expect(result.nRemoved).to.equal(1)
		// 		done()
		// 		})
		// 	})

		// })

	})

})


