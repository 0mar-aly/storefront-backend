import db from '../database'

export type Order = {
    id?: number
    order_status: string
    user_id: number
}

export type OrderProducts = {
    id?: number
    quantity: number
    order_id: number
    product_id: number
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }
    async show(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await db.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async getOrderByUser(o: Order): Promise<Order[]> {
        try {
            const sql =
                'SELECT * FROM orders WHERE order_status = ($1) AND user_id = ($2)'
            const conn = await db.connect()
            const result = await conn.query(sql, [o.order_status, o.user_id])
            conn.release
            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders by user ID ${o.user_id}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (id, order_status, user_id) VALUES ($1, $2, $3) RETURNING *'
            const conn = await db.connect()
            const result = await conn.query(sql, [
                o.id,
                o.order_status,
                o.user_id
            ])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
            const conn = await db.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async addProduct(op: OrderProducts): Promise<OrderProducts> {
        try {
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *'
            const conn = await db.connect()
            const result = await conn.query(sql, [
                op.quantity,
                op.order_id,
                op.product_id
            ])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add products to order. Error: ${err}`)
        }
    }
}
