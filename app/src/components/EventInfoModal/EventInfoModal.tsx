import {FlatList, Modal} from 'react-native';
import { Text } from '../Text';
import { Event } from '../../types/Event';
import { Image } from '../Events/styles';
import { CloseButton, Header, InformationContainer, InformationContainerDetails, ModalBody, InformationItem, InformationText } from './styles';
import { Close } from '../Icons/Close';
import { format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { Category } from '../../types/Category';

import { ptBR } from 'date-fns/locale';

interface EventInfoModalProps{
  visible: boolean;
  onClose: () => void;
  event: null | Event;

}
export function EventInfoModal({visible, onClose, event} : EventInfoModalProps){
  if(!event){
    return null;
  }


  const formattedDate = format(new Date(event.date_time), 'EEEE, dd/MM/yyyy HH:mm', { locale: ptBR  });


  return (
    <Modal
    visible={visible}
    animationType='slide'
    presentationStyle='pageSheet'
    onRequestClose={onClose}
    >
      <CloseButton onPress={onClose}>
          <Close></Close>
      </CloseButton>

    <ModalBody

    >
      <Header>
        <Text size={24} weight={600}>{event.name}</Text>
        <Text color="#666" style={{marginTop: 8}}>{event.description}</Text>
        <Text>{formattedDate}</Text>
      </Header>

      <InformationContainer>
          <Text weight="600" color="#666">Informações sobre o evento</Text>

          <InformationContainerDetails>
          <InformationItem>
            {/* <MaterialIcons name="category" size={24} color="#666" />
            <InformationText>{event.category}</InformationText> */}
          </InformationItem>
          <InformationItem>
            <MaterialIcons name="location-on" size={24} color="#666" />
            <InformationText>{event.location}</InformationText>
          </InformationItem>
          <InformationItem>
            <MaterialIcons name="people" size={24} color="#666" />
            <InformationText>{event.number_people} pessoas</InformationText>
          </InformationItem>
          <InformationItem>
            <MaterialIcons name="person" size={24} color="#666" />
            <InformationText>Organizador: João</InformationText>
          </InformationItem>
        </InformationContainerDetails>

{/* arrumar organizador depois */}

      </InformationContainer>
    </ModalBody>

    </Modal>
  )
}
