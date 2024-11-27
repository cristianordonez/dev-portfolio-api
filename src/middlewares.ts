import crypto from 'crypto'
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
const secret = process.env.WEBHOOK_SECRET || ''
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'

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

export function verifyPayload(
    req: Request,
    res: Response,
    next: NextFunction
): void {
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
