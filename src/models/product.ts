import db from '../database'

export type Product = {
    id?: number
    name: string
    price: number
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }
    async show(name: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE name=($1)'
            const conn = await db.connect()

            const result = await conn.query(sql, [name])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${name}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (id, name, price) VALUES ($1, $2, $3) RETURNING *'
            const conn = await db.connect()
            const result = await conn.query(sql, [p.id, p.name, p.price])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(
                `Could not add new product ${p.name}. Error: ${err}`
            )
        }
    }
}
