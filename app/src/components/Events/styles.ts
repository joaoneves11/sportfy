import { Platform } from "react-native";
import styled from "styled-components/native";
const isAndroid = Platform.OS === 'android';


export const EventContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Image = styled.Image`
  width: 120px;
  height: 96px;
`;
export const EventDetails = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #e6e6e6;
  margin: 24px 0;
  `;

  export const Icon = styled.View`
  background: #fff;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0px 2px 1px rgba(0,0,0, ${isAndroid ? 1 : 0.1});
  elevation: 2;
`;

export const EvnetInfoModalButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`;
