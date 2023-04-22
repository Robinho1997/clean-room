import React, { createContext } from "react";
import roomData from "./data/roomData";
const Context = createContext();

function ContextProvider(props) {
  const [rooms, setRooms] = React.useState(roomData);

  function toggleErledigt(raumnummer, aufgabenIndex, badezimmer) {
    const newRooms = rooms.map((room) => {
      if (room.raumnummer == raumnummer && badezimmer) {
        return {
          ...room,
          badezimmerAufgaben: room.badezimmerAufgaben.map((aufgabe, index) => {
            if (index === aufgabenIndex) {
              return {
                ...aufgabe,
                erledigt: !aufgabe.erledigt,
              };
            }
            return aufgabe;
          }),
        };
      } else if (room.raumnummer == raumnummer) {
        return {
          ...room,
          aufgaben: room.aufgaben.map((aufgabe, index) => {
            if (index === aufgabenIndex) {
              return {
                ...aufgabe,
                erledigt: !aufgabe.erledigt,
              };
            }
            return aufgabe;
          }),
        };
      }
      return room;
    });

    setRooms(newRooms);
  }


  

  return (
    <Context.Provider value={{ rooms, setRooms, toggleErledigt }}>
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
