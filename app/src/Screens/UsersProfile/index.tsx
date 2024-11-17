import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, CenteredContainer, EventsContainer} from '../main/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Event } from '../../types/Event';
import { RootStackParamList } from '../../../App';
import { ProfileSection, UserInfo, UserId, ToggleRow, ToggleButton, ToggleButtonText, NavBar, NavButton,  HeaderContainer , NavButtonText } from './styles';
import { Events } from '../../components/Events';

export function UserProfile() {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [subscribedEvents, setSubscribedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMyEvents, setShowMyEvents] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'UserProfile'>>();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get('https://api.example.com/my-events');
        setMyEvents(response.data);
      } catch (error) {
        console.error('Erro ao carregar meus eventos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSubscribedEvents = async () => {
      try {
        const response = await axios.get('https://api.example.com/subscribed-events');
        setSubscribedEvents(response.data);
      } catch (error) {
        console.error('Erro ao carregar eventos inscritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (showMyEvents) {
      fetchMyEvents();
    } else {
      fetchSubscribedEvents();
    }
  }, [showMyEvents]);

  return (
    <Container>
      <HeaderContainer>
        <Text style={styles.headerText}>Meu perfil</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('UserSettings')}
        >
          <Ionicons name="settings-outline" size={24} color="#9B40BF" />
        </TouchableOpacity>
      </HeaderContainer>

      {isLoading ? (
        <CenteredContainer>
          <ActivityIndicator color="#9B40BF" size="large" />
        </CenteredContainer>
      ) : (
        <>
          <ProfileSection>
            <Ionicons name="person-circle" size={80} color="#9B40BF" />
            <UserInfo>Nome do Usuário</UserInfo>
            <UserId>ID: 12345</UserId>
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
  settingsButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B40BF',
  },
});
