import { Request, Response } from "express";
import { Category } from '../../models/category';

export async function deleteCategories(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (deletedCategory) {
            res.status(200).send('Category deleted');
        } else {
            res.status(404).send('Category not found');
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
