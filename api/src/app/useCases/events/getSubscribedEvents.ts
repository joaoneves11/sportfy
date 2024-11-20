import { Request, Response } from 'express';
import { Event } from '../../models/event';
import { User } from '../../models/User';

export async function getSubscribedEvents(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const events = await Event.find({ subscribers: userId });
    res.json(events);
  } catch (error) {
    console.error('Erro ao carregar eventos inscritos:', error);
    res.status(500).json({ message: 'Erro ao carregar eventos inscritos' });
  }
}
