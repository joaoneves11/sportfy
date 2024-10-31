import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Importe o Picker do pacote correto
import { Event } from '../../types/Event'; // Certifique-se de importar o tipo Event corretamente
import { Category } from '../../types/Category'; // Certifique-se de importar o tipo Category corretamente

interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (event: Partial<Event>) => void;
  categories: Category[]; // Adicione as categorias como props
}

export function CreateEventModal({ visible, onClose, onCreate, categories }: CreateEventModalProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [numberPeople, setNumberPeople] = useState(10);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // Adicione o campo category

  const onChangeDate = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShowDatePicker(false); // Feche o DateTimePicker após selecionar a data
    }
  };

  const handleCreate = () => {
    const selectedCategory = categories.find(cat => cat._id === category);
    const newEvent: Partial<Event> = {
      name,
      icon: selectedCategory?.icon, // Use o ícone da categoria selecionada
      date_time: date,
      location,
      number_people: numberPeople,
      description,
      category, // Adicione o campo category
    };
    onCreate(newEvent);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create Event</Text>
          <TextInput
            placeholder="Event Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            placeholder="Number of People"
            value={numberPeople.toString()}
            onChangeText={(text) => setNumberPeople(Number(text))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <Picker
            selectedValue={category}
            onValueChange={(itemValue: string) => setCategory(itemValue)} // Especifique o tipo do parâmetro
            style={styles.input}
          >
            {categories.map((cat) => (
              <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
            ))}
          </Picker>
          <Button title="Pick Date and Time" onPress={() => setShowDatePicker(true)} />
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
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
              <Text style={styles.buttonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#9B40BF',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
