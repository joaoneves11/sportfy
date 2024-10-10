import { Text } from '../components/Text';

import { Container, EventsContainer, NewEventContainer, Footer, FooterContainer } from './styles';

import { Header } from '../components/Header';
import { Events } from '../components/Events';
import { NewEvent } from '../components/NewEvent';

export function Main(){
  return (
    <>
      <Container>
        <Header />

          <EventsContainer>
            <Events></Events>
          </EventsContainer>

          <NewEventContainer>
            <NewEvent></NewEvent>
          </NewEventContainer>

      </Container>

        <Footer>
          <FooterContainer>

          </FooterContainer>
        </Footer>

    </>
  );
}
