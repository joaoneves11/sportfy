import { Request } from "express";
import { Response } from "express";

import { Event} from '../../models/event';

export async function createEvents(req: Request, res: Response) {
const { name, icon, date_time, location, number_people, description, category, user_id } = req.body;

  try {
    const event = await Event.create({
      name,
      icon,
      date_time,
      location,
      number_people,
      description,
      category,
      user_id,
    });

		//201: created
		//200: ok
		//500: internal server error
		res.status(201).json(event);
	}
	catch(err){
		console.log(err);
		res.sendStatus(500);
	}

}
