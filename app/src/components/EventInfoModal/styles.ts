import styled from "styled-components/native";

export const CloseButton =  styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background: rgba(0,0,0,0.5);
  border-radius: 16px;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 24px;
  top: 24px;
`;

export const ModalBody = styled.View`
  flex: 1;
  background: #fafafa;
  margin-top: 200px;
  padding: 32px 24px 0;
`;

export const Header = styled.View`

`;

export const InformationContainer = styled.View`
    margin-top: 32px;

`;


export const InformationContainerDetails = styled.View`
    margin-top: 20px;
    padding: 16px;
    backgroundColor: #f9f9f9;
    borderRadius: 8px;
`;


export const InformationItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;

export const InformationText = styled.Text`
    color: #666;
    margin-left: 8px;
`;
