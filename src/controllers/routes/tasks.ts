import * as taskService from '../../services/tasks';
import * as taskSchema from '../schemas/tasks';
import { handlerValidation } from '../middlewares/handlerValidation';
import { response2xx, response4xx } from '../../utils/responses';
import { Request, Response, NextFunction, Router } from 'express';
import { checkAuth } from '../middlewares/handlerAuth';

const router = Router();

router.post(
  '/',
  checkAuth,
  handlerValidation(taskSchema.createTaskSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taskService.createTasks(req.body);
      if (typeof result === 'undefined') return next(result);
      typeof result === 'string'
        ? response4xx(res, result, 400)
        : response2xx(res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/group/:id',
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taskService.getTasksByGroup(parseInt(req.params.id));
      if (typeof result === 'undefined') return next(result);
      typeof result === 'string'
        ? response4xx(res, result, 400)
        : response2xx(res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id',
  checkAuth,
  handlerValidation({ id: taskSchema.idSchema }, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taskService.getOneTask(parseInt(req.params.id));
      if (typeof result === 'undefined') return next(result);
      typeof result === 'string'
        ? response4xx(res, result, 400)
        : response2xx(res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  '/:id',
  checkAuth,
  handlerValidation({ id: taskSchema.idSchema }, 'params'),
  handlerValidation(taskSchema.updateTaskSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taskService.updateTask(
        parseInt(req.params.id),
        req.body
      );
      if (typeof result === 'undefined') return next(result);
      typeof result === 'string'
        ? response4xx(res, result, 400)
        : response2xx(res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  handlerValidation({ id: taskSchema.idSchema }, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taskService.deleteTask(parseInt(req.params.id));
      if (typeof result === 'undefined') return next(result);
      typeof result === 'string'
        ? response4xx(res, result, 400)
        : response2xx(res, result, 200);
      req.params;
    } catch (e) {
      next(e);
    }
  }
);

export default router;
