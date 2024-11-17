import styled from 'styled-components/native';

export const ProfileSection = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const UserInfo = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

export const UserId = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

interface ToggleButtonProps {
  selected: boolean;
}

export const ToggleButton = styled.TouchableOpacity<ToggleButtonProps>`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #9B40BF;
  background-color: ${(props: ToggleButtonProps) => (props.selected ? '#9B40BF' : 'transparent')};
`;

export const ToggleButtonText = styled.Text<ToggleButtonProps>`
  color: ${(props: ToggleButtonProps) => (props.selected ? '#FFF' : '#9B40BF')};
  font-weight: bold;
`;

export const EventItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const EventDetails = styled.View`
  margin-left: 10px;
`;

export const EventTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const EventDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

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
  padding: 20px 30px;
`;
