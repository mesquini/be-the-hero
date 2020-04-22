import express from 'express';

import {
  postONG,
  authorization,
  paramsIdIncident,
  queryPage,
  postIncident,
} from './middlewares/validations';

import {
  OngController,
  IncidentController,
  ProfileController,
  SessionController,
} from './controllers';

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', postONG(), OngController.store);

routes.get('/incidents', queryPage(), IncidentController.index);

routes.use(authorization());

routes.put('/ong', postONG(), OngController.update);

routes.get('/profile', ProfileController.index);

routes.post('/incidents', postIncident(), IncidentController.store);
routes.put('/incident/:id', paramsIdIncident(), IncidentController.update);
routes.delete('/incident/:id', paramsIdIncident(), IncidentController.delete);

export default routes;
