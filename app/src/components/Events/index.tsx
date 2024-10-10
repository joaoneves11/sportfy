import { FlatList } from "react-native";
import { events } from "../../mocks/events";
import { Text } from "../Text";

import{Event, Icon } from "./styles";
export function Events(){
  return (

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={events}
        contentContainerStyle={{paddingRight: 24}}
        keyExtractor={(event) => event._id}
        renderItem={({ item: event }) => (
            <Event>
                <Icon>
                  <Text>{event.icon}</Text>
                </Icon>

                <Text size={14} weight="600">{event.tipo}</Text>
            </Event>
        )}
      />

  );
}
