import db from '../database'
import bcrypt from 'bcrypt'

export type User = {
    id?: number
    first_name: string
    last_name: string
    username: string
    password?: string
}

export type LoginUser = {
    username: string
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await db.connect()
            // password_digest column is not returned here, however, you may use the query 'SELECT * FROM users'
            const sql = 'SELECT id, first_name, last_name, username FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not show users. Error:${err}`)
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await db.connect()
            const sql =
                'SELECT first_name, last_name, username FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not show user ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            // Salt and pepper from environment variables
            const saltRounds = parseInt(
                process.env.SALT_ROUNDS as unknown as string
            )
            const pepper = process.env.BCRYPT_PASSWORD as unknown as string

            const conn = await db.connect()
            const sql =
                'INSERT INTO users (first_name, last_name, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *'
            const hash = bcrypt.hashSync(u.password + pepper, saltRounds)
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.username,
                hash
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not create user ${u.username}. Error:${err}`)
        }
    }

    async authenticate(u: LoginUser): Promise<User | null> {
        const pepper = process.env.BCRYPT_PASSWORD as unknown as string
        const conn = await db.connect()
        const sql = 'SELECT * FROM users WHERE username = ($1)'
        const result = await conn.query(sql, [u.username])
        conn.release()
        if (result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(u.password + pepper, user.password_digest)) {
                return user
            }
        }
        return null
    }
}
