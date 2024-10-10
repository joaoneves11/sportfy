import React from "react";
import {useFonts} from 'expo-font';
import { Main } from "./src/main";
import { Container } from "./src/main/styles";

export default function App() {
  const [isFontsLoaded] = useFonts({
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  });

  if(!isFontsLoaded) {
    return null;
  }

//fonte, caminho, nome da fonte
  return (
    <Container>
      <Main />
    </Container>
  );

}
//view = div
//text = span precisa envolver sobre uma tag
//style = css
