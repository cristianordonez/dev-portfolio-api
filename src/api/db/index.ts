import 'dotenv/config'
import pg from 'pg'

const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database =
    process.env.ENV == 'test'
        ? process.env.TEST_POSTGRES_DATABASE
        : process.env.POSTGRES_DATABASE
const host = process.env.POSTGRES_HOST
const port = parseInt(process.env.POSTGRES_PORT || '', 5423)

const { Pool } = pg

const pool = new Pool({
    user: username,
    password: password,
    host: host,
    port: port,
    database: database
})

const createDefaultPool = () => {
    const defaultPool = new Pool({
        user: username,
        password: password,
        host: host,
        port: port,
        database: 'postgres'
    })
    return defaultPool
}

const validatePool = async () => {
    try {
        const defaultPool = createDefaultPool()
        const result = await defaultPool.query(
            'Select 1 from pg_database where datname = $1',
            [database]
        )
        if (result.rows.length === 0) {
            throw new Error('Database does not exist.')
        }
        await defaultPool.end()
    } catch (err) {
        console.error(err)
        throw err
    }
}

const query = async (text: string, params?: string[]) => {
    const res = await pool.query(text, params)
    return res
}

export { createDefaultPool, pool, query, validatePool }
