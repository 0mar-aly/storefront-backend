import express from 'express'
import { Order, OrderStore } from '../models/order'
import verifyAuthToken from '../services/verifyAuthToken'

const store = new OrderStore()

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const order = await store.show(parseInt(req.params.id))
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const getOrderByUser = async (req: express.Request, res: express.Response) => {
    try {
        const orders = await store.getOrderByUser({
            order_status: req.body.order_status,
            user_id: parseInt(req.params.id)
        })
        res.json(orders)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const order = await store.create(req.body)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const remove = async (req: express.Request, res: express.Response) => {
    try {
        const delet = await store.delete(parseInt(req.params.id))
        res.json(delet)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: express.Request, res: express.Response) => {
    const order_id: number = parseInt(req.params.id)
    const product_id: number = parseInt(req.body.product_id)
    const quantity: number = parseInt(req.body.quantity)
    try {
        const product = await store.addProduct({
            quantity,
            order_id,
            product_id
        })
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id', verifyAuthToken, show)
    app.get('/orders/user/:id', verifyAuthToken, getOrderByUser)
    app.post('/orders', verifyAuthToken, create)
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
    app.delete('/deleteOrder/:id', verifyAuthToken, remove)
}

export default orderRoutes
