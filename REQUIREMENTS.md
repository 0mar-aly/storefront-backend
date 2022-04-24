# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index ```/products``` **[GET]**
- Show ```/products/:name``` **[GET]**
- Create [token required] ```/products``` **[POST]**

#### Users
- Index [token required] ```/users``` **[GET]**
- Show [token required] ```/users/:id``` **[GET]**
- Create [token required] ```/users``` **[POST]**
- Authenticate ```/users/login``` **[POST]**

#### Orders
- Current Order by user (args: user id, order status - ```active``` or ```completed```)[token required] ```/orders/user/:id``` **[GET]**
- Index ```/orders``` **[GET]**
- Show ```/orders/:id``` **[GET]**
- Create ```/orders``` **[POST]**
- Delete ```/deleteOrder/:id``` **[DELETE]**
- Add Products to an existing order (args: order id, product id, quantity) ```/orders/:id/products``` *[POST]*

## Data Shapes
#### Product
```SQL
products (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, price INTEGER NOT NULL)
```
#### User
```SQL
users (id SERIAL PRIMARY KEY, first_name VARCHAR (32) NOT NULL, last_name VARCHAR (32) NOT NULL, username VARCHAR(32) NOT NULL, password_digest VARCHAR (255) NOT NULL)
```

#### Orders
```SQL
orders (id SERIAL PRIMARY KEY, order_status VARCHAR(64) NOT NULL, user_id INTEGER NOT NULL REFERENCES users(id))/*foreign key to users table*/
```
```SQL
order_products (id SERIAL PRIMARY KEY, quantity INTEGER NOT NULL , order_id INTEGER NOT NULL REFERENCES orders(id) /*foreign key to orders table*/, product_id INTEGER NOT NULL REFERENCES products(id))/*foreign key to products table*/;
```