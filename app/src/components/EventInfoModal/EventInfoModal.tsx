import {Modal} from 'react-native';
import { Text } from '../Text';
import { Event } from '../../types/Event';

interface EventInfoModalProps{
  visible: boolean;
  onClose: () => void;
  event: null | Event;
}
export function EventInfoModal({visible, onClose, event} : EventInfoModalProps){
  return (
    <Modal
    visible={visible}
    animationType='slide'
    presentationStyle='pageSheet'
    onRequestClose={onClose}
    >
      <Text>

        Hello Word
      </Text>
    </Modal>
  )
}
