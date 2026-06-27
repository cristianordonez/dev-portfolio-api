require('dotenv/config')
const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')

const { createDefaultPool } = require('../../src/api/db')
const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database = process.env.TEST_POSTGRES_DATABASE
const host = process.env.POSTGRES_HOST
const port = parseInt(process.env.POSTGRES_PORT || '', 5423)

const executeSqlFile = async () => {
    try {
        const filePath = path.join(__dirname, 'create_db.sql')
        const sql = fs.readFileSync(filePath, 'utf-8')
        const pool = new Pool({
            user: username,
            password: password,
            host: host,
            port: port,
            database: database
        })
        await pool.query(sql)
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = async () => {
    try {
        const defaultPool = createDefaultPool()
        await defaultPool.query(`CREATE DATABASE ${database}`)
        await executeSqlFile()
    } catch (err) {
        console.error(err)
        throw err
    }
}
