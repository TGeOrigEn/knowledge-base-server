import Router from './routers/router';

import parser from 'body-parser';
import express from 'express';
import dotnev from 'dotenv';
import https from 'https';
import fs from 'fs';

dotnev.config();

const DATABASE_TABLES: string[] = JSON.parse(process.env.DATABASE_TABLES);
const SERVER_PORT: number = Number(process.env.SERVER_PORT);
const SERVER_HOST: string = process.env.SERVER_HOST;
const API_PREFIX: string = process.env.API_PREFIX;

const certificate = fs.readFileSync('/etc/ssl/gov-elite-bd.ru.crt', 'utf8');
const privateKey = fs.readFileSync('/etc/ssl/gov-elite-bd.ru.key', 'utf8');

const credentials = { key: privateKey, cert: certificate }

const app = express();

app.use((_req, res) => { res.setHeader('Access-Control-Allow-Origin', '*'); });

app.use(parser.json());

DATABASE_TABLES.forEach((table) => app.use(`/${API_PREFIX}`, new Router(table).router));

https.createServer(credentials, app).listen(SERVER_PORT, SERVER_HOST, () => console.log(`Running on: https://${SERVER_HOST}:${SERVER_PORT}`));