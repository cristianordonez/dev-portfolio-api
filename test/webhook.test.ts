import crypto from 'crypto'
import 'dotenv/config'
import request from 'supertest'
import { pool } from '../src/api/db'
import app from '../src/app'

describe('POST /api/v1/webhook', () => {
    it('responds with 403 status code when no secret provided', async () => {
        const response = await request(app).post('/api/v1/webhook')
        expect(response.statusCode).toBe(403)
    })

    it('responds with 400 status code when incorrect payload provided', async () => {
        const payload = { some: 'data' }
        const payloadString = JSON.stringify(payload)
        const secret = `${process.env.WEBHOOK_SECRET}`
        const signature = crypto
            .createHmac('sha256', secret)
            .update(payloadString)
            .digest('hex')
        const response = await request(app)
            .post('/api/v1/webhook')
            .send(payload)
            .set('X-Hub-Signature-256', `sha256=${signature}`)
        expect(response.statusCode).toBe(400)
    })

    it('responds with 200 status code when correct secret and payload provided', async () => {
        const payload = {
            repository: {
                description: '',
                id: 33,
                url: 'test',
                html_url: 'test',
                node_id: 'test',
                name: 'dev-portfolio',
                full_name: 'test',
                private: false,
                owner: {
                    login: 'cristianordonez',
                    id: 33,
                    node_id: 'test',
                    avatar_url: '',
                    gravatar_id: '',
                    url: 'test',
                    html_url: '',
                    followers_url: '',
                    following_url: '',
                    gists_url: '',
                    starred_url: '',
                    subscriptions_url: '',
                    organizations_url: '',
                    repos_url: '',
                    events_url: '',
                    received_events_url: '',
                    type: '',
                    user_view_type: '',
                    site_admin: false
                }
            }
        }
        const payloadString = JSON.stringify(payload)
        const secret = `${process.env.WEBHOOK_SECRET}`
        const signature = crypto
            .createHmac('sha256', secret)
            .update(payloadString)
            .digest('hex')
        const response = await request(app)
            .post('/api/v1/webhook')
            .send(payload)
            .set('X-Hub-Signature-256', `sha256=${signature}`)
        expect(response.statusCode).toBe(201)
    })

    afterAll(() => {
        pool.end()
    })
})
