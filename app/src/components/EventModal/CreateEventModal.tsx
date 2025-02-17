import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Event } from '../../types/Event';
import { Category } from '../../types/Category';
import { Close } from '../Icons/Close';
import { CloseButton, styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (event: Partial<Event>) => void;
  categories: Category[];
}

export function CreateEventModal({ visible, onClose, onCreate, categories }: CreateEventModalProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [numberPeople, setNumberPeople] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories.length > 0 ? categories[0]._id : '');

  useEffect(() => {
    if (categories.length > 0 && category === '') {
      setCategory(categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    if (!visible) {
      // Reset fields when modal is closed
      setName('');
      setLocation('');
      setNumberPeople(0);
      setDescription('');
      setCategory('');
      setDate(new Date());
      setShowDatePicker(false);
    }
  }, [visible]);

  const onChangeDate = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    // setShowDatePicker(false); // Feche o DateTimePicker após selecionar a data
  };

  const validateFields = () => {
    if (!name || !location || !description || !category || !numberPeople) {
      Alert.alert('Erro ao criar evento', 'Por favor, preencha todos os campos.');
      return false;
    }

    const now = new Date();
    if (!date || date <= now) {
      Alert.alert('Erro ao criar evento', 'Por favor, selecione uma data válida no futuro.');
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateFields()) {
      return;
    }

    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    const selectedCategory = categories.find(cat => cat._id === category);
    const newEvent: Partial<Event> = {
      name,
      icon: selectedCategory?.icon,
      date_time: date,
      location,
      number_people: numberPeople,
      description,
      category,
      user_id: userId, // Adiciona o ID do usuário ao evento
    };
    Alert.alert('Evento criado com sucesso', '');
    onCreate(newEvent);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <CloseButton onPress={onClose}>
            <Close />
          </CloseButton>
          <Text style={styles.modalTitle}>Criar eventos esportivos</Text>
          <Text style={styles.label}>Nome do Evento</Text>
          <TextInput
            placeholder="Nome do Evento"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Localização</Text>
          <TextInput
            placeholder="Localização"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Número de Pessoas</Text>
          <TextInput
            placeholder="Número de Pessoas"
            value={numberPeople.toString()}
            onChangeText={(text) => setNumberPeople(Number(text))}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Descrição do Evento</Text>
          <TextInput
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Categoria</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue: string) => setCategory(itemValue)}
            style={styles.picker}
            itemStyle={pickerStyles.itemStyle}
          >
            {categories.map((cat) => (
              <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
            ))}
          </Picker>
          <Button title="Escolher dia e horário" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
              <Text style={styles.buttonText}>Criar Evento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const pickerStyles = StyleSheet.create({
  itemStyle: {
    color: 'black',
  },
});
