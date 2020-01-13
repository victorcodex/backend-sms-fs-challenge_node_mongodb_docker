const sinon = require('sinon')
require('sinon-mongoose')
const { expect } = require('chai')
const request = require('supertest')
const app = require('../index.js')
const { LOCATION_MOCK_DATA : mockData } = require('./../src/config/constants')
const Location = require('./../src/models/Location')


/**
 * Location module tests
 */
describe('Location Module Unit Test', () => {

	// Routes
	describe('Location Routes', () => {

		it('POST /location/create should return 200 OK', done => {
			request(app)
				.post('/location/create')
				.send(mockData)
				.set('Accept', 'application/json')
				.expect('Content-Type','text/html; charset=utf-8')
				.expect(200)
				.end( (err, res) => { 
					if (err) return done(err)
                	done()
				})
		})

		it('GET /locations should return 200 OK', done => {
			request(app)
				.get('/locations')
				.expect(200, done)
		})

		it('GET /location/:id should return 200 OK', done => {
			request(app)
				.get('/location/5700a128bd97c1341d8fb365')
				.expect(200, done)
		})

		// it('PUT /location/:id should return 200 OK', done => {
		// 	request(app)
		// 		.put('/location/5e1b63b78a7195001bce5db6')
		// 		.send(mockData)
		// 		.set('Accept', 'application/json')
		// 		.expect('Content-Type', /json/)
		// 		.expect(200)
		// 		.end( (err, res) => {
		// 			console.log("Hello world PUT ", res.body) 
		// 			if (err) return done(err)
        //         	done()
		// 		})
		// })

		it('DELETE /location/:id should return 200 OK', done => {
			request(app)
				.delete('/location/5700a128bd97c1341d8fb365')
				.send(mockData)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end( (err, res) => { 
					if (err) return done(err)
                	done()
				})
		})

	})

	// Models
	describe('Location Models', () => {

		// Create new location
		describe("Create location", () => {

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
		describe("Fetch locations", () => {

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

			it('should update a location by _id', done => {
      
				var LocationMock = sinon.mock(new Location(mockData))
				var location = LocationMock.object
				const expectedLocation = {
					_id: '5700a128bd97c1341d8fb365'
				}
				LocationMock.expects('save').withArgs(expectedLocation).yields(null, location)
				location.save(expectedLocation, (err, result) => {
				  LocationMock.verify()
				  LocationMock.restore()
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

	})

})


