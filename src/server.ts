import BaseRouter from './routers/router';
import BodyParser from 'body-parser';

import express from 'express';
import dotnev from 'dotenv';

dotnev.config();

const DATABASE_TABLES: string[] = JSON.parse(process.env.DATABASE_TABLES);
const SERVER_PORT: number = Number(process.env.SERVER_PORT);
const SERVER_HOST: string = process.env.SERVER_HOST;
const API_PREFIX: string = process.env.API_PREFIX;

const app = express();

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(BodyParser.json());

DATABASE_TABLES.forEach((table) => app.use(`/${API_PREFIX}`, new BaseRouter(table).router));

app.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Running on: ${SERVER_HOST}:${SERVER_PORT}`));