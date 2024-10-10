import { events } from "../../mocks/events";
import { Text } from "../Text";

import{Event, Icon } from "./styles";
export function Events(){
  return (
    events.map((event) => (
      <Event key={event._id}>

        <Icon>
        <Text>{event.icon}</Text>
        </Icon>

        <Text size={14} weight="600">{event.tipo}</Text>
      </Event>
    ))
  );
}
