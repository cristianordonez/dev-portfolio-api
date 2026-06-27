import 'dotenv/config'
import request from 'supertest'
import { pool } from '../src/api/db'
import app from '../src/app'

describe('GET /api/v1/repos', () => {
    it('responds with 400 status code when no query userId is provided', async () => {
        await request(app).get('/api/v1/repos').expect(400)
    })

    it('responds with 200 status code when querying for repos', async () => {
        await request(app)
            .get('/api/v1/repos?userId=MDQ6VXNlcjcxODg4Njc1')
            .expect(200)
    })

    afterAll(() => {
        pool.end()
    })
})
