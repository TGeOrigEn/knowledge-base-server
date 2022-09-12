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
        const columns = Object.getOwnPropertyNames(req.params);
        const values = Object.values(req.params) as string[];

        await BaseController.selectionRequestBy(database, this.table, columns[0], values[0])
            .then((result) => res.json(result.rows));
    };

    public update = async (req: Request, res: Response) => {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        await BaseController.updationRequest(database, this.table, Number(req.params.id), columns, values)
            .then((result) => res.json(result.rows[0]));
    };

    public delete = async (req: Request, res: Response) => {
        await BaseController.deletionRequest(database, this.table, Number(req.params.id))
            .then((result) => res.json(result.rows[0]));
    };
};