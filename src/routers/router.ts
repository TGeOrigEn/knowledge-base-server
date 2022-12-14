import BaseController from '../controllers/controller';
import { Router } from 'express';

export default class BaseRouter {

    public readonly router: Router;

    private readonly controller: BaseController;

    public constructor(table: string) {
        this.controller = new BaseController(table);

        this.router = Router();

        this.router.get(`/${table}/all`, this.controller.selectAll);
        this.router.delete(`/${table}`, this.controller.deleteBy);
        this.router.put(`/${table}/:id`, this.controller.update);
        this.router.get(`/`, this.controller.login);
        this.router.get(`/token`, this.controller.token);
        this.router.get(`/${table}`, this.controller.selectBy);
        this.router.post(`/${table}`, this.controller.insert);
    };
};