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
  const [isSubscribed, setIsSubscribed] = useState(false);



  useEffect(() => {
    if (event) {
      fetchOrganizerName(event.user_id);
      checkSubscription();
    }
  }, [event]);

  const fetchEvent = async () => {
  if (!event) {
    console.error('Evento não encontrado');
    return;
  }

  try {
    const response = await axios.get(`http://192.168.100.122:3001/events/${event._id}`);
    const updatedEvent = response.data;
    // Atualize o estado do evento
    event.subscribers = updatedEvent.subscribers;
    checkSubscription(); // Revalide a inscrição
  } catch (error) {
    console.error('Erro ao buscar evento atualizado:', error);
  }
};
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

  const [isChecking, setIsChecking] = useState(true);
  const checkSubscription = async () => {
    setIsChecking(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId || !event) {
        setIsSubscribed(false);
        return;
      }

      setIsSubscribed(event.subscribers.includes(userId));
    } catch (error) {
      console.error('Erro ao verificar inscrição:', error);
      setIsSubscribed(false);
    } finally {
      setIsChecking(false);
    }
  };
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      await axios.post('http://192.168.100.122:3001/events/subscribe', {
        userId,
        eventId: event?._id,
      });

      Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
      await fetchEvent(); // Atualize o evento local
      await checkSubscription(); // Atualize o estado de inscrição
    } catch (error) {
      console.error('Erro ao inscrever no evento:', error);
      Alert.alert('Erro', 'Erro ao inscrever no evento');
    } finally {
      setIsProcessing(false);
    }
  };
  const handleUnsubscribe = async () => {
    setIsProcessing(true); // Estado para indicar que está processando
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado');
        setIsProcessing(false);
        return;
      }

      // Realiza a requisição para desinscrever o usuário
      await axios.post('http://192.168.100.122:3001/events/unsubscribe', {
        userId,
        eventId: event?._id,
      });

      // Atualiza o estado de inscrição
      setIsSubscribed(false);

      // Atualiza os dados do evento após a desinscrição
      await fetchEvent();

      Alert.alert('Sucesso', 'Desinscrição realizada com sucesso');
    } catch (error) {
      console.error('Erro ao desinscrever do evento:', error);
      Alert.alert('Erro', 'Erro ao desinscrever do evento');
    } finally {
      setIsProcessing(false); // Finaliza o estado de processamento
    }
  };

  if (!event) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
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
              <InformationText>Número de Participantes: {event.subscribers.length}/{event.number_people} pessoas</InformationText>
            </InformationItem>
            <InformationItem>
              <MaterialIcons name="person" size={24} color="#666" />
              <InformationText>Organizador: {organizerName}</InformationText>
            </InformationItem>
            <ButtonItem>
          {isChecking || isProcessing ? (
            <ActivityIndicator size="small" color="#000" />
          ) : isSubscribed ? (
            <Button onPress={handleUnsubscribe} disabled={isProcessing}>
              DESINSCREVER
            </Button>
          ) : (
            <Button onPress={handleSubscribe} disabled={isProcessing}>
              INSCREVA-SE
            </Button>
          )}
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
