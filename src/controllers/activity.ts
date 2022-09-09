import database from '../database';
import Controller from './controller';
import { Request, Response } from 'express';

export default class Activity {

    private static readonly TABLE: string = 'activity';

    static async create(req: Request, res: Response) {
        const body = req.body;
        const columns = ['person_id', 'name', 'description', 'place'];
        const values = [body.person_id, body.name, body.description, body.place];

        Controller.insertionRequest(database, this.TABLE, columns, values)
            .then((result) => res.json(result.rows[0]));
    }

    static async getAll(_req: Request, res: Response) {
        const activity = await database.query('SELECT * FROM activity');
        res.json(activity.rows);
    }

    static async update(req: Request, res: Response) {
        const {
            id,
            person_id,
            name,
            description,
            place,
        } = req.body;

        const activity = await database.query('UPDATE activity SET person_id = $1, name = $2, description = $3, place = $4 WHERE id = $5 RETURNING *'
            , [person_id, name, description, place, id]);

        res.json(activity.rows[0]);
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;
        const activity = await database.query('DELETE FROM activity WHERE id = $1', [id]);
        res.json(activity.rows[0]);
    }
}