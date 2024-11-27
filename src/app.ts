import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import api from './api'
import MessageResponse from './interfaces/IMessageResponse'
import * as middlewares from './middlewares'

require('dotenv').config()

const app = express()

const env = process.env.ENV || 'prod'
app.use(morgan(env))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
    })
})

app.get<{}, MessageResponse>('/error', () => {
    throw new Error('Internal server error')
})

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
