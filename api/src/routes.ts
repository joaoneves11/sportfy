import path from 'node:path';

import {Router} from 'express';
import multer from 'multer'
import {listEvents} from './app/useCases/events/listEvents';
import {listCategories} from './app/useCases/category/listCategory';
import {createCategory} from './app/useCases/category/createCategory';
import {createEvents} from './app/useCases/events/createEvent';
import {deleteEvents} from './app/useCases/events/deleteEvents';
import { listEventsByCategories } from './app/useCases/category/listEventsByCategories';

export const router = Router();

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback){
			callback(null, path.resolve(__dirname, '..', 'uploads'));
		},
		filename(req, file, callback){
			callback(null, `${Date.now()}-${file.originalname}`)
		},
	}),
});
//list categories
router.get('/categories', listCategories);

//create categories
router.post('/categories', createCategory);

//delete categories
router.delete('/categories/:id', (req, res) => {
	res.send('delete categories // OK');
});


//list events
router.get('/events', listEvents);

//create events
router.post('/events', upload.single('image'), createEvents);//nome no json

//delete events
router.delete('/events/:id', deleteEvents);

//get events by category
router.get('/categories/:categoryId/events', listEventsByCategories);
