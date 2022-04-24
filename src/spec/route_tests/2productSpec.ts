import app from '../../server'
import supertest from 'supertest'
import { User } from '../../models/users'

const request = supertest
var jwToken: string

describe('Testing product handler', () => {
    const testUser: User = {
        first_name: 'Product',
        last_name: 'Tester',
        username: 'producttester',
        password: 'testingproducts123'
    }

    // Creating a user to get a new token
    beforeAll(async () => {
        const res = await request(app).post('/users').send(testUser)
        jwToken = await res.body
    })

    it('create endpoint should respond with 200 and return a product when given a valid token', async () => {
        const res = await request(app)
            .post('/products')
            .send({ id: 3, name: 'Pizza', price: 150 })
            .set('Authorization', ` Bearer ${jwToken}`)
        expect(res.status).toEqual(200)
        expect(res.body).toEqual({ id: 3, name: 'Pizza', price: 150 })
    })

    it('index endpoint should respond with 200 and return products', async () => {
        const res = await request(app).get('/products')
        expect(res.status).toEqual(200)
        // Expecting the body to contain 1 product object or more
        expect(res.body.length).toBeGreaterThanOrEqual(1)
    })

    it('show endpoint should respond with 200 and return the specified product given the product name', async () => {
        const res = await request(app).get('/products/Pizza')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual({ id: 3, name: 'Pizza', price: 150 })
    })
})
