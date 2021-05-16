import { Request, Response, NextFunction } from 'express';
import { response4xx } from '../../utils/responses';
import { verifyToken } from '../../utils/jwt';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization'] || '';
    const data = token.split(' ');
    if (!token) return response4xx(res, 'Token not provided', 401);
    const verify = verifyToken(data[1]);
    !verify ? response4xx(res, 'Invalid token', 401) : next();
  } catch (e) {
    return response4xx(res, e.message, 400);
  }
};
