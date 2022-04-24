import app from '../../server'
import supertest from 'supertest'
import { User } from '../../models/users'

const request = supertest
var jwToken: string

describe('Testing the users handler', () => {
    const testUser: User = {
        first_name: 'Jason',
        last_name: 'Webb-Tolkien',
        username: 'jasontolkien',
        password: 'testingjwt123'
    }
    it('create endpoint should respond with 200 and return a token', async () => {
        const res = await request(app).post('/users').send(testUser)
        expect(res.status).toEqual(200)
        jwToken = await res.body
    })
    it('index endpoint should respond with 200 if given a correct token, returning registered users', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', ` Bearer ${jwToken}`)
        expect(res.status).toEqual(200)
        // Expecting the body to contain 1 user object or more
        expect(res.body.length).toBeGreaterThanOrEqual(1)
    })

    it('show endpoint should respond with 200 if given a correct token, returning the specified user given the id', async () => {
        const res = await request(app)
            // the user 'testUser' created above has the user id 3 (following the model tests)
            .get('/users/3')
            .set('Authorization', ` Bearer ${jwToken}`)
        expect(res.status).toEqual(200)
        expect(res.body).toEqual({
            first_name: 'Jason',
            last_name: 'Webb-Tolkien',
            username: 'jasontolkien'
        })
    })

    it('authenticate endpoint should respond with 200 and return a token given a valid username and password', async () => {
        // The default JWT header used to sign a token. from https://jwt.io
        const defualtHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        const res = await request(app).post('/users/login').send(testUser)
        expect(res.status).toEqual(200)
        // Any JWT encoded with HS256 algorithm should have the same header
        expect(res.body).toContain(defualtHeader)
    })
})
