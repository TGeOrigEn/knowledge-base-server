import express from 'express';
import dotnev from 'dotenv';

dotnev.config();

const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 8080;
const SERVER_HOST: string = process.env.SERVER_HOST || 'localhost';

const app = express();

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Running on: ${SERVER_HOST}:${SERVER_PORT}`));