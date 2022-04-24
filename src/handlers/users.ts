import express from 'express'
import { UserStore, User, LoginUser } from '../models/users'
import jsonwebtoken from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../services/verifyAuthToken'

// var is used here in accordance with the JWT documentation "https://jwt.io"
var jwt = jsonwebtoken
const store = new UserStore()

const create = async (req: express.Request, res: express.Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    }
    try {
        const newUser = await store.create(user)
        // Again, using var as per the JWT docs
        var token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as Secret
        )
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const user = await store.show(parseInt(req.params.id))
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: express.Request, res: express.Response) => {
    const user: LoginUser = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        const loginUser = await store.authenticate(user)
        var token = jwt.sign({ loginUser }, process.env.TOKEN_SECRET as Secret)
        res.json(token)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.post('/users', create)
    app.post('/users/login', authenticate)
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
}

export default userRoutes
