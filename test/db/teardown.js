require('dotenv/config')

const { createDefaultPool } = require('../../src/api/db')
const database = process.env.TEST_POSTGRES_DATABASE

const dropDatabase = async () => {
    try {
        const defaultPool = createDefaultPool()
        await defaultPool.query(`DROP DATABASE ${database}`)
        await defaultPool.end()
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = async () => {
    try {
        await dropDatabase()
    } catch (err) {
        console.error(err)
    }
}
