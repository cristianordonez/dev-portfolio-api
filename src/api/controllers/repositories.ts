import express, { NextFunction, Request, Response } from 'express'
import RepoModel from '../models/repoModel'

const router = express.Router()

/**
 * todo
 */
router.get<{}, {}, {}>(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model = new RepoModel()
            await model.get()
            res.status(200).send('')
        } catch (err) {
            next(err)
        }
    }
)

/**
 * todo
 */
router.delete<{}, {}, {}>(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model = new RepoModel()
            await model.delete()
            res.status(200).send('')
        } catch (err) {
            next(err)
        }
    }
)
export default router
