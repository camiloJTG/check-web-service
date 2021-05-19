import * as groupService from '../../services/groups';
import * as groupSchema from '../schemas/groups';
import { handlerValidation } from '../middlewares/handlerValidation';
import { response2xx, response4xx } from '../../utils/responses';
import { Request, Response, NextFunction, Router } from 'express';
import { checkAuth } from '../middlewares/handlerAuth';

const router = Router();

router.post(
  '/',
  checkAuth,
  handlerValidation(groupSchema.createGroupSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await groupService.createGroup(req.body);
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
  '/user/:id',
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await groupService.getAllGroupByUserId(
        parseInt(req.params.id)
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

router.get(
  '/:id',
  checkAuth,
  handlerValidation({ id: groupSchema.idSchema }, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await groupService.getOneGroup(parseInt(req.params.id));
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
  handlerValidation({ id: groupSchema.idSchema }, 'params'),
  handlerValidation(groupSchema.updateGroupSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await groupService.updateGroup(
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
  handlerValidation({ id: groupSchema.idSchema }, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await groupService.deleteGroup(parseInt(req.params.id));
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
