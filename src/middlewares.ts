import { NextFunction, Request, Response } from 'express'

import IErrorResponse from './interfaces/IErrorResponse'

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404)
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
    next(error)
}

export function errorHandler(
    err: Error,
    _: Request,
    res: Response<IErrorResponse>
) {
    console.error(err)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message || 'Internal Server Error',
        stack: process.env.ENV === 'production' ? '🥞' : err.stack
    })
}
