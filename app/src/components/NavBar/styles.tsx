import styled from "styled-components/native";

export const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
  background-color: #f0f0f0;
`;

export const NavButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const NavButtonText = styled.Text`
  font-size: 24px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
