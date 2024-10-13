import { Request, Response } from "express";
import { Event } from '../../models/event';

export async function deleteEvents(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (deletedEvent) {
            res.status(200).send('Event deleted');
        } else {
            res.status(404).send('Event not found');
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
