import { Request } from "express";
import { Response } from "express";

import { Event} from '../../models/event';

export async function createEvents(req: Request, res: Response) {

	try{
		const { tipo,  data, horario, localizacao, numero_de_pessoas, descricao, icon} = req.body;

		const event = await Event.create({tipo, data, horario, localizacao, numero_de_pessoas, descricao, icon});

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
