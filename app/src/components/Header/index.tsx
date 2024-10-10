import React from "react";
import { Text } from  "../Text";
import { Container } from "./styles";

export function Header() {
  return (
    <Container>
      <Text size={24} weight="700">
        SPORT
        <Text size={24}>FY</Text>
      </Text>
      <Text size={14} opacity={0.9} >
        Crie eventos esportivos
      </Text>
    </Container>
  );
}
