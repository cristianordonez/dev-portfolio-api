import express, { NextFunction, Request, Response } from 'express'
import IDeleteRepoQuery from '../../interfaces/IDeleteRepoQuery'
import IGetRepoQuery from '../../interfaces/IGetRepoQuery'
import IMessageResponse from '../../interfaces/IMessageResponse'
import IRepoResponse from '../../interfaces/IRepoResponse'
import { verifyPayload } from '../../middlewares'
import RepoModel from '../models/repoModel'

const router = express.Router()

/**
 * GET /repos?userId=
 */
router.get(
    '/',
    async (
        req: Request<{}, {}, {}, IGetRepoQuery>,
        res: Response<IRepoResponse>,
        next: NextFunction
    ) => {
        try {
            const repoModel = new RepoModel()
            const userId = req.query.userId
            if (!userId) {
                return res.status(400).send({
                    message: 'userId is required in query parameters',
                    data: []
                })
            }
            const repos = await repoModel.get(String(userId))
            res.status(200).send({
                message: 'Successfully retrieved repositories',
                data: repos
            })
        } catch (err) {
            next(err)
        }
    }
)

/**
 * DELETE /repos
 */
router.delete(
    '/',
    verifyPayload,
    async (
        req: Request<{}, {}, {}, IDeleteRepoQuery>,
        res: Response<IMessageResponse>,
        next: NextFunction
    ) => {
        try {
            const model = new RepoModel()
            const repoId = req.query.repoId
            if (!repoId) {
                return res.status(400).send({
                    message: 'userId is required in query parameters'
                })
            }
            await model.delete(repoId)
            res.status(200).send({ message: 'DELETE successful.' })
        } catch (err) {
            next(err)
        }
    }
)
export default router
