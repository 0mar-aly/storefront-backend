import express from 'express'
import { ProductStore, Product } from '../models/product'
import verifyAuthToken from '../services/verifyAuthToken'

const store = new ProductStore()

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const products = await store.index()
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const show = async (req: express.Request, res: express.Response) => {
    try {
        const product = await store.show(req.params.name)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const product = await store.create(req.body)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:name', show)
    app.post('/products', verifyAuthToken, create)
}

export default productRoutes
