import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EventsContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ProfileSection = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const UserInfo = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

export const UserId = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const NavBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
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
  padding-horizontal: 10px;
  padding-vertical: 20px;
  margin-top: 30px;
  padding: 20px 20px;
`;

export const Footer = styled.View`
  position: relative;
  bottom: 0;
  width: 100%;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

interface ToggleButtonProps {
  selected: boolean;
}

export const ToggleButton = styled.TouchableOpacity<ToggleButtonProps>`
  padding: 10px 20px;
  background-color: ${({ selected }: ToggleButtonProps) => (selected ? '#9B40BF' : '#f0f0f0')};
  border-radius: 5px;
  margin: 0 10px;
`;

export const ToggleButtonText = styled.Text<ToggleButtonProps>`
  color: ${({ selected }: ToggleButtonProps) => (selected ? '#fff' : '#9B40BF')};
  font-weight: bold;
`;
