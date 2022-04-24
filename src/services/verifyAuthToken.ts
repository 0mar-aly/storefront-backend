import express from 'express'
var jwt = require('jsonwebtoken')
const secret = process.env.TOKEN_SECRET

const verifyAuthToken = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(' ')[1]
        jwt.verify(token, secret)
        next()
    } catch (err) {
        res.status(401)
    }
}

export default verifyAuthToken
