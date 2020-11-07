import express from 'express'
import { textChangeRangeIsUnchanged } from 'typescript';
import ClassesController from './controllers/ClassesControllers';
import ConnectionsController from './controllers/ConnectionController';

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

interface ScheduleItem {
    week_day: number,
    from: string,
    to:string
}

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.list);

export default routes;