import { Request, Response } from 'express';
import { Event } from '../../models/event';
import { User } from '../../models/User';
import { Types } from 'mongoose';

export const unsubscribeToEvent = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;

  try {
    // Converta IDs para ObjectId
    const userIdObject = new Types.ObjectId(userId);
    const eventIdObject = new Types.ObjectId(eventId);

    const user = await User.findById(userIdObject);
    const event = await Event.findById(eventIdObject);

    // Verifique se usuário e evento existem
    if (!user || !event) {
      return res.status(404).json({ message: 'Usuário ou evento não encontrado' });
    }

    // Verifique se o usuário está inscrito no evento
    if (!event.subscribers.some((subscriberId: Types.ObjectId) => subscriberId.equals(userIdObject))) {
      return res.status(400).json({ message: 'Usuário não está inscrito no evento' });
    }

    // Remova o usuário do array de inscritos
    event.subscribers = event.subscribers.filter(
      (subscriberId: Types.ObjectId) => !subscriberId.equals(userIdObject)
    );
    await event.save();

    res.status(200).json({ message: 'Desinscrição realizada com sucesso' });
  } catch (error) {
    console.error('Erro ao desinscrever do evento:', error);
    res.status(500).json({ message: 'Erro ao desinscrever do evento' });
  }
};
