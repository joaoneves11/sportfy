import { Request, Response } from 'express';
import { Event } from '../../models/event';

export async function listEventsByUser(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const events = await Event.find({ user_id: userId });
    res.json(events);
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    res.status(500).json({ message: 'Erro ao listar eventos' });
  }
}
