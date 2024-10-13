import { Request } from "express";
import { Response } from "express";

import { Category } from '../../models/category';

export async function listCategories(req: Request, res: Response) {
	const events = await Category.find();

	res.json(events);

}
