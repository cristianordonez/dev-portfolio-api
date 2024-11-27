import 'dotenv/config'
import pg from 'pg'

const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database = process.env.POSTGRES_DATABASE
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

export const query = async (text: string, params?: string[]) => {
    const res = await pool.query(text, params)
    return res
}
