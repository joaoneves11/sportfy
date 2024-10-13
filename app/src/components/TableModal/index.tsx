import {Modal} from 'react-native';

import { Text } from '../Text';
import { Overlay } from './styles';
export function TableModal(){
  return (
    <Modal
      transparent
    >
      <Overlay>

      <Text>Modal</Text>

      </Overlay>
    </Modal>
  );
}
