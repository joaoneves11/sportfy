import { Request, Response } from 'express';
import { Event } from '../../models/event';

export const getEventSubscribers = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId).populate('subscribers', 'first_name last_name email');

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(200).json(event.subscribers);
  } catch (error) {
    console.error('Erro ao buscar inscritos do evento:', error);
    res.status(500).json({ message: 'Erro ao buscar inscritos do evento' });
  }
};
