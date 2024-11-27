import { Router } from 'express'

import MessageResponse from '../interfaces/IMessageResponse'
import repos from './controllers/repos'
import webhook from './controllers/webhook'

const router = Router()

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏'
    })
})

router.use('/webhook', webhook)
router.use('/repos', repos)

export default router
