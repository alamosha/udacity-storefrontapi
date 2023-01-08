import { Pool } from "pg";
import creds from "../creds";

const pool = new Pool({
    host: creds.host,
    port: parseInt(creds.dbPort as string),
    database: creds.database,
    user: creds.user,
    password: creds.pass,
    max: 4
})

export default pool;