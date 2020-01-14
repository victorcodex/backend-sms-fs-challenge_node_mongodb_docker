const { expect } = require('chai')
const request = require('supertest')
const app = require('./../../index')

describe('App', () => {
	it('should return 200 OK', (done) => {
		request(app)
			.get('/')
			.expect(200, done)
	})
	
	it('should return 404', (done) => {
		request(app)
			.get('/random-url')
			.expect(404, done)
	})
})