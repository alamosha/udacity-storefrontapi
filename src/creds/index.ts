import dotenv from 'dotenv'

dotenv.config()

const {PORT, NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASS, POSTGRES_DB, POSTGRES_DB_TEST} = process.env

export default {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    user: POSTGRES_USER,
    pass: POSTGRES_PASS,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
}