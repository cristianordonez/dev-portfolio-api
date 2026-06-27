import express, { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import IMessageResponse from '../../interfaces/IMessageResponse'
import { validateBody, verifyPayload } from '../../middlewares'
import RepoModel from '../models/repoModel'
import GitService from '../services/gitService'

const router = express.Router()

const repoSchema = z.object({
    repository: z.object({
        description: z.string().nullable(),
        id: z.number(),
        url: z.string(),
        html_url: z.string(),
        node_id: z.string(),
        name: z.string(),
        full_name: z.string(),
        private: z.boolean(),
        owner: z.object({
            login: z.string(),
            id: z.number(),
            node_id: z.string(),
            avatar_url: z.string(),
            gravatar_id: z.string(),
            url: z.string(),
            html_url: z.string(),
            followers_url: z.string(),
            following_url: z.string(),
            gists_url: z.string(),
            starred_url: z.string(),
            subscriptions_url: z.string(),
            organizations_url: z.string(),
            repos_url: z.string(),
            events_url: z.string(),
            received_events_url: z.string(),
            type: z.string(),
            user_view_type: z.string(),
            site_admin: z.boolean()
        })
    })
})

/**
 * POST /webhook
 */
router.post(
    '/',
    verifyPayload,
    validateBody(repoSchema),
    async (
        req: Request,
        res: Response<IMessageResponse>,
        next: NextFunction
    ) => {
        try {
            const model = new RepoModel()
            const gitService = new GitService()
            const repoData = await gitService.getGraphQLData(
                req.body.repository.owner.login,
                req.body.repository.name
            )
            await model.createOrUpdate(repoData)
            res.status(201).json({ message: 'Database update complete' })
        } catch (err) {
            next(err)
        }
    }
)

export default router
