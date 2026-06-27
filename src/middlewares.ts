import crypto from 'crypto'
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
const secret = process.env.WEBHOOK_SECRET || ''
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'

import IErrorResponse from './interfaces/IErrorResponse'

/**
 * Handles 404 exceptions
 * @param req express Request object
 * @param res express Response object
 * @param next express Next object
 */
export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404)
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
    next(error)
}

/**
 * Handles requests that result in exception
 * @param err custom Error
 * @param _ void
 * @param res express Response
 */
export function errorHandler(
    err: Error,
    _: Request,
    res: Response<IErrorResponse>
) {
    console.error(err)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.setHeader('Content-Type', 'application/json')
    res.status(statusCode)
    res.json({
        message: err.message || 'Internal Server Error',
        stack: process.env.ENV === 'production' ? '🥞' : err.stack
    })
}

/**
 * Validates payload key for webhooks
 * @param req express Request object
 * @param res express Response object
 * @param next express Next object
 * @returns next request
 */
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

/**
 * Validates request.body schema
 * @param schema zod object schema
 * @returns next request in call stack
 */
export const validateBody =
    (schema: z.ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body)
            next()
        } catch (err: any) {
            res.status(400).json({ error: err.errors })
        }
    }
