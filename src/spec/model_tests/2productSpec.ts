import { ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Testing product model', () => {
    it('create method should create and return a product', async () => {
        const result = await store.create({ id: 1, name: 'Burger', price: 100 })
        expect(result).toEqual({ id: 1, name: 'Burger', price: 100 })
    })

    it('create method should create and return a product', async () => {
        const result = await store.create({ id: 2, name: 'Fries', price: 50 })
        expect(result).toEqual({ id: 2, name: 'Fries', price: 50 })
    })

    it('show method should return a specific product by name', async () => {
        const result = await store.show('Burger')
        expect(result).toEqual({
            id: 1,
            name: 'Burger',
            price: 100
        })
    })

    it('index method should return all created products', async () => {
        const result = await store.index()
        expect(result).toEqual([
            { id: 1, name: 'Burger', price: 100 },
            { id: 2, name: 'Fries', price: 50 }
        ])
    })
})
