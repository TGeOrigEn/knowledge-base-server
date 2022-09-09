import { Request, Response } from 'express';
import Controller from './controller';
import database from '../database';

export default class Activity {

    private static readonly TABLE: string = 'activity';

    public static async insert(req: Request, res: Response) {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        Controller.insertionRequest(database, Activity.TABLE, columns, values)
            .then((result) => res.json(result.rows[0]));
    }

    public static async selectAll(_req: Request, res: Response) {
        Controller.selectionRequest(database, Activity.TABLE)
            .then((result) => res.json(result.rows));
    }

    public static async selectBy(req: Request, res: Response) {
        const columns = Object.getOwnPropertyNames(req.body);
        const values = Object.values(req.body) as string[];

        Controller.selectionRequest(database, Activity.TABLE, columns, values)
            .then((result) => res.json(result.rows));
    }

    public static async update(req: Request, res: Response) {
        const columns = Object.getOwnPropertyNames(req.params);
        const values = Object.values(req.params) as string[];

        Controller.updationRequest(database, Activity.TABLE, Number(req.params.id), columns, values)
            .then((result) => res.json(result.rows[0]));
    }

    public static async delete(req: Request, res: Response) {
        Controller.deletionRequest(database, Activity.TABLE, Number(req.params.id))
            .then((result) => res.json(result.rows[0]));
    }
}