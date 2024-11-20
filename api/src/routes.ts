import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { listEvents } from './app/useCases/events/listEvents';
import { listCategories } from './app/useCases/category/listCategory';
import { createCategory } from './app/useCases/category/createCategory';
import { createEvents } from './app/useCases/events/createEvent';
import { deleteEvents } from './app/useCases/events/deleteEvents';
import { listEventsByCategories } from './app/useCases/category/listEventsByCategories';
import { deleteCategories } from './app/useCases/category/deleteCategory';
import { createUser } from './app/useCases/users/createUsers';
import { loginUser } from './app/useCases/users/loginUsers';
import { listEventsByUser } from './app/useCases/events/listEventsByUser';
import { getUserById } from './app/useCases/users/getUserById';
import { subscribeToEvent } from './app/useCases/events/subscribeToEvent';
import { getSubscribedEvents } from './app/useCases/events/getSubscribedEvents';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get('/categories', listCategories);

// Create categories
router.post('/categories', createCategory);

// Delete categories
router.delete('/categories/:id', deleteCategories);

// List events
router.get('/events', listEvents);

// Create events
router.post('/events', upload.single('image'), createEvents);

// Delete events
router.delete('/events/:id', deleteEvents);

// Get events by category
router.get('/categories/:categoryId/events', listEventsByCategories);

// Get events by user
router.get('/users/:userId/events', listEventsByUser);

// Get user by ID
router.get('/users/:userId', getUserById);

// Subscribe to event
router.post('/events/subscribe', subscribeToEvent);


router.get('/users/:userId/subscribed-events', getSubscribedEvents);


// User routes
router.post('/users/register', createUser);
router.post('/users/login', loginUser);
