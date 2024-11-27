import crypto from 'crypto'
import 'dotenv/config'
import request from 'supertest'
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
})

describe('POST /api/v1/webhook', () => {
    it('responds with 403 status code when no secret provided', async () => {
        await request(app)
            .post('/api/v1/webhook')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
    })
})

describe('POST /api/v1/webhook', () => {
    it('responds with 200 status code when correct secret provided', async () => {
        const payload = { some: 'data' }
        const payloadString = JSON.stringify(payload)
        const secret = `${process.env.WEBHOOK_SECRET}`
        const signature = crypto
            .createHmac('sha256', secret)
            .update(payloadString)
            .digest('hex')
        await request(app)
            .post('/api/v1/webhook')
            .send(payload)
            .set('X-Hub-Signature-256', `sha256=${signature}`)
            .expect(200, 'Request body was signed')
    })
})
