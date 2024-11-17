import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, CenteredContainer, CategoriesContainer, EventsContainer, Footer, FooterContainer } from './styles';
import { Header } from '../../components/Header';
import { Categories } from '../../components/Categories';
import { Events } from '../../components/Events';
import { Button } from '../../components/Button';
import axios from 'axios';
import { Event } from '../../types/Event';
import { Category } from '../../types/Category';
import { CreateEventModal } from '../../components/EventModal/CreateEventModal';
import { api } from '../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';

export function Main() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isCreateEventModalVisible, setIsCreateEventModalVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Main'>>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, eventsResponse] = await Promise.all([
          api.get('/categories'),
          api.get('events')
        ]);
        setCategories(categoriesResponse.data);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? '/events'
      : `categories/${categoryId}/events`;

    setIsLoadingEvents(true);
    try {
      const { data } = await api.get(route);
      setEvents(data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setIsLoadingEvents(false);
    }
  }

  const handleCreateEvent = async (newEvent: Partial<Event>) => {
    try {
      const createdEvent = await axios.post('http://192.168.100.122:3001/events', newEvent);
      setEvents((prevEvents) => [...prevEvents, createdEvent.data]);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    } finally {
      setIsCreateEventModalVisible(false);
    }
  };

  return (
    <>
      <Container>
        <Header />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#9B40BF" size="large" />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>
          </>
        )}

        {isLoadingEvents ? (
          <CenteredContainer>
            <ActivityIndicator color="#9B40BF" size="large" />
          </CenteredContainer>
        ) : (
          events.length > 0 ? (
            <>
              <EventsContainer>
                <Events events={events} />
              </EventsContainer>
            </>
          ) : (
            <CenteredContainer>
              <Text>Nenhum evento encontrado</Text>
            </CenteredContainer>
          )
        )}
      </Container>

      <Footer>
      <FooterContainer>
        <Button onPress={() => setIsCreateEventModalVisible(true)}>
          Novo Evento
        </Button>
        <CreateEventModal
          visible={isCreateEventModalVisible}
          onClose={() => setIsCreateEventModalVisible(false)}
          onCreate={handleCreateEvent}
          categories={categories}
        />
      </FooterContainer>
    </Footer>
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.navButtonText}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.navButtonText}>👤</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 24,
  },
});
