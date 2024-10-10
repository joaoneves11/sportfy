import { Request } from "express";
import { Response } from "express";

import { Event} from '../../models/event';

export async function listEvents(req: Request, res: Response) {
	const events = await Event.find();

	res.json(events);

}
