import crypto from 'crypto'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import IMessageResponse from '../../interfaces/IMessageResponse'
import IWebhookBody from '../../interfaces/IWebhookBody'
import RepoModel from '../models/repoModel'
import GitService from '../services/gitService'

const router = express.Router()
const secret = process.env.WEBHOOK_SECRET || ''
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'

function verifyPayload(req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
        return next('Request body empty')
    }
    const data = JSON.stringify(req.body)
    const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
    const hmac = crypto.createHmac(sigHashAlg, secret)
    const digest = Buffer.from(
        `${sigHashAlg}=${hmac.update(data).digest('hex')}`,
        'utf8'
    )
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
        res.status(403)
        return next(
            `Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`
        )
    }
    return next()
}

router.post<{}, IMessageResponse, IWebhookBody>(
    '/',
    verifyPayload,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model = new RepoModel()
            const body: IWebhookBody = req.body
            const gitService = new GitService()
            const repoData = await gitService.getGraphQLData(
                body.repository.owner.login,
                body.repository.name
            )
            await model.createOrUpdate(repoData)
            res.status(201).send('Database update complete')
        } catch (err) {
            next(err)
        }
    }
)

export default router
