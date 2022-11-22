import Router from './routers/router';

import parser from 'body-parser';
import express from 'express';
import dotnev from 'dotenv';
import https from 'https';
import fs from 'fs';

dotnev.config();

const SERVER_PORT: number = Number(process.env.SERVER_PORT);
const SERVER_HOST: string = process.env.SERVER_HOST;

const CREDENTIALS = {
    cert: fs.readFileSync(process.env.PATH_SSL_CERT, 'utf8'),
    key: fs.readFileSync(process.env.PATH_SSL_KEY, 'utf8')
}

const app = express();

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(parser.json());

JSON.parse(process.env.DATABASE_TABLES).forEach((table) => app.use(`/${process.env.API_PREFIX}`, new Router(table).router));

https.createServer(CREDENTIALS, app).listen(SERVER_PORT, SERVER_HOST, () => console.log(`Running on: https://${SERVER_HOST}:${SERVER_PORT}/${process.env.API_PREFIX}`));