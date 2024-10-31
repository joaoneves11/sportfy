import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
// import { events } from '../../mocks/events';
import { Event } from "../../types/Event";

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Text } from '../Text';
import { useState } from "react";


import { EventContainer, EventDetails, Icon, Image, Separator} from './styles';
import { PlusCircle } from '../Icons/PlusCircle';


interface EventsProps{
  events: Event[];
}

// Função auxiliar para capitalizar a primeira letra
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function Events({ events} : EventsProps) {

  const [selectedEvent, setSelectedEvent] = useState('');

  function handleSelectCategory(eventId: string){
    const event =  selectedEvent === eventId ? '' : eventId;

    setSelectedEvent(event);
  }


  return (
    <FlatList
      data={events}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={(event) => event._id}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item: event }) => {
        let formattedDate = format(new Date(event.date_time), 'EEEE, dd/MM/yyyy HH:mm', { locale: ptBR });
        formattedDate = capitalizeFirstLetter(formattedDate);
        return (
          <EventContainer>
            {/* <Image
              source={{ uri: `http://192.168.100.122:3001/uploads/${event.imagePath}` }}
            /> */}
              <Icon>
                <Text>{event.icon}</Text>
              </Icon>

            <EventDetails>
              <Text weight="600">{event.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {event.description}
              </Text>
              <Text size={14} weight="600">{formattedDate}</Text>
            </EventDetails>
          </EventContainer>
        );
      }}
    />
  );
}
