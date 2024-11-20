import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../../types/Event';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { InformationContainer, InformationContainerDetails, InformationItem, InformationText, ButtonItem, ModalBody, CloseButton, Header } from './styles';
import { Close } from '../Icons/Close';

interface EventInfoModalProps {
  visible: boolean;
  onClose: () => void;
  event: null | Event;
}

export function EventInfoModal({ visible, onClose, event }: EventInfoModalProps) {
  const [organizerName, setOrganizerName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (event) {
      fetchOrganizerName(event.user_id);
    }
  }, [event]);

  const fetchOrganizerName = async (userId: string) => {
    try {
      const response = await axios.get(`http://192.168.100.122:3001/users/${userId}`);
      const user = response.data;
      setOrganizerName(`${user.first_name} ${user.last_name}`);
    } catch (error) {
      console.error('Erro ao buscar o nome do organizador:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      const response = await axios.post('http://192.168.100.122:3001/events/subscribe', {
        userId,
        eventId: event?._id,
      });

      Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
    } catch (error) {
      console.error('Erro ao inscrever no evento:', error);
      Alert.alert('Erro', 'Erro ao inscrever no evento');
    }
  };

  if (!event) {
    return null;
  }

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <CloseButton onPress={onClose}>
        <Close />
      </CloseButton>
      <ModalBody>
        <Header>
          <Text style={styles.headerText}>{event.name}</Text>
          <Text style={styles.descriptionText}>{event.description}</Text>
          <Text>{new Date(event.date_time).toLocaleString()}</Text>
        </Header>

        <InformationContainer>
          <Text style={styles.informationHeader}>Informações sobre o evento</Text>

          <InformationContainerDetails>
            <InformationItem>
              <MaterialIcons name="location-on" size={24} color="#666" />
              <InformationText>Local: {event.location}</InformationText>
            </InformationItem>
            <InformationItem>
              <MaterialIcons name="people" size={24} color="#666" />
              <InformationText>Número de Participantes: {event.number_people} pessoas</InformationText>
            </InformationItem>
            <InformationItem>
              <MaterialIcons name="person" size={24} color="#666" />
              <InformationText>Organizador: {organizerName}</InformationText>
            </InformationItem>

            <ButtonItem>
              <Button onPress={handleSubscribe}>
                INSCREVA-SE
              </Button>
            </ButtonItem>
          </InformationContainerDetails>
        </InformationContainer>
      </ModalBody>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  },
  descriptionText: {
    color: '#666',
    marginTop: 8,
  },
  informationHeader: {
    fontWeight: '600',
    color: '#666',
  },
});
