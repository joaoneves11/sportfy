import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Container, CenteredContainer, EventsContainer, HeaderContainer, NavBar, NavButton, ProfileSection, UserInfo, UserId, ToggleRow, ToggleButton, ToggleButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Event } from '../../types/Event';
import { RootStackParamList } from '../../../App';
import { Events } from '../../components/Events';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfileProps {
  onLogout: () => void;
}

export function UserProfile({ onLogout }: UserProfileProps) {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [subscribedEvents, setSubscribedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMyEvents, setShowMyEvents] = useState(true);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'UserProfile'>>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          throw new Error('Usuário não autenticado');
        }
        setUserId(storedUserId);
        const response = await axios.get(`http://192.168.100.122:3001/users/${storedUserId}`);
        const user = response.data;
        setUserName(`${user.first_name} ${user.last_name}`);
      } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
      }
    };

    const fetchMyEvents = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          throw new Error('Usuário não autenticado');
        }
        const response = await axios.get(`http://192.168.100.122:3001/users/${storedUserId}/events`);
        setMyEvents(response.data);
      } catch (error) {
        console.error('Erro ao carregar meus eventos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSubscribedEvents = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          throw new Error('Usuário não autenticado');
        }
        const response = await axios.get(`http://192.168.100.122:3001/users/${storedUserId}/subscribed-events`);
        setSubscribedEvents(response.data);
      } catch (error) {
        console.error('Erro ao carregar eventos inscritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
    if (showMyEvents) {
      fetchMyEvents();
    } else {
      fetchSubscribedEvents();
    }
  }, [showMyEvents]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      Alert.alert('Sucesso', 'Logout realizado com sucesso');
      onLogout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Erro ao fazer logout');
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <Text style={styles.headerText}>Meu perfil</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('UserSettings')}
          >
            <Ionicons name="settings-outline" size={24} color="#9B40BF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#9B40BF" />
          </TouchableOpacity>
        </View>
      </HeaderContainer>

      {isLoading ? (
        <CenteredContainer>
          <ActivityIndicator color="#9B40BF" size="large" />
        </CenteredContainer>
      ) : (
        <>
          <ProfileSection>
            <Ionicons name="person-circle" size={80} color="#9B40BF" />
            <UserInfo>{userName}</UserInfo>
            <UserId>ID: {userId}</UserId>
          </ProfileSection>

          <ToggleRow>
            <ToggleButton
              selected={showMyEvents}
              onPress={() => setShowMyEvents(true)}
            >
              <ToggleButtonText selected={showMyEvents}>Meus Eventos</ToggleButtonText>
            </ToggleButton>
            <ToggleButton
              selected={!showMyEvents}
              onPress={() => setShowMyEvents(false)}
            >
              <ToggleButtonText selected={!showMyEvents}>Eventos Inscritos</ToggleButtonText>
            </ToggleButton>
          </ToggleRow>

          <EventsContainer>
            <Events events={showMyEvents ? myEvents : subscribedEvents} />
          </EventsContainer>
        </>
      )}

      <NavBar>
        <NavButton onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home-outline" size={24} color="#9B40BF" />
        </NavButton>
        <NavButton onPress={() => navigation.navigate('UserProfile')}>
          <Ionicons name="person-outline" size={24} color="#9B40BF" />
        </NavButton>
      </NavBar>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B40BF',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 10,
  },
  logoutButton: {
    padding: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
