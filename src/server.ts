import BaseRouter from './routers/router';
import BodyParser from 'body-parser';

import express from 'express';
import dotnev from 'dotenv';
import fs from 'fs';
import https from 'https';
import http from 'http';

const privateKey  = fs.readFileSync('etc/ssl/gov-elite-bd.ru.key', 'utf8');
const certificate = fs.readFileSync('etc/ssl/gov-elite-bd.ru.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate}
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


const PORT = Number(process.env.SERVER_PORT);

app.use(BodyParser.json());

DATABASE_TABLES.forEach((table) => app.use(`/${API_PREFIX}`, new BaseRouter(table).router));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT);

//app.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Running on: ${SERVER_HOST}:${SERVER_PORT}`));