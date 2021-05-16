import users from './users';
import { Application } from 'express';

const routes = (app: Application) => {
  const prefix = '/api';
  app.use(`${prefix}/users`, users);
};

export default routes;
