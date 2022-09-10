import { Request, Response } from 'express';
import BaseController from './baseController';
import database from '../database';

export default class Controller {

    private readonly table: string;

    public constructor(table: string) {
        this.table = table;
    }

    public async insert(req: Request, res: Response) {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        BaseController.insertionRequest(database, this.table, columns, values)
            .then((result) => res.json(result.rows[0]));
    };

    public async selectAll(_req: Request, res: Response) {
        BaseController.selectionRequest(database, this.table)
            .then((result) => res.json(result.rows));
    };

    public async selectBy(req: Request, res: Response) {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        BaseController.selectionRequest(database, this.table, columns[0], values[0])
            .then((result) => res.json(result.rows));
    };

    public async update(req: Request, res: Response) {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        BaseController.updationRequest(database, this.table, Number(req.params.id), columns, values)
            .then((result) => res.json(result.rows[0]));
    };

    public async delete(req: Request, res: Response) {
        BaseController.deletionRequest(database, this.table, Number(req.params.id))
            .then((result) => res.json(result.rows[0]));
    };
};