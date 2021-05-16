import { Request, Response, NextFunction } from 'express';
import { response5xx, response4xx } from '../../utils/responses';
import config from '../../configs/config';

export const logError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  next(err);
};

export const handlerError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.app.dev) {
    if (err.name === 'ValidationError') return response4xx(res, err, 400);
    return response5xx(res, err, 500);
  } else {
    if (err.name === 'ValidationError')
      return response4xx(res, err.message, 400);
    return response5xx(res, err.message, 500);
  }
};
