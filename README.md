# udacity-storefrontapi

Udacity Nanodegree second project.

## Getting Started

This repo contains a storefront API created for a project, to get started please use `yarn` to install modules and dependencies

## setup and connect to the database

This repo uses Postgres SQL as a database engine. to be able to connect to a database please update your database parameters in .env file.

I provided .env.example file within this repo, please rename it to be .env and fill It with your database connection parameters.

By default, this application runs on port 3000, but It can be changed through .env file

## package installation instructions

### 1. rename .env file

There is a file called .env.example file, you have to rename It to be .env and than fill in all required data as following:

```bash

PORT=3000 ---> 'Default port for running the server, You can leave It to default.'
NODE_ENV=dev ---> 'Used to determine If working on dev or test database, You can leave It to default.'
POSTGRES_HOST= ---> 'Postgres SQL Hostname'
POSTGRES_PORT=5432 --- 'Postgres SQL Port, You can leave It to default.'
POSTGRES_USER= ---> 'Database Username'
POSTGRES_PASS= ---> 'Database password'
POSTGRES_DB= ---> 'Database Name (For development)'
POSTGRES_DB_TEST= ---> 'Database Name (For unit testing)'
BCRYPT_PASS= ---> 'bcrypt password'
SALT_ROUNDS=10 ---> 'Salt Rounds, You can leave It to default.'
TOKEN_SECRET=! ---> 'JWT Token secret'
```

### 2. run required commands

This application uses multiple modules to operate:

```bash
    bcrypt
    db-migrate
    dotenv
    express
    jsonwebtoken
    pg
    typescript
    jasmine
    jasmine-spec-reporter
    supertest

    ... and much more, with all their typescript types.
```

please install all dependencies using `yarn`

### 3. DB Creation and Migrations

All database schema has been created into sql files with db-migrations, you have to run migration in order to continue usind the application using this below command.

`db-migrate up`

## application operation

Here is how to operate and use the application:

`yarn start` to start your application in pre-build mode (run typescript files).
`yarn test` to build the application, than run all nessesary tests.
`yarn watch` used to run application in watch mode (It will rebuild application and run on every file change).
