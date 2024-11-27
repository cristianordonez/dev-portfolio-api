import { Router } from 'express'

import MessageResponse from '../interfaces/IMessageResponse'
import webhook from './controllers/webhook'

const router = Router()

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏'
    })
})

router.use('/webhook', webhook)

export default router
