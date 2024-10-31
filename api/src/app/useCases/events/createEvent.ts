import { Request } from "express";
import { Response } from "express";

import { Event} from '../../models/event';

export async function createEvents(req: Request, res: Response) {

	try{
		// const imagePath = req.file?.filename;
		const { name, date_time, location, number_people, description, icon, category} = req.body;

		const event = await Event.create({ name, date_time, location, number_people,  description, icon, category});

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
