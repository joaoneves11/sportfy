import styled from "styled-components/native";
import { SafeAreaView, Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === 'android';

//se for android, pega a altura da status bar, se não, 0
export const Container = styled(SafeAreaView)`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1;
  background-color: #fafafa;
`;

export const CategoriesContainer = styled.View`
  margin-top: 34px;
`;

export const EventsContainer = styled.View`
  height: 25px;
  flex: 1;

`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 79px;
  background-color: #fafafa;
  padding: 16px 24px;
`;

export const FooterContainer = styled(SafeAreaView)`
  flex: 1;
  `;

  export const CenteredContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  `;
