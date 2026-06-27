import request from 'supertest'
import { pool } from '../src/api/db'
import app from '../src/app'

describe('GET /error', () => {
    it('should handle 404 errors', async () => {
        const response = await request(app).get('/what-is-this-even')
        expect(response.status).toBe(404)
    })
    it('responds with a json message', async () => {
        await request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
            })
    })
    it('should handle 500 errors', async () => {
        const response = await request(app).get('/error')
        expect(response.status).toBe(500)
    })

    afterAll(() => {
        pool.end()
    })
})
