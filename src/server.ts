import Router from './routers/router';

import parser from 'body-parser';
import express from 'express';
import dotnev from 'dotenv';
import https from 'https';
import fs from 'fs';

dotnev.config();

const SERVER_PORT: number = Number(process.env.SERVER_PORT);
const SERVER_HOST: string = process.env.SERVER_HOST;

const credentials = {
    cert: fs.readFileSync(process.env.PATH_SSL_CRT, 'utf8'),
    key: fs.readFileSync(process.env.PATH_SSL_KEY, 'utf8')
}

const app = express();

const log = () => {
    console.log(`Running on: https://${SERVER_HOST}:${SERVER_PORT}`);
    console.log(`Running on: https://${SERVER_HOST}:${SERVER_PORT}`);
};

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(parser.json());

JSON.parse(process.env.DATABASE_TABLES).forEach((table) => app.use(`/`, new Router(table).router));

https.createServer(credentials, app).listen(SERVER_PORT, SERVER_HOST, log);