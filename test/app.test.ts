import request from 'supertest'

import app from '../src/app'

describe('app', () => {
    it('responds with a not found message', (done) => {
        request(app)
            .get('/what-is-this-even')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done)
    })
})

describe('GET /', () => {
    it('responds with a json message', (done) => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(
                200,
                {
                    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
                },
                done
            )
    })
})

describe('GET /error', () => {
    it('should handle 500 errors', async () => {
        const response = await request(app).get('/error')
        expect(response.status).toBe(500)
    })
})
