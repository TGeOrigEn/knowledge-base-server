import dotnev from 'dotenv';
import { Pool } from 'pg';

dotnev.config();

const PG_USER: string = process.env.PG_USER;
const PG_PASSWORD: string = process.env.PG_PASSWORD;

const PG_DATABASE: string = process.env.PG_DATABASE;
const PG_PORT: number = Number(process.env.PG_PORT);
const PG_HOST: string = process.env.PG_HOST;

const pool = new Pool({
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    port: PG_PORT,
    host: PG_HOST,
});

export default pool;