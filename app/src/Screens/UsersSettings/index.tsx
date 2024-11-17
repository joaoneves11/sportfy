import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type UserSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserSettings'>;

export function UserSettings() {
  const [name, setName] = useState('Nome do Usuário');
  const [userId] = useState('12345');
  const navigation = useNavigation<UserSettingsScreenNavigationProp>();

  const handleSave = () => {
    // Lógica para salvar as informações do usuário
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configurações do Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.userId}>ID: {userId}</Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  userId: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#9B40BF',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
