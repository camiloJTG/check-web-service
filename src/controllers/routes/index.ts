import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../docs/swagger/swagger.json';
import users from './users';
import groups from './groups';
import tasks from './tasks';
import { Application } from 'express';

const routes = (app: Application) => {
  const prefix = '/api';
  app.use(`${prefix}/users`, users);
  app.use(`${prefix}/groups`, groups);
  app.use(`${prefix}/tasks`, tasks);
  app.use(`${prefix}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

export default routes;
