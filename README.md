# Storefront Backend Project

## Overview
This application is a backend for an online store. It includes a database built with PostgreSQL and a RESTful API built with Node.js.  

## Dependencies
These are the following dependecies required for the application to run:
- *Node.js* for the application.
- *Express* for the server.
- *PostgreSQL* for the DBMS.
- *db-migrate* for managing database migrations.
- *dotenv* for managing the environment variables.
- *bcrypt* for hashing passwords.
- *JWT* for creating and verifying JSON web tokens for authentication.
- *Jasmine* and *Supertest* for application testing.
- *cross-env* for selecting the environment in the test script (This is only required if the project is running in a Windows environment)
- *TypeScript* and the types for all the mentioned packages above are required to compile the project.  

**NOTE**: Note that *Jasmine*, *Postgres*, and *db-migrate* were installed globally. This is required for the scripts in the ```package.json``` file to run. 
  
## Installation and Setup
Run ```npm install``` to install all dependencies referenced in the ```package.json``` file.

### 1. Database Setup
This project was created with two databases: One for the development environment, and another for testing. Their details are stored in the ```database.json``` file, and are:
```
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "dbdb",
    "user": "myuser",
    "password": "password"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "dbdb_test",
    "user": "myuser",
    "password": "password"
  }
}
```  
**NOTE** The port is not specified as PostgreSQL defaults to port ```5432```    
To start the database locally, make sure PostgreSQL is installed, and run ```psql postgres```. Create 2 **databases** and a **user** with the details above for each environment. Please note that most of the values listed above are placeholders.  
Make sure to grant the required privileges to the created user on the database. Example:
```SQL
GRANT ALL PRIVILEGES ON DATABASE dbdb_test TO USER myuser;
```

  
### 2. Environment Variables
The following environment variables are to be created and stored in a ```.env``` file in the root directory of the project:
```
POSTGRES_USER=myuser
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=dbdb
POSTGRES_TEST_DATABASE=dbdb_test
POSTGRES_HOST=127.0.0.1
ENV=dev
BCRYPT_PASSWORD=YOUR_BCRYPT_PASSWORD
SALT_ROUNDS=12
TOKEN_SECRET=YOUR_TOKEN_SECRET
```
These are placeholder values that can be changed together with the values in ```database.json``` for security. Note that the .env file was NOT included with the project files for security reasons.  
  
### 3. Running tests
The test scripts are found in the ```package.json``` file. They require global installation of *Jasmine*, *PostgreSQL*, *db-migrate*, and *cross-env* to work.  
**NOTE**: The following scripts run on the test database:
- Run ```npm run build``` to transpile to JavaScript (The .js files will be output to ```./dist``` by default).
- Run ```npm run umigrate``` to run the database up migrations to create the tables.
- Run ```npm run dmigrate``` to run the down migrations clearing all tables.
- Run ```npm run test``` to transpile, clear the test database, create new test tables, and run Jasmine tests, all in one go.
- Alternatively, you can run ```npm run test2``` to run all of the above without using ```cross-env```.  
The project runs on ```0.0.0.0:3000``` by default.  
  

### 4. Endpoints  
The API endpoints can be found in the ```REQUIREMENTS.md``` file found in the source folder.  
  
### 5. Starting the app  
To start, run ```npm run start``` which will build the app and start the server on ```0.0.0.0:3000``` .