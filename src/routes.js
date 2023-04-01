import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import HouserController from './controllers/HouserController';


const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/houses', upload.single('thumbnail'), HouserController.store);
routes.get('/houses', HouserController.index);

routes.put('/houses/:house_id', upload.single('thumbnail'), HouserController.update);
routes.delete('/houses', HouserController.destroy);

export default routes;