import styled from "styled-components/native";
import { SafeAreaView, Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === 'android';

//se for android, pega a altura da status bar, se não, 0
export const Container = styled(SafeAreaView)`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1;
  background-color: #fafafa;
`;

export const EventsContainer = styled.View`
  flex: 1;
  margin-top: 34px;
`;

export const NewEventContainer = styled.View`
  height: 25px;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 79px;
  background-color: #fafafa
`;

export const FooterContainer = styled(SafeAreaView)`
  flex: 1;
`;
