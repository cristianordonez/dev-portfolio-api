import { Router } from 'express'

import MessageResponse from '../interfaces/MessageResponse'
import emojis from './emojis'

const router = Router()

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏'
    })
})

router.use('/emojis', emojis)

export default router
