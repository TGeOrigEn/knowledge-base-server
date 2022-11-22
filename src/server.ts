import Router from './routers/router';

import parser from 'body-parser';
import express from 'express';
import dotnev from 'dotenv';
import https from 'https';
import fs from 'fs';

dotnev.config();

const PG_TABLES: string[] = JSON.parse(process.env.PG_TABLES);
const SERVER_PORT = Number(process.env.SERVER_PORT);
const SERVER_HOST = process.env.SERVER_HOST;

const credentials = {
    cert: fs.readFileSync(process.env.PATH_SSL_CRT, 'utf8'),
    key: fs.readFileSync(process.env.PATH_SSL_KEY, 'utf8')
}

const app = express();

const log = () => {
    console.log(`Running on: https://${SERVER_HOST}:${SERVER_PORT}`);
    console.log(`Available tables: ${PG_TABLES}`);
};

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(parser.json());

PG_TABLES.forEach((table) => app.use(`/`, new Router(table).router));

https.createServer(credentials, app).listen(SERVER_PORT, SERVER_HOST, log);