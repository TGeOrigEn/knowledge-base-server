import { Pool } from 'pg';

const PG_USER: string = process.env.PG_USER || 'postgres';
const PG_PASSWORD: string = process.env.PG_PASSWORD || 'root';

const PG_DATABASE: string = process.env.PG_DATABASE || 'postgres';
const PG_PORT: number = Number(process.env.PG_PORT) || 5432;
const PG_HOST: string = process.env.PG_HOST || 'localhost';

const pool = new Pool({
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    port: PG_PORT,
    host: PG_HOST,
});

export default pool;