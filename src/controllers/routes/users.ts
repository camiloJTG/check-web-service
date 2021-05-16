import * as usersService from '../../services/users';
import * as userSchema from '../schemas/users';
import { handlerValidation } from '../middlewares/handlerValidation';
import { response2xx, response4xx } from '../../utils/responses';
import { Request, Response, NextFunction, Router } from 'express';
import { checkAuth } from '../middlewares/handlerAuth';

const router = Router();

router.post(
  '/',
  handlerValidation(userSchema.createUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.createUser(req.body);
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
  '/:id',
  checkAuth,
  handlerValidation({ id: userSchema.idSchema }, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.getUser(parseInt(req.params.id));
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
  handlerValidation({ id: userSchema.idSchema }, 'params'),
  handlerValidation(userSchema.updateUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.updateUser(
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

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.login(req.body);
      if (typeof result === 'undefined') return next(result);
      typeof result === 'string'
        ? response4xx(res, result, 400)
        : response2xx(res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
