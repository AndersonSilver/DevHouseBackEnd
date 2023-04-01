import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import HouserController from './controllers/HouserController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/houses', upload.single('thumbnail'), HouserController.store);
routes.get('/houses', HouserController.index);

routes.put('/houses/:house_id', upload.single('thumbnail'), HouserController.update);
routes.delete('/houses', HouserController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);

routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy)

export default routes;