import {Router} from 'express';

import {listEvents} from './app/useCases/events/listEvents';
import {createEvents} from './app/useCases/events/createEvent';

export const router = Router();

//list events

router.get('/events', listEvents);


//create events
router.post('/events', createEvents);

//delete events
router.delete('/events/:id', (req, res) => {
	res.send('delete events // OK');
});

