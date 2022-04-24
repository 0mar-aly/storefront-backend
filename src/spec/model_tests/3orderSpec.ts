import { OrderStore } from '../../models/order'

const store = new OrderStore()

describe('Testing orders model', () => {
    beforeAll(async () => {
        await store.create({
            id: 1,
            order_status: 'complete',
            user_id: 2
        })
        await store.create({
            id: 2,
            order_status: 'active',
            user_id: 2
        })
        await store.create({
            id: 3,
            order_status: 'active',
            user_id: 1
        })

        await store.create({
            id: 4,
            order_status: 'active',
            user_id: 1
        })
    })
    it('create method should create and return an order', async () => {
        const result = await store.create({
            id: 5,
            order_status: 'active',
            user_id: 1
        })
        expect(result).toEqual({
            id: 5,
            order_status: 'active',
            user_id: 1
        })
    })

    it('show method should return a specific order given the order id', async () => {
        const result = await store.show(3)
        expect(result).toEqual({
            id: 3,
            order_status: 'active',
            user_id: 1
        })
    })

    it('delete method should delete an order and return the deleted order', async () => {
        const result = await store.delete(4)
        expect(result).toEqual({
            id: 4,
            order_status: 'active',
            user_id: 1
        })
    })

    it('index method should return all the orders', async () => {
        const result = await store.index()
        // index should return an array of 4 orders. 4 orders were created in the beforeAll statement, 1 order was deleted in the delete test above
        expect(result).toHaveSize(4)
    })

    it('getOrderByUser method should return the active orders made by a specific user', async () => {
        const result = await store.getOrderByUser({
            order_status: 'active',
            user_id: 2
        })
        expect(result).toEqual([
            {
                id: 2,
                order_status: 'active',
                user_id: 2
            }
        ])
    })

    it('addProduct should add a product to the order in the order_products table, returning all the products in the order', async () => {
        const result = await store.addProduct({
            quantity: 3,
            order_id: 5,
            product_id: 1
        })
        expect(result.quantity).toEqual(3)
        expect(result).toHaveSize(4)
    })
})
