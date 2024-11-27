import request from 'supertest'

import app from '../src/app'

describe('app', () => {
    it('responds with a not found message', async () => {
        await request(app)
            .get('/what-is-this-even')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
    })
})

describe('GET /', () => {
    it('responds with a json message', async () => {
        await request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
            })
    })
})

describe('GET /error', () => {
    it('should handle 500 errors', async () => {
        const response = await request(app).get('/error')
        expect(response.status).toBe(500)
    })
})
