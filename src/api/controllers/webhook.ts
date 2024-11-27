import express, { NextFunction, Request, Response } from 'express'
import IMessageResponse from '../../interfaces/IMessageResponse'
import IWebhookBody from '../../interfaces/IWebhookBody'
import { verifyPayload } from '../../middlewares'
import RepoModel from '../models/repoModel'
import GitService from '../services/gitService'

const router = express.Router()

/**
 * POST /webhook
 */
router.post(
    '/',
    verifyPayload,
    async (
        req: Request<{}, {}, IWebhookBody>,
        res: Response<IMessageResponse>,
        next: NextFunction
    ) => {
        try {
            const model = new RepoModel()
            const body: IWebhookBody = req.body
            const gitService = new GitService()
            const repoData = await gitService.getGraphQLData(
                body.repository.owner.login,
                body.repository.name
            )
            await model.createOrUpdate(repoData)
            res.status(201).send({ message: 'Database update complete' })
        } catch (err) {
            next(err)
        }
    }
)

export default router
