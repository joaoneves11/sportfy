import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Event } from '../../types/Event'; // Certifique-se de que o caminho está correto para a interface Event

interface EventInfoModalProps {
  visible: boolean;
  onClose: () => void;
  event: Event;
}

export function EventInfoModal({ visible, onClose, event }: EventInfoModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icone do Evento */}
          <Image source={{ uri: event.icon }} style={styles.iconImage} />

          {/* Informações do Evento */}
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventDetails}>{new Date(event.date_time).toLocaleString()}</Text>

          {/* Localização */}
          <Text style={styles.label}>Local: {event.location}</Text>

          {/* Descrição */}
          <Text style={styles.label}>Descrição: {event.description}</Text>

          {/* Número de Participantes */}
          <Text style={styles.label}>Número de Participantes: {event.number_people}</Text>

          {/* Categoria */}
          <Text style={styles.label}>Categoria: {event.category}</Text>

          {/* Botão para fechar */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  iconImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#9B40BF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
