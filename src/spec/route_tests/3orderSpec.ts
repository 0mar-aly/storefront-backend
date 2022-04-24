import app from '../../server'
import supertest from 'supertest'
import { User } from '../../models/users'
import { Order } from '../../models/order'

const request = supertest
var jwToken: string

describe('Testing order handler', () => {
    const testUser: User = {
        first_name: 'Order',
        last_name: 'Tester',
        username: 'ordertester',
        password: 'testingorders123'
    }

    // Creating a user to get a new token
    beforeAll(async () => {
        const res = await request(app).post('/users').send(testUser)
        jwToken = await res.body
    })

    const testOrder: Order = { id: 6, order_status: 'active', user_id: 2 }

    it('create endpoint should respond with 200 and return the created order', async () => {
        const res = await request(app).post('/orders').send(testOrder)
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(testOrder)
    })

    it('show endpoint should respond with 200 and return a specific order given the order id', async () => {
        const res = await request(app).get('/orders/6')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(testOrder)
    })

    it('index endpoint should respond with 200 and return all orders', async () => {
        const res = await request(app).get('/orders')
        expect(res.status).toEqual(200)
        // Expecting the body to contain 1 order object or more
        expect(res.body.length).toBeGreaterThanOrEqual(1)
    })

    it('getOrderByUser endpoint should respond with 200 and return the active orders by the user given the user id', async () => {
        const res = await request(app)
            .get('/orders/user/2')
            .send({ order_status: 'active' })
            .set('Authorization', ` Bearer ${jwToken}`)
        expect(res.status).toEqual(200)
        expect(res.body).toContain(testOrder)
    })

    it('remove endpoint should respond with 200 and return the deleted order given the order id', async () => {
        const res = await request(app).delete('/deleteOrder/6')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(testOrder)
    })

    it('calling show on a deleted order should return an empty body', async()=>{
        const res = await request(app).get('/orders/6')
        expect(res.body).toEqual('')
    })

    it('addProduct endpoint should respond with 200 and return the added product', async()=>{
        const res = await request(app)
            .post('/orders/5/products')
            .send({ product_id: 3,  quantity: 2})
            expect(res.status).toEqual(200)
            // Expecting the added product object to have 4 key-value pairs, according to the DB schema
            expect(res.body).toHaveSize(4)
    })

})
