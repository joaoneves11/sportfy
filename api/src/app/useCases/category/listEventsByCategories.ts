import { Request } from "express";
import { Response } from "express";

import { Event} from '../../models/event';

export async function listEventsByCategories(req: Request, res: Response) {
	const {categoryId} = req.params
	const events = await Event.find().where('category').equals(categoryId);

	res.json(events);

}
