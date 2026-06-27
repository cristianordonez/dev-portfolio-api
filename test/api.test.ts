import 'dotenv/config'
import request from 'supertest'
import { pool } from '../src/api/db'
import app from '../src/app'

describe('GET /api/v1', () => {
    it('responds with a json message', async () => {
        await request(app)
            .get('/api/v1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'API - 👋🌎🌍🌏'
            })
    })

    afterAll(() => {
        pool.end()
    })
})
