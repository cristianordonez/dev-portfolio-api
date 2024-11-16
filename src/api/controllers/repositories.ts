import express from 'express'

const router = express.Router()

type EmojiResponse = string[]

router.get<{}, EmojiResponse>('/', async (req, res) => {
    res.json(['😀', '😳', '🙄'])
})

export default router
