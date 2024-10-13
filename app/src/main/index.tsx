import { Text } from '../components/Text';

import { Container, CategoriesContainer, EventsContainer, Footer, FooterContainer } from './styles';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Events } from '../components/Events';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';

export function Main(){
  return (
    <>
      <Container>
        <Header />

          <CategoriesContainer>
            <Categories></Categories>
          </CategoriesContainer>

          <EventsContainer>
            <Events/>
          </EventsContainer>

      </Container>

        <Footer>
          <FooterContainer>
            <Button onPress={() => alert('novo pedido')}>
              Novo Evento
            </Button>
          </FooterContainer>
        </Footer>

    </>
  );
}
