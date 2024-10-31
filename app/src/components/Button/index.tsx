import React from 'react';
import { Text } from "../Text";
import { Container } from "./styles";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean
}

export function Button({ children, onPress }: ButtonProps) {
  return (
    <Container onPress={onPress}>
      <Text weight="600" color="#fff">{children}</Text>
    </Container>
  );
}
