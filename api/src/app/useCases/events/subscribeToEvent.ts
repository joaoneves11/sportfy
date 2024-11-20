import { Request, Response } from 'express';
import { Event } from '../../models/event';
import { User } from '../../models/User';

export async function subscribeToEvent(req: Request, res: Response) {
  const { userId, eventId } = req.body;

  try {
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: 'Usuário ou evento não encontrado' });
    }

    if (event.subscribers.includes(userId)) {
      return res.status(400).json({ message: 'Usuário já inscrito no evento' });
    }

    event.subscribers.push(userId);
    await event.save();

    res.status(200).json({ message: 'Inscrição realizada com sucesso' });
  } catch (error) {
    console.error('Erro ao inscrever no evento:', error);
    res.status(500).json({ message: 'Erro ao inscrever no evento' });
  }
}
