import { Request } from "express";
import { Response } from "express";

import { Category } from '../../models/category';

export async function createCategory(req: Request, res: Response) {

	try{
		const { name, icon} = req.body;

		const event = await Category.create({name, icon});

		res.status(201).json(event);
	}
	catch(err){
		console.log(err);
		res.sendStatus(500);
	}

}
