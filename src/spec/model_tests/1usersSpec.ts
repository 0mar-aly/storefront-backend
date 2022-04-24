import { UserStore } from '../../models/users'
const store = new UserStore()

describe('Testing the users model', () => {
    it('create method should create a user and return a user object containing a hashed password', async () => {
        const result = await store.create({
            id: 1,
            first_name: 'John',
            last_name: 'Smith',
            username: 'johnsmith',
            password: 'testpassword123'
        })
        expect(result.username).toEqual('johnsmith')
        expect(result.password).not.toEqual('testpassword123')
    })

    it('authenticate method should return the user object if credentials are correct', async () => {
        const result = await store.authenticate({
            username: 'johnsmith',
            password: 'testpassword123'
        })
        // The user object created above has 5 key-value pairs
        expect(result).toHaveSize(5)
    })

    it('show method should return a specific username, first name, and last name given the id', async () => {
        const result = await store.show(1)
        expect(result).toEqual({
            first_name: 'John',
            last_name: 'Smith',
            username: 'johnsmith'
        })
    })

    it('index method should return all users details (id, first name, last name, and username)', async () => {
        // Creating one more user to test the index method
        await store.create({
            id: 2,
            first_name: 'Jane',
            last_name: 'Smith',
            username: 'janesmith',
            password: 'testpassword321'
        })
        const userArray = [
            {
                id: 1,
                first_name: 'John',
                last_name: 'Smith',
                username: 'johnsmith'
            },
            {
                id: 2,
                first_name: 'Jane',
                last_name: 'Smith',
                username: 'janesmith'
            }
        ]
        const result = await store.index()
        expect(result).toEqual(userArray)
    })
})
