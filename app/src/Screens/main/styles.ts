import styled from "styled-components/native";
import { SafeAreaView, Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === 'android';

export const Container = styled(SafeAreaView)`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1;
  background-color: #fafafa;
`;

export const CategoriesContainer = styled.View`
  margin-top: 34px;
`;

export const EventsContainer = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  width: 100%;
  padding: 16px 24px;
  align-items: center;
  margin-bottom: 20px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: #9B40BF;
  border-radius: 5px;
`;


export const CenteredContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const CreateEventModal = styled.Modal``;
