import BaseController from './baseController';
import { Request, Response } from 'express';
import database from '../database';

export default class Controller {

    private readonly table: string;

    public constructor(table: string) {
        this.table = table;
    }

    public insert = async (req: Request, res: Response) => {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        await BaseController.insertionRequest(database, this.table, columns, values)
            .then((result) => res.json(result.rows[0]));
    };

    public selectAll = async (_req: Request, res: Response) => {
        await BaseController.selectionRequestAll(database, this.table)
            .then((result) => res.json(result.rows));
    };

    public selectBy = async (req: Request, res: Response) => {
        const columns = Object.getOwnPropertyNames(req.query);
        const values = Object.values(req.query) as string[];

        await BaseController.selectionRequestBy(database, this.table, columns, values)
            .then((result) => res.json(result.rows));
    };

    public update = async (req: Request, res: Response) => {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        await BaseController.updationRequest(database, this.table, Number(req.params.id), columns, values)
            .then((result) => res.json(result.rows[0]));
    };

    public login = async (req: Request, res: Response) => {
        const columns = Object.getOwnPropertyNames(req.query);
        const values = Object.values(req.query) as string[];
        console.log(values);
        console.log(columns);
        await BaseController.login(database, values[0], values[1])
            .then((result) => res.json(result));
    };

    public token = async (req: Request, res: Response) => {
        console.log(req.query[0].toString());
        await BaseController.tokenRequest(req.query[0].toString())
            .then((result) => res.json(result));
    };

    public deleteBy = async (req: Request, res: Response) => {
        const columns = Object.getOwnPropertyNames(req.query);
        const values = Object.values(req.query) as string[];

        await BaseController.deletionRequestBy(database, this.table, columns, values)
            .then((result) => res.json(result.rows));
    };
};