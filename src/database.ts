// @ts-ignore
import dotenv from 'dotenv'
import { Pool, PoolConfig } from 'pg'

dotenv.config()

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
    POSTGRES_HOST,
    POSTGRES_TEST_DATABASE,
    ENV
} = process.env

let db: Pool

if (ENV === 'dev') {
    db = new Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DATABASE,
        host: POSTGRES_HOST
    })
}

if (ENV === 'test') {
    db = new Pool({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DATABASE,
        host: POSTGRES_HOST
    })
}

// @ts-ignore
export default db
